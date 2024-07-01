from django.core.mail import send_mail
from django.urls import reverse_lazy
from django.views.generic import edit
from django.conf import settings
from django.utils.translation import gettext_lazy as _, activate, get_language

from .forms import SubscribeNewsLetterForm
from .models import SubscribeNewsLetterModel



class IndexTemplateView(edit.FormView):
    template_name = 'project/page/index/templates/page/index.html'
    form_class = SubscribeNewsLetterForm
    success_url = reverse_lazy('index:home')

    def form_valid(self, form):
        unique_id = form.cleaned_data.get('unique_id')
        if SubscribeNewsLetterModel.objects.filter(unique_id=unique_id).exists():
            form.add_error(None, _("This form has already been sent."))
            return self.form_invalid(form)

        form.save()

        current_language = get_language()
        print(current_language)
        
        # send_mail(
        #     subject='Synonym Dev | You have subscribed to the newsletter',
        #     message=(
        #         f"We send a monthly email with announcements, tips, news, feature updates, and important info.\n"
        #         f"We'll only e-mail you if it's important."
        #         f"If you want to unsubscribe, please click on the following link:\n"
        #         f""
        #     ),
        #     from_email=settings.DEFAULT_FROM_EMAIL,
        #     recipient_list=[subscribe_newsletter.email],
        #     fail_silently=False
        # )