from django.test import TestCase

from rest_framework.test import APITestCase, APIRequestFactory

from core.models import User
from django.test import RequestFactory, TestCase
from rest_framework.test import force_authenticate

from .models import Location

from .views import LocationDetail, LocationList

class LocationTest(APITestCase):
    def setUp(self):
        # Every test needs access to the request factory.
        self.factory = APIRequestFactory()
        self.user = User.objects.create_user(email='jacob@jacob.com',
                                                password='jacob')
        self.user.save()

    def _get_fake_location(self):
        return {
            'name' : "Loc1",
            'description' : "loclocloc111",
            'opening_time' : "10:00hs",
            'closing_time' : "18:00hs",
            'logo' : "lalalala",
            'maximum_capacity' : 10,
            'latitude' : 100,
            'longitude' : 100,
        }

    def test_can_create_location(self):
        view = LocationList.as_view()

        fake_location = self._get_fake_location()
        request = self.factory.post('/api/location/', fake_location)
        force_authenticate(request, user=self.user)
        response = view(request)
        self.assertEqual(201, response.status_code)
        self.assertEqual(self.user.name, response.data['created_by'])
        self.assertEqual(fake_location['maximum_capacity'], response.data['current_capacity'])


    def test_list_locations(self):
        view = LocationList.as_view()

        fake_location = self._get_fake_location()
        request = self.factory.post('/api/location/', fake_location)
        force_authenticate(request, user=self.user)
        response = view(request)
        self.assertEqual(201, response.status_code)

        request = self.factory.get('/api/location/')
        force_authenticate(request, user=self.user)
        response = view(request)
        self.assertEqual(200, response.status_code)
        self.assertEqual(1, len(response.data))

        fake_location = self._get_fake_location()
        fake_location['name'] = 'loc2'
        fake_location['description'] = 'loc2'
        fake_location['longitude'] = 110
        fake_location['latitude'] = 110
        request = self.factory.post('/api/location/', fake_location)
        force_authenticate(request, user=self.user)
        response = view(request)
        self.assertEqual(201, response.status_code)

        request = self.factory.get('/api/location/')
        force_authenticate(request, user=self.user)
        response = view(request)
        self.assertEqual(200, response.status_code)
        self.assertEqual(2, len(response.data))

    def test_can_duplicate_location(self):
        view = LocationList.as_view()

        fake_location = self._get_fake_location()
        request = self.factory.post('/api/location/', fake_location)
        force_authenticate(request, user=self.user)
        response = view(request)
        self.assertEqual(201, response.status_code)

        fake_location['name'] = 'loc2'
        fake_location['description'] = 'loc2'
        request = self.factory.post('/api/location/', fake_location)
        force_authenticate(request, user=self.user)
        response = view(request)
        self.assertEqual(403, response.status_code)

        request = self.factory.get('/api/location/')
        force_authenticate(request, user=self.user)
        response = view(request)
        self.assertEqual(200, response.status_code)
        self.assertEqual(1, len(response.data))

    def test_cant_checkin_when_full(self):
        user2 = User.objects.create_user(email='dos@dos.com',
                                                password='dos')
        user2.save()

        location = Location.objects.create(
            name="test",
            description="description",
            opening_time="10hs",
            closing_time="16hs",
            logo="",
            maximum_capacity=1,
            latitude=100,
            longitude=100,
            created_by = self.user
        )
        location.save()

        self.client.force_authenticate(user=user2)
        response = self.client.post('/api/registry/', {
            'included_in': location.id
        })
        self.assertEqual(201, response.status_code)

        self.client.force_authenticate(user=self.user)
        response = self.client.post('/api/registry/', {
            'included_in': location.id
        })
        self.assertEqual(403, response.status_code)
    
    
    def test_external_checkins(self):
        user2 = User.objects.create_user(email='2@2.com',
                                                password='2')
        user2.save()

        location = Location.objects.create(
            name="test",
            description="description",
            opening_time="10hs",
            closing_time="16hs",
            logo="",
            maximum_capacity=1,
            latitude=100,
            longitude=100,
            created_by = self.user
        )
        location.save()

        self.client.force_authenticate(user=user2)
        response = self.client.post('/api/registry/', {
            'included_in': location.id
        })
        self.assertEqual(201, response.status_code)

        location.refresh_from_db()

        response = self.client.get('/api/location/{}/'.format(location.id))
        self.assertEqual(1, response.data['concurrence'])

        response = self.client.post('/api/checkin/{}/'.format(location.id))
        self.assertEqual(200, response.status_code)

        response = self.client.get('/api/location/{}/'.format(location.id))
        self.assertEqual(2, response.data['concurrence'])

        response = self.client.post('/api/checkin/{}/'.format(location.id))
        self.assertEqual(200, response.status_code)
        response = self.client.post('/api/checkin/{}/'.format(location.id))
        self.assertEqual(200, response.status_code)
        response = self.client.post('/api/checkin/{}/'.format(location.id))
        self.assertEqual(200, response.status_code)

        response = self.client.get('/api/location/{}/'.format(location.id))
        self.assertEqual(5, response.data['concurrence'])


        response = self.client.post('/api/checkout/{}/'.format(location.id))
        self.assertEqual(200, response.status_code)
        response = self.client.post('/api/checkout/{}/'.format(location.id))
        self.assertEqual(200, response.status_code)

        response = self.client.get('/api/location/{}/'.format(location.id))
        self.assertEqual(3, response.data['concurrence'])

        response = self.client.post('/api/checkout/{}/'.format(location.id))
        self.assertEqual(200, response.status_code)
        response = self.client.post('/api/checkout/{}/'.format(location.id))
        self.assertEqual(200, response.status_code)
        response = self.client.post('/api/checkout/{}/'.format(location.id))
        self.assertEqual(200, response.status_code)
        response = self.client.post('/api/checkout/{}/'.format(location.id))
        self.assertEqual(200, response.status_code)
        response = self.client.post('/api/checkout/{}/'.format(location.id))
        self.assertEqual(200, response.status_code)
        response = self.client.post('/api/checkout/{}/'.format(location.id))
        self.assertEqual(200, response.status_code)

        response = self.client.get('/api/location/{}/'.format(location.id))
        self.assertEqual(1, response.data['concurrence'])