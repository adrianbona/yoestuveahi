from rest_framework import serializers
from location.models import Location

class LocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Location
        fields = '__all__'
        # fields = ['id', 'name','description','latitude', 'longitude', 'created_by']
