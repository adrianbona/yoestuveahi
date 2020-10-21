from django.urls import path
from registry import views
from rest_framework.urlpatterns import format_suffix_patterns


urlpatterns = [
    path('registry/', views.RegistryList.as_view()),
    path('resgistry/<int:pk>/', views.RegistryDetail.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)
