from rest_framework import serializers
from contagion.models import Contagion, ContagionRisk

class ContagionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contagion
        fields = '__all__'

class ContagionRiskSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContagionRisk
        fields = '__all__'
