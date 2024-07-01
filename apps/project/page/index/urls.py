from django.urls import path

from .views import (
    IndexTemplateView,
    SubscribeNewsLetterFormView,
    UnsubscribeView
)

app_name = "index"

urlpatterns = [
    path(
        '',
        IndexTemplateView.as_view(),
        name='home'
    ),
    path(
        'newsletter',
        SubscribeNewsLetterFormView.as_view(),
        name='newsletter'
    ),
    path(
        'unsuscribe/<uuid:unique_id>/',
        UnsubscribeView.as_view(),
        name='unsubscribe'
    )
]
