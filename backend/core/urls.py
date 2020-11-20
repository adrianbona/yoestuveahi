from django.urls import path
from core import views
from rest_framework.urlpatterns import format_suffix_patterns


urlpatterns = [
    path('login', views.LoginUserList.as_view()),
    path('logout', views.custom_logout),
    path('user/', views.UserList.as_view()),
]

# urlpatterns = format_suffix_patterns(urlpatterns)
