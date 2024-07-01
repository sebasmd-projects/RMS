from django.contrib import admin
from import_export.admin import ImportExportActionModelAdmin
from .models import SubscribeNewsLetterModel

admin.site.register(SubscribeNewsLetterModel)