from core.models import User
from rest_framework.test import APITestCase
from rest_framework.test import APIRequestFactory
from rest_framework.test import force_authenticate
from location.models import Location
from location.views import LocationDetail
from registry.models import Registry
import json
from datetime import timedelta
from django.db.models import Q
from django.utils import timezone


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
        self.users = []
        for i in range(10):
            user = User.objects.create_user(email='jacob{}@jacob.com'.format(i),
                                                    password='jacob')
            user.save()
            self.users.append(user)

    def _authenticate_user(self, email, password):
        self.logged_user = User.objects.create_user(email=email, password=password)
        self.logged_user.save()
        self.client.force_authenticate(user=self.logged_user)

    def test_getting_outside_contagion_but_not_risk_locally(self):
        self.client.force_authenticate(user=self.users[0])
        response = self.client.post('/api/registry/', {
            'included_in': self.location.id
        })
        self.assertEqual(201, response.status_code)
        self.assertEqual(self.users[0].id, response.data['registered_by'])


        response = self.client.post('/api/contagion/new/', {
            'stays': json.dumps([
                {'location_id': self.location.id, 'server_id': 1, 'begin': 14235123, 'end': 1242323423},
            ])
        })
        self.assertEqual(200, response.status_code)

        self.users[0].refresh_from_db()
        self.assertEqual('Healthy', self.users[0].status)


    def test_getting_outside_contagion_but_not_risk_locally(self):
        self.client.force_authenticate(user=self.users[0])
        response = self.client.post('/api/registry/', {
            'included_in': self.location.id
        })
        self.assertEqual(201, response.status_code)
        self.assertEqual(self.users[0].id, response.data['registered_by'])

        day = timedelta(1)
        begin = timezone.now() - day
        end = timezone.now() + day

        response = self.client.post('/api/contagion/new/', {
            'stays': json.dumps([
                {"location_id": self.location.id, "server_id": 1, "begin": int(begin.timestamp()), "end": int(end.timestamp())},
                {"location_id": 60, "server_id": 0, "begin": int(begin.timestamp()), "end": int(end.timestamp())},
            ])
        })
        self.assertEqual(200, response.status_code)

        self.users[0].refresh_from_db()
        self.assertEqual('Contagion Risk', self.users[0].status)


    def test_getting_outside_contagion_but_not_risk_locally(self):
        self.client.force_authenticate(user=self.users[0])

        response = self.client.post('/api/registry/external/0/12/')
        self.assertEqual(201, response.status_code)

        registry = Registry.objects.get(id=response.data['id'])
        self.assertEquals(None, registry.exit_time)
        self.assertEquals(registry.included_in.site_source, 0)
        self.assertEquals(registry.included_in.external_id, 12)
        self.assertEquals(registry.included_in.name, "Cabildo")
        external_id = registry.included_in.id

        response = self.client.post('/api/registry/', {
            'included_in': self.location.id
        })
        self.assertEqual(201, response.status_code)
        self.assertEqual(self.users[0].id, response.data['registered_by'])

        day = timedelta(1)
        begin = timezone.now() - day
        end = timezone.now() + day

        response = self.client.post('/api/contagion/new/', data={
            'stays': [
                {"location_id": external_id, "server_id": 1, "begin": int(begin.timestamp()), "end": int(end.timestamp())},
                {"location_id": 60, "server_id": 0, "begin": int(begin.timestamp()), "end": int(end.timestamp())},
            ]
        }, format='json')
        self.assertEqual(200, response.status_code)

        self.users[0].refresh_from_db()
        self.assertEqual('Contagion Risk', self.users[0].status)