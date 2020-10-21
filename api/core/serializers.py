from rest_framework import serializers
from core.models import User
from django.contrib.auth.hashers import make_password


class UserSerializer(serializers.ModelSerializer):

    def create(self, validated_data):
        validated_data['password'] = make_password(validated_data['password'])
        return User.objects.create(**validated_data)

    class Meta:
        model = User
        fields = ['id', 'username', 'password', 'is_staff',
                    'is_active', 'is_superuser', 'last_login',
                    'date_joined', 'dni']
