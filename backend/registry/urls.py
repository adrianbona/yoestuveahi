from django.urls import path
from registry import views
from rest_framework.urlpatterns import format_suffix_patterns


urlpatterns = [
    path('registry/', views.RegistryList.as_view()),
    path('registry/<int:pk>/', views.RegistryDetail.as_view()),
    path('registry/external/<int:site>/<int:pk>/', views.external_checkin),
]

# urlpatterns = format_suffix_patterns(urlpatterns)
