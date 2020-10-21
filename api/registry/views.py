from django.shortcuts import render

from registry.models import Registry
from registry.serializers import RegistrySerializer
from rest_framework import generics


class RegistryList(generics.ListCreateAPIView):
    queryset = Registry.objects.all()
    serializer_class = RegistrySerializer


class RegistryDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Registry.objects.all()
    serializer_class = RegistrySerializer