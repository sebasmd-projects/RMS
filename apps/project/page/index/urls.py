from django.urls import path

from .views import IndexTemplateView, UnsubscribeView

app_name = "index"

urlpatterns = [
    path(
        '',
        IndexTemplateView.as_view(),
        name='home'
    ),
    path(
        'unsuscribe/<uuid:unique_id>/',
        UnsubscribeView.as_view(),
        name='unsubscribe'
    )
]
