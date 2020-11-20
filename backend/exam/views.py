from django.shortcuts import render

from exam.models import Test
from exam.serializers import TestSerializer
from rest_framework import generics
from rest_framework import permissions
from core.views import MyListCreateAPIView
from django.utils import timezone

from contagion.models import Contagion
from rest_framework.response import Response

class TestList(MyListCreateAPIView):
    queryset = Test.objects.all()
    serializer_class = TestSerializer
    permission_classes = [permissions.IsAuthenticated]

    AUTOSET_LOGGED_USER_FIELD = 'taken_by'

    def list(self, request, *args, **kwargs):
        # queryset = self.filter_queryset(self.get_queryset())
        if request.user.is_admin:
            queryset = self.filter_queryset(Test.objects.all())
        else:
            queryset = self.filter_queryset(Test.objects.filter(taken_by=request.user))

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        if serializer.validated_data['is_positive']:

            if request.user.status == "Healthy":
                contagion = Contagion.objects.create(
                    reported_by=request.user
                )
                contagion.save()

            request.user.status = "COVID Positive"
            request.user.last_risk_update = timezone.now()
            request.user.save()
        else:
            request.user.status = "Healthy"
            request.user.last_risk_update = timezone.now()
            request.user.save()

        return super().post(request, *args, **kwargs)


class TestDetail(generics.RetrieveAPIView):
    queryset = Test.objects.all()
    serializer_class = TestSerializer
    permission_classes = [permissions.IsAuthenticated]