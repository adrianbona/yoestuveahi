from django.shortcuts import render

from contagion.models import Contagion, ContagionRisk
from contagion.serializers import ContagionSerializer, ContagionRiskSerializer
from rest_framework import generics
from rest_framework import permissions
from core.views import MyListCreateAPIView
from rest_framework.decorators import api_view
from location.models import Location
from registry.models import Registry
import json
from django.utils import timezone
from datetime import datetime, timedelta
from django.db.models import Q
from django.core.exceptions import ObjectDoesNotExist
import pytz

from rest_framework.response import Response


def get_location(site, pk):
    try:
        if site == 1:
            location = Location.objects.get(id=pk)
        else:
            location = Location.objects.get(external_id=pk, site_source=site)
        return location
    except ObjectDoesNotExist:
        pass
    
    return None

def get_checkins(location, entrance_time, exit_time):
    checkin_time = datetime.fromtimestamp(entrance_time, tz=pytz.UTC)
    delta_hour = timedelta(days=0,hours=3)
    if exit_time is None:
        exit_time = timezone.now()
    else:
        exit_time = datetime.fromtimestamp(exit_time, tz=pytz.UTC)

    return Registry.objects.filter(
        included_in=location,
        exit_time__range=[checkin_time-delta_hour, exit_time + delta_hour]
    ) | Registry.objects.filter(
        included_in=location,
        entrance_time__range=[checkin_time-delta_hour, exit_time + delta_hour],
    ) | Registry.objects.filter(
        included_in=location,
        entrance_time__lte=checkin_time,
        exit_time__gte=exit_time
    )

def create_contagion_risk_to_every_body_in_checkins(checkin):
    location = checkin.included_in
    contagion = ContagionRisk.objects.create(
        created_at=timezone.now(),
        shown=False,
        content="Contagion risk created on {} at {}".format(checkin.entrance_time.strftime("%d/%m/%y"), location.name),
        location_name=location.name,
        informed_by=location.created_by,
    )
    contagion.save()
    checkin.registered_by.status = "Contagion Risk"
    checkin.registered_by.last_risk_update = timezone.now()
    checkin.registered_by.save()

@api_view(['POST'])
def new(request):
    stays = request.data.get('stays', "[]")
    for stay in stays:
        # print(stay['server_id'])
        location = get_location(stay['server_id'], stay['location_id'])
        if location is not None:
            checkins = get_checkins(location, stay['begin'], stay['end'])
            for checkin in checkins:
                create_contagion_risk_to_every_body_in_checkins(checkin)
    return Response("true")


class ContagionList(MyListCreateAPIView):
    queryset = Contagion.objects.all()
    serializer_class = ContagionSerializer
    permission_classes = [permissions.IsAuthenticated]

    AUTOSET_LOGGED_USER_FIELD = 'reported_by'



class ContagionDetail(generics.RetrieveUpdateAPIView):
    queryset = Contagion.objects.all()
    serializer_class = ContagionSerializer
    permission_classes = [permissions.IsAuthenticated]

class ContagionRiskList(MyListCreateAPIView):
    queryset = ContagionRisk.objects.all()
    serializer_class = ContagionRiskSerializer
    permission_classes = [permissions.IsAuthenticated]

    AUTOSET_LOGGED_USER_FIELD = 'informed_by'

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(ContagionRisk.objects.filter(informed_by=request.user))

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)


class ContagionRiskDetail(generics.RetrieveUpdateAPIView):
    queryset = ContagionRisk.objects.all()
    serializer_class = ContagionRiskSerializer
    permission_classes = [permissions.IsAuthenticated]
