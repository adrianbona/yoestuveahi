from core.models import User

from rest_framework.test import APITestCase
from rest_framework.test import APIRequestFactory

from rest_framework.test import force_authenticate

from location.models import Location

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



    #TODO: testear que si hace checkin en otro lado y
    # tiene alguno abierto hay que cerrarlo