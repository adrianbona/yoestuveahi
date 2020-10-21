from rest_framework import serializers
from registry.models import Registry

class RegistrySerializer(serializers.ModelSerializer):
    class Meta:
        model = Registry
        fields = '__all__'
        # fields = ['id', 'name','description','latitude', 'longitude', 'created_by']
