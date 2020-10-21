from django.shortcuts import render

from contagion.models import Contagion, ContagionRisk
from contagion.serializers import ContagionSerializer, ContagionRiskSerializer
from rest_framework import generics


class ContagionList(generics.ListCreateAPIView):
    queryset = Contagion.objects.all()
    serializer_class = ContagionSerializer


class ContagionDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Contagion.objects.all()
    serializer_class = ContagionSerializer

class ContagionRiskList(generics.ListCreateAPIView):
    queryset = ContagionRisk.objects.all()
    serializer_class = ContagionRiskSerializer


class ContagionRiskDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = ContagionRisk.objects.all()
    serializer_class = ContagionRiskSerializer