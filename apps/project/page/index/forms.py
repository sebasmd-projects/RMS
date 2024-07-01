import uuid

from django import forms
from django.utils.translation import get_language
from django.utils.translation import gettext_lazy as _

from .models import SubscribeNewsLetterModel


class SubscribeNewsLetterForm(forms.ModelForm):
    current_language = get_language()

    email = forms.EmailField(
        widget=forms.EmailInput(
            attrs={
                'placeholder': _('Enter Your Email')
            }
        ),
        required=True,
    )

    language = forms.CharField(
        required=True,
        widget=forms.HiddenInput(),
        initial=current_language
    )

    unique_id = forms.UUIDField(
        widget=forms.HiddenInput(),
        initial=uuid.uuid4,
    )

    class Meta:
        model = SubscribeNewsLetterModel
        fields = ['email', 'unique_id', 'language']
