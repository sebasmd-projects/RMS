import uuid

from django import forms
from django.utils.translation import gettext_lazy as _

from .models import SubscribeNewsLetterModel


class SubscribeNewsLetterForm(forms.ModelForm):
    email = forms.EmailField(
        widget=forms.EmailInput(
            attrs={
                'placeholder': _('Enter Your Email')
            }
        ),
        required=True,
    )

    unique_id = forms.UUIDField(
        widget=forms.HiddenInput(),
        initial=uuid.uuid4,
    )

    class Meta:
        model = SubscribeNewsLetterModel
        fields = ['email', 'unique_id']
