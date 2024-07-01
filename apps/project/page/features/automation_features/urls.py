from django.urls import path

from .views import AutomationFeaturesTemplateView

app_name = "automation_features"

urlpatterns = [
    path(
        'features/automation',
        AutomationFeaturesTemplateView.as_view(),
        name='home'
    )
]