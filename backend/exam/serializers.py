from rest_framework import serializers
from exam.models import Test
from core.serializers import CurrentUserDefault

class TestSerializer(serializers.ModelSerializer):
    taken_by = serializers.ReadOnlyField(source='taken_by.id', default=CurrentUserDefault)
    taken_by_name = serializers.ReadOnlyField(source='taken_by.name')
    processed = None
    class Meta:
        model = Test
        fields = '__all__'
