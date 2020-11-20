from django.urls import path
from exam import views
from rest_framework.urlpatterns import format_suffix_patterns


urlpatterns = [
    path('test/', views.TestList.as_view()),
    path('test/<int:pk>/', views.TestDetail.as_view()),
]

# urlpatterns = format_suffix_patterns(urlpatterns)
