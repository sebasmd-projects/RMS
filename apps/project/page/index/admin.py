from django.contrib import admin
from import_export.admin import ImportExportActionModelAdmin

from .models import SubscribeNewsLetterModel


@admin.register(SubscribeNewsLetterModel)
class SubscribeNewsLetterAdmin(ImportExportActionModelAdmin):
    list_filter = (
        'is_active',
        'language'
    )

    list_display = (
        'default_order',
        'email',
        'unique_id',
        'language',
        'created',
        'updated',
        'is_active'
    )
    
    search_fields = (
        'email',
        'unique_id'
    )

    list_display_links = list_display[1:4]

    readonly_fields = (
        'email',
        'language',
        'default_order',
        'unique_id'
    )
