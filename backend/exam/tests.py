from core.models import User
from location.models import Location
from .models import Test
from registry.models import Registry
from contagion.models import ContagionRisk, Contagion

from rest_framework.test import APITestCase
from rest_framework.test import force_authenticate

from contagion.management.commands import process_contagion_risk

from django.utils import timezone
from datetime import timedelta


from django.conf import settings


class AccountTests(APITestCase):
    def setUp(self):
        # Every test needs access to the request factory.
        self.command = process_contagion_risk.Command()
        self.admin_user = User.objects.create_user(email='admin@admin.com',
                                                    password='admin')
        self.admin_user.is_admin=True
        self.admin_user.save()
        self.users = []
        self.locations = []
        for i in range(10):
            user = User.objects.create_user(email='jacob{}@jacob.com'.format(i),
                                                    password='jacob')
            user.save()
            location = Location.objects.create(
                name="location{}".format(i),
                description="description",
                opening_time="10hs",
                closing_time="16hs",
                logo="",
                maximum_capacity=20,
                latitude=i*10,
                longitude=i*10,
                created_by = user
            )
            location.save()
            self.users.append(user)
            self.locations.append(location)

    def _authenticate_admin_user(self):
        self.logged_user = self.admin_user
        self.client.force_authenticate(user=self.logged_user)

    def _authenticate_user_by_index(self, index):
        self.logged_user = self.users[index]
        self.client.force_authenticate(user=self.logged_user)

    def _authenticate_user(self, email, password):
        self.logged_user = User.objects.create_user(email=email, password=password)
        self.logged_user.save()
        self.client.force_authenticate(user=self.logged_user)

    def _make_checkin(self, location_index, user_index, days_ago, hours_ago=0, closed=True):
        location = self.locations[location_index]
        user = self.users[user_index]
        time = timezone.now() - timedelta(days=days_ago, hours=hours_ago)
        exit_time = None
        if closed:
            exit_time = time + timedelta(hours=1)

        checkin = Registry.objects.create(
                exit_time=exit_time,
                registered_by=user,
                included_in=location
            )
        checkin.entrance_time=time
        checkin.save()


    def test_create_a_negative_test_and_no_contagion_risk_are_created(self):
        self._authenticate_user_by_index(5)

        response = self.client.post('/api/test/', {
                'is_positive': False
            })
        self.assertEqual(201, response.status_code)

        self.command.handle()

        response = self.client.get('/api/contagion/risk/')
        self.assertEqual(0, len(response.data))
        

    def test_create_a_negative_test_and_no_contagion_risk_are_created_when_shared_checkins(self):
        self._make_checkin(0, 0, 3)
        self._make_checkin(0, 1, 3)
        
        self._authenticate_user_by_index(0)
        response = self.client.post('/api/test/', {
                'is_positive': False
            })
        self.assertEqual(201, response.status_code)

        self.command.handle()

        response = self.client.get('/api/contagion/risk/')
        self.assertEqual(200, response.status_code)
        self.assertEqual(0, len(response.data))


    def test_create_a_negative_test_and_no_contagion_risk_are_created_when_shared_checkins2(self):
        self._make_checkin(0, 0, 3)
        self._make_checkin(0, 1, 3)
        
        self._authenticate_user_by_index(0)
        response = self.client.post('/api/test/', {
                'is_positive': False
            })
        self.assertEqual(201, response.status_code)

        self.command.handle()

        response = self.client.get('/api/contagion/risk/')
        self.assertEqual(200, response.status_code)
        self.assertEqual(0, len(response.data))
        
    
    def test_create_positive_test_with_no_contagion_risk(self):
        self._make_checkin(0, 0, 3)
        
        self._authenticate_user_by_index(0)
        response = self.client.post('/api/test/', {
                'is_positive': True
            })
        self.assertEqual(201, response.status_code)

        self.command.handle()

        response = self.client.get('/api/contagion/risk/')
        self.assertEqual(200, response.status_code)
        self.assertEqual(0, len(response.data))

        self.assertEqual("COVID Positive", self.users[0].status)

    def test_create_positive_test_and_creates_contagion_risk(self):
        self._make_checkin(0, 0, 3)
        self._make_checkin(0, 1, 3)
        
        self._authenticate_user_by_index(0)
        response = self.client.post('/api/test/', {
                'is_positive': True
            })
        self.assertEqual(201, response.status_code)

        self.command.handle()

        self._authenticate_user_by_index(1)
        response = self.client.get('/api/contagion/risk/')
        self.assertEqual(200, response.status_code)
        self.assertEqual(1, len(response.data))

        self.users[1].refresh_from_db()
        self.assertEqual("Contagion Risk", self.users[1].status)

        self._authenticate_user_by_index(1)
        response = self.client.post('/api/test/', {
                'is_positive': False
            })
        self.assertEqual(201, response.status_code)

        self.users[1].refresh_from_db()
        self.assertEqual("Healthy", self.users[1].status)

    
    
    def test_not_duplicate_contagion_risks_by_runnig_multiple_times_command(self):
        self._make_checkin(0, 0, 3)
        self._make_checkin(0, 1, 3)
        
        self._authenticate_user_by_index(0)
        response = self.client.post('/api/test/', {
                'is_positive': True
            })
        self.assertEqual(201, response.status_code)

        self.command.handle()
        self.command.handle()

        self._authenticate_user_by_index(1)
        response = self.client.get('/api/contagion/risk/')
        self.assertEqual(200, response.status_code)
        self.assertEqual(1, len(response.data))
    
    
    def test_contagion_risks_by_two_differents_positive_tests(self):
        self._make_checkin(0, 0, 3)
        self._make_checkin(0, 1, 3)
        self._make_checkin(0, 2, 3)
        
        self._authenticate_user_by_index(0)
        response = self.client.post('/api/test/', {
                'is_positive': True
            })
        self.assertEqual(201, response.status_code)
        
        self._authenticate_user_by_index(1)
        response = self.client.post('/api/test/', {
                'is_positive': True
            })
        self.assertEqual(201, response.status_code)

        self.command.handle()

        self._authenticate_user_by_index(0)
        response = self.client.get('/api/contagion/risk/')
        self.assertEqual(200, response.status_code)
        self.assertEqual(1, len(response.data))
        
        self._authenticate_user_by_index(1)
        response = self.client.get('/api/contagion/risk/')
        self.assertEqual(200, response.status_code)
        self.assertEqual(1, len(response.data))

        self._authenticate_user_by_index(2)
        response = self.client.get('/api/contagion/risk/')
        self.assertEqual(200, response.status_code)
        self.assertEqual(2, len(response.data))


    def test_create_contagion_when_positive_test(self):
        self._authenticate_user_by_index(0)
        response = self.client.post('/api/test/', {
                'is_positive': True
            })
        self.assertEqual(201, response.status_code)

        response = self.client.get('/api/contagion/')
        self.assertEqual(200, response.status_code)
        self.assertEqual(1, len(response.data))
        self.assertEqual(self.users[0].id, response.data[0]["reported_by"])

        self._authenticate_user_by_index(0)
        response = self.client.post('/api/test/', {
                'is_positive': True
            })
        self.assertEqual(201, response.status_code)

        response = self.client.get('/api/contagion/')
        self.assertEqual(200, response.status_code)
        self.assertEqual(1, len(response.data))
        self.assertEqual(self.users[0].id, response.data[0]["reported_by"])

    def test_generate_contagion_risk_when_one_checkin_is_open(self):
        self._make_checkin(0, 0, 3)
        self._make_checkin(0, 1, 3, closed=False)

        self._authenticate_user_by_index(0)
        response = self.client.post('/api/test/', {
                'is_positive': True
            })
        self.assertEqual(201, response.status_code)

        self.command.handle()

        self._authenticate_user_by_index(1)
        response = self.client.get('/api/contagion/risk/')
        self.assertEqual(200, response.status_code)
        self.assertEqual(1, len(response.data))
        self.assertEqual(self.users[1].id, response.data[0]["informed_by"])

    def test_generate_contagion_rist_when_both_checkins_are_open(self):
        self._make_checkin(0, 0, 3, closed=False)
        self._make_checkin(0, 1, 3, closed=False)

        self._authenticate_user_by_index(0)
        response = self.client.post('/api/test/', {
                'is_positive': True
            })
        self.assertEqual(201, response.status_code)

        self.command.handle()

        self._authenticate_user_by_index(1)
        response = self.client.get('/api/contagion/risk/')
        self.assertEqual(200, response.status_code)
        self.assertEqual(1, len(response.data))
        self.assertEqual(self.users[1].id, response.data[0]["informed_by"])

    def test_do_not_generate_contagion_rist_when_checkin_is_older_than_ten_days(self):
        self._make_checkin(0, 0, 13)
        self._make_checkin(0, 1, 13)

        self._authenticate_user_by_index(0)
        response = self.client.post('/api/test/', {
                'is_positive': True
            })
        self.assertEqual(201, response.status_code)

        self.command.handle()

        self._authenticate_user_by_index(1)
        response = self.client.get('/api/contagion/risk/')
        self.assertEqual(200, response.status_code)
        self.assertEqual(0, len(response.data))
    
    def test_do_not_generate_contagion_rist_when_checkin_is_older_than_ten_days_and_generate_them_when_newer(self):
        self._make_checkin(0, 0, 15)
        self._make_checkin(0, 1, 15)
        self._make_checkin(0, 0, 5)
        self._make_checkin(0, 3, 5)
        self._make_checkin(0, 4, 5)

        self._authenticate_user_by_index(0)
        response = self.client.post('/api/test/', {
                'is_positive': True
            })
        self.assertEqual(201, response.status_code)

        self.command.handle()

        self._authenticate_user_by_index(1)
        response = self.client.get('/api/contagion/risk/')
        self.assertEqual(200, response.status_code)
        self.assertEqual(0, len(response.data))

        self._authenticate_user_by_index(3)
        response = self.client.get('/api/contagion/risk/')
        self.assertEqual(200, response.status_code)
        self.assertEqual(1, len(response.data))

        self._authenticate_user_by_index(4)
        response = self.client.get('/api/contagion/risk/')
        self.assertEqual(200, response.status_code)
        self.assertEqual(1, len(response.data))

    def test_negative_test_change_users_status(self):
        self._make_checkin(0, 0, 3)
        self._make_checkin(0, 1, 3)
        
        self._authenticate_user_by_index(0)
        response = self.client.post('/api/test/', {
                'is_positive': True
            })
        self.assertEqual(201, response.status_code)

        self.command.handle()

        self.users[0].refresh_from_db()
        self.assertEqual("COVID Positive", self.users[0].status)

        #test negativo
        test = Test.objects.create(is_positive=False, taken_by=self.users[0], processed=False)
        test.save()

        self.command.handle()

        self.users[0].refresh_from_db()
        self.assertEqual("Healthy", self.users[0].status)