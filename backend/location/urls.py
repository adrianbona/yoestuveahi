from django.urls import path
from location import views
from rest_framework.urlpatterns import format_suffix_patterns


urlpatterns = [
    path('checkin/<int:pk>/', views.checkin),
    path('checkout/<int:pk>/', views.checkout),
    path('location/', views.LocationList.as_view()),
    path('location/<int:pk>/', views.LocationDetail.as_view()),
]

# urlpatterns = format_suffix_patterns(urlpatterns)
