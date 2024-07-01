from django.urls import include, path
from .views import AIFeaturesTemplateView

app_name = "ai_features"

urlpatterns = [
    path(
        'features/AI',
        AIFeaturesTemplateView.as_view(),
        name='home'
    )
]