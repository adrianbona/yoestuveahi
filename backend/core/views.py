from django.shortcuts import render

from core.models import User
from core.serializers import UserSerializer, LoginUserSerializer
from rest_framework import generics
from django.http import JsonResponse, HttpResponse, HttpResponseBadRequest, HttpResponseForbidden, HttpResponseRedirect
from django.shortcuts import get_object_or_404
from django.core.exceptions import ObjectDoesNotExist
from django.contrib.auth import authenticate, login, logout
from rest_framework.decorators import api_view
from rest_framework.authtoken.models import Token
from rest_framework.authentication import TokenAuthentication


from rest_framework import permissions

from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from rest_framework import mixins
from rest_framework import generics
from django.core import serializers

class MyListCreateAPIView(generics.ListCreateAPIView):
    def perform_create(self, serializer):
        kwargs = {}
        kwargs[self.AUTOSET_LOGGED_USER_FIELD] = self.request.user
        serializer.save(**kwargs)


class LoginUserList(mixins.CreateModelMixin,
                  generics.GenericAPIView):
    serializer_class = LoginUserSerializer

    def _get_user_dict(self, user):
        out = {}
        out['id'] = user.id
        out['email'] = user.email
        out['is_admin'] = user.is_admin
        out['name'] = user.name
        out['status'] = user.status
        out['creation_date'] = user.creation_date
        out['last_risk_update'] = user.last_risk_update
        return out

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        email = serializer.validated_data.get('email')
        password = serializer.validated_data.get('password')

        user = authenticate(request, email=email, password=password)
        if user is not None:
            login(request, user)
            headers = self.get_success_headers(serializer.data)

            token, created = Token.objects.get_or_create(user=user)
            data = self._get_user_dict(user)
            data['token'] = token.key

            return Response(data, status=status.HTTP_201_CREATED, headers=headers)
        
        try:
            user = User.objects.get(email=email)
        except ObjectDoesNotExist:
            user = User.objects.create(email=email, is_active=True)
            user.set_password(password)
            user.status = 'Healthy'
            user.save()

            login(request, user)
            headers = self.get_success_headers(serializer.data)

            token, created = Token.objects.get_or_create(user=user)
            data = self._get_user_dict(user)
            data['token'] = token.key

            return Response(data, status=status.HTTP_201_CREATED, headers=headers)

        return Response("Your password is wrong", status=status.HTTP_403_FORBIDDEN)

@api_view(['GET'])
def custom_logout(request):
    logout(request)
    return Response(True, status=status.HTTP_200_OK)

class UserList(generics.ListAPIView, generics.UpdateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    # authentication_classes = (TokenAuthentication,)
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        kwargs = {}
        kwargs['id'] = self.request.user.id
        serializer.save(**kwargs)

    def get_object(self):
        return self.request.user