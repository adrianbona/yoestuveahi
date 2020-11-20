from rest_framework import serializers
from location.models import Location

class LocationSerializer(serializers.ModelSerializer):
    created_by = serializers.ReadOnlyField(source="created_by.name")
    current_capacity = serializers.ReadOnlyField(source="capacity")
    class Meta:
        model = Location
        fields = '__all__'

class LocationEditSerializer(serializers.ModelSerializer):
    created_by = serializers.ReadOnlyField(source="created_by.name")
    current_capacity = serializers.ReadOnlyField(source="capacity")
    creation_at = serializers.ReadOnlyField()
    latitude = serializers.ReadOnlyField()
    longitude = serializers.ReadOnlyField()
    class Meta:
        model = Location
        fields = '__all__'
