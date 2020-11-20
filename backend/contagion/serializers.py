from rest_framework import serializers
from contagion.models import Contagion, ContagionRisk

class ContagionSerializer(serializers.ModelSerializer):
    reported_by = serializers.ReadOnlyField(source="reported_by.id")
    class Meta:
        model = Contagion
        fields = '__all__'
        # exclude = ['processed']

class ContagionRiskSerializer(serializers.ModelSerializer):
    informed_by = serializers.ReadOnlyField(source="informed_by.id")
    class Meta:
        model = ContagionRisk
        fields = '__all__'
        # exclude = ['processed']
