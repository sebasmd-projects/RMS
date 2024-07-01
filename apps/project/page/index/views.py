from django.conf import settings
from django.core.mail import send_mail
from django.http import HttpResponse
from django.shortcuts import get_object_or_404
from django.urls import reverse_lazy
from django.utils.translation import gettext_lazy as _
from django.views.generic import View, edit

from .forms import SubscribeNewsLetterForm
from .models import SubscribeNewsLetterModel


class UnsubscribeView(View):
    def get(self, request, unique_id):
        subscriber = get_object_or_404(
            SubscribeNewsLetterModel,
            unique_id=unique_id
        )
        subscriber.is_active = False
        subscriber.save()
        return HttpResponse(_("You have been successfully unsubscribed."))


class IndexTemplateView(edit.FormView):
    template_name = 'project/page/index/templates/page/index.html'
    form_class = SubscribeNewsLetterForm
    success_url = reverse_lazy('index:home')

    def form_valid(self, form):
        unique_id = form.cleaned_data.get('unique_id')
        if SubscribeNewsLetterModel.objects.filter(unique_id=unique_id).exists():
            form.add_error(None, _("This form has already been sent."))
            return self.form_invalid(form)

        email = form.cleaned_data.get('email')
        if SubscribeNewsLetterModel.objects.filter(email=email).exists():
            form.add_error(None, _("This email is already subscribed."))
            return self.form_invalid(form)

        subscriber = form.save()

        unsubscribe_url = self.request.build_absolute_uri(
            reverse_lazy('index:unsubscribe', args=[subscriber.unique_id])
        )

        if subscriber.language == "es":
            subject = "Synonym Dev | Te has suscrito al boletín informativo"
            message = (
                "Enviamos un correo electrónico mensual con anuncios, consejos, noticias, actualizaciones de funciones e información importante.\n"
                "Sólo le enviaremos un correo electrónico si es importante.\n"
                "Si desea darse de baja, haga clic en el siguiente enlace:\n"
                f"{unsubscribe_url}"
            )

        else:
            subject = "Synonym Dev | You have subscribed to the newsletter"
            message = (
                "We send a monthly email with announcements, tips, news, feature updates, and important info.\n"
                "We'll only e-mail you if it's important.\n"
                "If you want to unsubscribe, please click on the following link:\n"
                f"{unsubscribe_url}"
            )

        send_mail(
            subject=subject,
            message=message,
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[subscriber.email],
            fail_silently=False
        )

        return super().form_valid(form)
