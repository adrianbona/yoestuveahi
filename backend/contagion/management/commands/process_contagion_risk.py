from django.core.management.base import BaseCommand, CommandError
from core.models import User
from location.models import Location
from contagion.models import ContagionRisk
from registry.models import Registry
from exam.models import Test

from datetime import timedelta
from django.db.models import Q
from django.utils import timezone

import requests



class Command(BaseCommand):
    help = 'Process contagion risk'

    def _get_user_chekins(self, user):
        offtime = timedelta(10)
        return Registry.objects.filter(registered_by=user, entrance_time__gte=timezone.now() - offtime)

    def _checkins_with_risk(self, location, checkin, test):
        # print("#")
        # print(checkin.entrance_time)
        # print([c.exit_time for c in Registry.objects.filter(included_in=checkin.included_in)])
        # print("#")
        one_hour = timedelta(days=0,hours=1)
        if checkin.exit_time is None:
            exit_time = timezone.now()
        else:
            exit_time = checkin.exit_time

        return Registry.objects.filter(
            ~Q(registered_by=test.taken_by),
            included_in=location,
            exit_time__range=[checkin.entrance_time-one_hour, exit_time + one_hour]
        ) | Registry.objects.filter(
            ~Q(registered_by=test.taken_by),
            included_in=location,
            entrance_time__range=[checkin.entrance_time-one_hour, exit_time + one_hour],
        ) | Registry.objects.filter(
            ~Q(registered_by=test.taken_by),
            included_in=location,
            entrance_time__lte=checkin.entrance_time,
            exit_time__gte=exit_time
        )

    def _create_contagion_risk_to_every_body_in_checkins(self, checkin, test):
        location = checkin.included_in
        checkin_with_risk = self._checkins_with_risk(location, checkin, test)
        for checkin_risk in checkin_with_risk:
            contagion = ContagionRisk.objects.create(
                created_at=test.date_taken,
                shown=False,
                content=self._create_content(location, checkin_risk, test.taken_by),
                location_name=location.name,
                informed_by=checkin_risk.registered_by
                # informed_by=test.taken_by
            )
            contagion.save()
            checkin_risk.registered_by.status = "Contagion Risk"
            checkin_risk.registered_by.last_risk_update = timezone.now()
            checkin_risk.registered_by.save()


    def _create_content(self, location, checkin, user_generating):
        return "Contagion risk created on {} at {}".format(
                    checkin.entrance_time.strftime("%d/%m/%y"), location.name)


    def _get_stays_lists(self, checkins):
        out = []

        for c in checkins:
            o = {}
            if c.included_in.site_source == 1:
                o['location_id'] = c.included_in.id
            else:
                o['location_id'] = c.included_in.external_id

            o['server_id'] = c.included_in.site_source
            o['begin'] = int(c.entrance_time.timestamp())
            o['end'] = int(c.exit_time.timestamp())
            out.append(o)
        return out


    def handle(self, *args, **options):
        tests = Test.objects.filter(processed=False)
        for test in tests:
            if test.is_positive:
                checkins = self._get_user_chekins(test.taken_by)
                try:
                    stays = self._get_stays_lists(checkins)
                    print(stays)
                    response = requests.post('http://yoestuveahiyea.herokuapp.com/contagion/new/', json={'stays': stays}, headers={'accept': 'application/json'})
                    print(response.status_code)
                    response = requests.post('https://covidweb2020.azurewebsites.net/api/contagion/new/', json={'stays': stays}, headers={'accept': 'application/json'})
                    print(response.status_code)
                except:
                    pass

                for checkin in checkins:
                    self._create_contagion_risk_to_every_body_in_checkins(checkin, test)
            else:
                test.taken_by.status="Healthy"
                test.taken_by.save()

            test.processed = True
            test.save()
