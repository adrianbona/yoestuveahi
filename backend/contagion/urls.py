from django.urls import path
from contagion import views
from rest_framework.urlpatterns import format_suffix_patterns


urlpatterns = [
    path('contagion/', views.ContagionList.as_view()),
    path('contagion/new/', views.new),
    path('contagion/<int:pk>/', views.ContagionDetail.as_view()),
    path('contagion/risk/', views.ContagionRiskList.as_view()),
    path('contagion/risk/<int:pk>/', views.ContagionRiskDetail.as_view()),
]

# urlpatterns = format_suffix_patterns(urlpatterns)
