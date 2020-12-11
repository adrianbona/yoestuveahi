from rest_framework import serializers
from location.models import Location

class LocationSerializer(serializers.ModelSerializer):
    created_by = serializers.ReadOnlyField(source="created_by.name")
    current_capacity = serializers.ReadOnlyField(source="_capacity")
    class Meta:
        model = Location
        fields = '__all__'

class LocationEditSerializer(serializers.ModelSerializer):
    created_by = serializers.ReadOnlyField(source="created_by.name")
    current_capacity = serializers.ReadOnlyField(source="_capacity")
    creation_at = serializers.ReadOnlyField()
    latitude = serializers.ReadOnlyField()
    longitude = serializers.ReadOnlyField()
    concurrence = serializers.ReadOnlyField(source="_concurrence")
    capacity = serializers.ReadOnlyField(source="_capacity")

    class Meta:
        model = Location
        fields = '__all__'
