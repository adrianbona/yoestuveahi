from rest_framework import serializers
from registry.models import Registry

class RegistrySerializer(serializers.ModelSerializer):
    registered_by = serializers.ReadOnlyField(source="registered_by.id")
    registered_by_name = serializers.ReadOnlyField(source="registered_by.name")
    included_in_name = serializers.ReadOnlyField(source="included_in.name")
    class Meta:
        model = Registry
        fields = '__all__'

class RegistryEditSerializer(serializers.ModelSerializer):
    registered_by = serializers.ReadOnlyField(source="registered_by.id")
    registered_by_name = serializers.ReadOnlyField(source="registered_by.name")
    included_in = serializers.ReadOnlyField(source="included_in.id")
    included_in_name = serializers.ReadOnlyField(source="included_in.name")
    class Meta:
        model = Registry
        fields = '__all__'
