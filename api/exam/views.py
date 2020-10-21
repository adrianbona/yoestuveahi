from django.shortcuts import render

from exam.models import Test
from exam.serializers import TestSerializer
from rest_framework import generics


class TestList(generics.ListCreateAPIView):
    queryset = Test.objects.all()
    serializer_class = TestSerializer


class TestDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Test.objects.all()
    serializer_class = TestSerializer