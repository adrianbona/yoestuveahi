from django.core.exceptions import ObjectDoesNotExist
from django.shortcuts import render

from location.models import Location
from location.serializers import LocationEditSerializer, LocationSerializer
from rest_framework import generics
from rest_framework import permissions
from core.views import MyListCreateAPIView
from rest_framework import status
from rest_framework.response import Response

class LocationList(MyListCreateAPIView):
    queryset = Location.objects.all()
    serializer_class = LocationSerializer
    permission_classes = [permissions.IsAuthenticated]

    AUTOSET_LOGGED_USER_FIELD = 'created_by'

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        try:
            longitude=serializer.validated_data.get('longitude')
            latitude=serializer.validated_data.get('latitude')
            loc = Location.objects.get(longitude=longitude, latitude=latitude)
        except ObjectDoesNotExist:
            self.perform_create(serializer)
            headers = self.get_success_headers(serializer.data)
            return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

        return Response("Another Location with the same longitude and latitude", status=status.HTTP_403_FORBIDDEN)




class LocationDetail(generics.RetrieveUpdateAPIView):
    queryset = Location.objects.all()
    serializer_class = LocationEditSerializer
    permission_classes = [permissions.IsAuthenticated]