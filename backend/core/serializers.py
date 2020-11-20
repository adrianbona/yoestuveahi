from rest_framework import serializers
from core.models import User
from django.core.exceptions import ObjectDoesNotExist
from django.contrib.auth.hashers import make_password
from django.db import IntegrityError


class CurrentUserDefault:
    """
    May be applied as a `default=...` value on a serializer field.
    Returns the current user.
    """
    requires_context = True

    def __call__(self, serializer_field):
        return serializer_field.context['request'].user



class LoginUserSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True, max_length=100)
    password = serializers.CharField(required=True, max_length=100)


class UserSerializer(serializers.ModelSerializer):
    id = serializers.ReadOnlyField()
    password = serializers.ReadOnlyField()
    email = serializers.ReadOnlyField()

    def create(self, validated_data):
        validated_data['username'] = validated_data['email'].replace('@', '').replace('.', '')
        validated_data['password'] = make_password(validated_data['password'])
        return User.objects.create(**validated_data)

    class Meta:
        model = User
        fields = ['id', 'is_admin', 'name', 'status', 'password', 'email', 'last_risk_update']
