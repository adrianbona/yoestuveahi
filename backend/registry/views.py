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
from django.utils import timezone

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
        if location.capacity() > 0:
            return super().create(request, *args, **kwargs)

        return Response("Maximum capacity reached", status=status.HTTP_403_FORBIDDEN)



class RegistryDetail(generics.RetrieveUpdateAPIView):
    queryset = Registry.objects.all()
    serializer_class = RegistryEditSerializer
    permission_classes = [permissions.IsAuthenticated]