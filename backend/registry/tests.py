from core.models import User

from rest_framework.test import APITestCase
from rest_framework.test import APIRequestFactory

from rest_framework.test import force_authenticate

from location.models import Location
from registry.models import Registry

from .views import RegistryList, RegistryDetail
from location.views import LocationDetail

class AccountTests(APITestCase):
    def setUp(self):
        # Every test needs access to the request factory.
        self.factory = APIRequestFactory()
        self.user = User.objects.create_user(email='jacob@jacob.com',
                                                password='jacob')
        self.user.save()
        self.location = Location.objects.create(
            name="test",
            description="description",
            opening_time="10hs",
            closing_time="16hs",
            logo="",
            maximum_capacity=3,
            latitude=100,
            longitude=100,
            created_by = self.user
        )
        self.location.save()

    def _authenticate_user(self, email, password):
        self.logged_user = User.objects.create_user(email=email, password=password)
        self.logged_user.save()
        self.client.force_authenticate(user=self.logged_user)


    def test_cant_checkin_at_full_location(self):
        for n in range(3):
            self._authenticate_user('jacob{}@jacob.com'.format(n), 'jacob')

            response = self.client.post('/api/registry/', {
                'included_in':self.location.id
            })
            self.assertEqual(201, response.status_code)
            self.assertEqual(self.logged_user.id, response.data['registered_by'])

        self._authenticate_user('jacob100@jacob.com', 'jacob')
        response = self.client.post('/api/registry/', {
            'included_in':self.location.id
        })
        self.assertEquals(403, response.status_code)


    def test_checkins_reduce_capacity(self):
        for n in range(1, 4):
            self._authenticate_user('jacob{}@jacob.com'.format(n), 'jacob')

            response = self.client.post('/api/registry/', {
                'included_in':self.location.id
            })
            self.assertEqual(201, response.status_code)

            response = self.client.get('/api/location/{}/'.format(self.location.id))
            self.assertEqual(self.location.maximum_capacity-n, response.data['current_capacity'])

        self._authenticate_user('jacob100@jacob.com', 'jacob')
        response = self.client.post('/api/registry/', {
            'included_in':self.location.id
        })
        self.assertEquals(403, response.status_code)

        response = self.client.get('/api/registry/')
        for d in response.data:
            self.assertEqual(self.location.name, d['included_in_name'])


    def test_first_checkin_second_checkout(self):
        self._authenticate_user('jacob1@jacob.com', 'jacob')
        response = self.client.post('/api/registry/', {
            'included_in':self.location.id
        })
        self.assertEqual(201, response.status_code)

        response = self.client.get('/api/location/{}/'.format(self.location.id))
        self.assertEqual(self.location.maximum_capacity-1,
                         response.data['current_capacity'])

        response = self.client.post('/api/registry/', {
            'included_in':self.location.id
        })
        self.assertEquals(201, response.status_code)

        response = self.client.get('/api/location/{}/'.format(self.location.id))
        self.assertEqual(self.location.maximum_capacity,
                         response.data['current_capacity'])


    def test_first_checkin_second_checkout(self):
        location2 = Location.objects.create(
            name="test2",
            description="description2",
            opening_time="10hs",
            closing_time="16hs",
            logo="",
            maximum_capacity=3,
            latitude=110,
            longitude=110,
            created_by = self.user
        )
        location2.save()

        self._authenticate_user('jacob1@jacob.com', 'jacob')
        response = self.client.post('/api/registry/', {
            'included_in':self.location.id
        })
        self.assertEqual(201, response.status_code)

        response = self.client.get('/api/registry/')
        self.assertEqual(1, len(response.data))
        self.assertFalse(response.data[0]['exit_time'])

        response = self.client.post('/api/registry/', {
            'included_in': location2.id
        })
        self.assertEquals(201, response.status_code)

        response = self.client.get('/api/registry/')
        self.assertEqual(2, len(response.data))
        self.assertIsNotNone(response.data[0]['exit_time'])
        self.assertIsNone(response.data[1]['exit_time'])

        response = self.client.post('/api/registry/', {
            'included_in': location2.id
        })
        self.assertEquals(201, response.status_code)

        response = self.client.get('/api/registry/')
        self.assertEqual(2, len(response.data))
        self.assertIsNotNone(response.data[0]['exit_time'])
        self.assertIsNotNone(response.data[1]['exit_time'])

    def test_process_contagion_risk_with_open_checkin(self):
        self._authenticate_user('jacob1@jacob.com', 'jacob')
        response = self.client.post('/api/registry/', {
            'included_in':self.location.id
        })
        self.assertEqual(201, response.status_code)

        response = self.client.get('/api/location/{}/'.format(self.location.id))
        self.assertEqual(self.location.maximum_capacity-1,
                         response.data['current_capacity'])

        response = self.client.post('/api/registry/', {
            'included_in':self.location.id
        })
        self.assertEquals(201, response.status_code)

        response = self.client.get('/api/location/{}/'.format(self.location.id))
        self.assertEqual(self.location.maximum_capacity,
                         response.data['current_capacity'])
    

    def test_create_external_checkin_and_checkout(self):
        self._authenticate_user('jacob1@jacob.com', 'jacob')
        response = self.client.post('/api/registry/external/2/3/')
        self.assertEqual(201, response.status_code)

        registry = Registry.objects.get(id=response.data['id'])
        self.assertEquals(None, registry.exit_time)

        response = self.client.post('/api/registry/external/2/3/')
        self.assertEqual(201, response.status_code)

        registry.refresh_from_db()
        self.assertNotEquals(None, registry.exit_time)


    def test_create_external_checkin_and_checkout_in_another_location(self):
        self._authenticate_user('jacob1@jacob.com', 'jacob')

        # external checkin
        response = self.client.post('/api/registry/external/2/3/')
        self.assertEqual(201, response.status_code)

        registry = Registry.objects.get(id=response.data['id'])
        self.assertEquals(None, registry.exit_time)
        self.assertEquals(registry.included_in.site_source, 2)
        self.assertEquals(registry.included_in.external_id, 3)
        self.assertEquals(registry.included_in.name, "La Cueva de Riki")

        response = self.client.post('/api/registry/', {
            'included_in':self.location.id
        })
        self.assertEquals(201, response.status_code)
        
        registry.refresh_from_db()
        self.assertNotEquals(None, registry.exit_time)

        self.assertNotEquals(response.data['id'], registry.id)


    def test_create_checkin_checkin_and_checkin_in_external_location(self):
        self._authenticate_user('jacob1@jacob.com', 'jacob')

        response = self.client.post('/api/registry/', {
            'included_in':self.location.id
        })
        self.assertEquals(201, response.status_code)
        self.assertEquals(None, response.data['exit_time'])

        local_registry = Registry.objects.get(id=response.data['id'])

        # external checkin
        response = self.client.post('/api/registry/external/2/16/')
        self.assertEqual(201, response.status_code)

        registry = Registry.objects.get(id=response.data['id'])
        self.assertEquals(None, registry.exit_time)
        self.assertEquals(registry.included_in.site_source, 2)
        self.assertEquals(registry.included_in.external_id, 16)
        self.assertEquals(registry.included_in.name, "uno")

        local_registry.refresh_from_db()
        self.assertNotEquals(None, local_registry.exit_time)

        self.assertNotEquals(response.data['id'], local_registry.id)


    def test_create_checkin_checkin_and_checkin_in_external_location_other_site(self):
        self._authenticate_user('jacob1@jacob.com', 'jacob')

        response = self.client.post('/api/registry/', {
            'included_in':self.location.id
        })
        self.assertEquals(201, response.status_code)
        self.assertEquals(None, response.data['exit_time'])

        local_registry = Registry.objects.get(id=response.data['id'])

        # external checkin
        response = self.client.post('/api/registry/external/0/12/')
        self.assertEqual(201, response.status_code)

        registry = Registry.objects.get(id=response.data['id'])
        self.assertEquals(None, registry.exit_time)
        self.assertEquals(registry.included_in.site_source, 0)
        self.assertEquals(registry.included_in.external_id, 12)
        self.assertEquals(registry.included_in.name, "Cabildo")

        local_registry.refresh_from_db()
        self.assertNotEquals(None, local_registry.exit_time)

        self.assertNotEquals(response.data['id'], local_registry.id)


    #TODO: testear que si hace checkin en otro lado y
    # tiene alguno abierto hay que cerrarlo