import uuid

from django.conf import settings
from django.db import models
from django.utils.translation import gettext_lazy as _

from app_core import get_app_from_path

TimeStampedModel = get_app_from_path(
    f'{settings.UTILS_PATH}.models.TimeStampedModel'
)


class SubscribeNewsLetterModel(TimeStampedModel):
    email = models.EmailField(
        _("email"),
        max_length=254
    )

    unique_id = models.UUIDField(
        default=uuid.uuid4,
        unique=True
    )

    def __str__(self):
        return f"{self.email}"

    class Meta:
        db_table = 'apps_project_page_index_subscribenewsletter'
        verbose_name = _('Subscriber')
        verbose_name_plural = _('Subscribers')
