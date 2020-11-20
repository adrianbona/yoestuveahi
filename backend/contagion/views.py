from django.shortcuts import render

from contagion.models import Contagion, ContagionRisk
from contagion.serializers import ContagionSerializer, ContagionRiskSerializer
from rest_framework import generics
from rest_framework import permissions
from core.views import MyListCreateAPIView

from rest_framework.response import Response


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
