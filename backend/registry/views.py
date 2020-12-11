from django.shortcuts import render
from django.core.exceptions import ObjectDoesNotExist
from registry.models import Registry
from registry.serializers import RegistryEditSerializer, RegistrySerializer
from rest_framework import generics
from rest_framework import permissions
from core.views import MyListCreateAPIView
from location.models import Location
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, renderer_classes
from django.utils import timezone
from core.models import User
from rest_framework.renderers import JSONRenderer
import requests


def get_external_location_data(site, id):
    if site == 0:
        request = requests.get("http://yoestuveahiyea.herokuapp.com/location/{}/".format(id), headers={'accept': 'application/json'})
        return request.json()
    elif site == 2:
        request = requests.get('https://covidweb2020.azurewebsites.net/api/location/{}/'.format(id))
        return request.json()


@api_view(['POST'])
@renderer_classes([JSONRenderer])
def external_checkin(request, site, pk):
    try:
        location = Location.objects.get(site_source=site, external_id=pk)
    except ObjectDoesNotExist:
        data = get_external_location_data(site, pk)

        location = Location.objects.create(
            name = data['name'],
            description = "{} - {} - {}".format(data['name'], site, pk),
            opening_time = "00",
            closing_time = "00",
            logo = "",
            maximum_capacity = data['capacity'],
            latitude = data['latitude'],
            longitude = data['longitude'],
            created_by = request.user,
            site_source = site,
            external_id = pk,
        )
        location.save()
    
    try:
        registry = Registry.objects.filter(
                        included_in=location,
                        registered_by=request.user,
                        exit_time__isnull=True
                        ).get()
        registry.exit_time = timezone.now()
        registry.save()
        seria = RegistrySerializer(registry)
        return Response(seria.data, status=status.HTTP_201_CREATED)
    except ObjectDoesNotExist:
        Registry.objects.filter(
                        registered_by=request.user,
                        exit_time__isnull=True
                    ).update(exit_time=timezone.now())

        registry = Registry.objects.create(
                        included_in=location,
                        registered_by=request.user,
                        )
        registry.save()
        seria = RegistrySerializer(registry)
        return Response(seria.data, status=status.HTTP_201_CREATED)


class RegistryList(MyListCreateAPIView):
    queryset = Registry.objects.all()
    serializer_class = RegistrySerializer
    permission_classes = [permissions.IsAuthenticated]

    AUTOSET_LOGGED_USER_FIELD = 'registered_by'

    def list(self, request, *args, **kwargs):
        # queryset = self.filter_queryset(self.get_queryset())
        queryset = self.filter_queryset(Registry.objects.filter(registered_by=request.user))

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        try:
            registry = Registry.objects.filter(
                            included_in_id=request.data['included_in'],
                            registered_by=request.user,
                            exit_time__isnull=True
                            ).get()
            registry.exit_time = timezone.now()
            registry.save()
            seria = RegistrySerializer(registry)
            return Response(seria.data, status=status.HTTP_201_CREATED)
        except ObjectDoesNotExist:
            Registry.objects.filter(
                            registered_by=request.user,
                            exit_time__isnull=True
                        ).update(exit_time=timezone.now())

        location = Location.objects.get(id=request.data['included_in'])
        if location._capacity() > 0:
            return super().create(request, *args, **kwargs)

        return Response("Maximum capacity reached", status=status.HTTP_403_FORBIDDEN)



class RegistryDetail(generics.RetrieveUpdateAPIView):
    queryset = Registry.objects.all()
    serializer_class = RegistryEditSerializer
    permission_classes = [permissions.IsAuthenticated]