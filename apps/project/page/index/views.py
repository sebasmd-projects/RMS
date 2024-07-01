from django.conf import settings
from django.core.mail import send_mail
from django.http import HttpResponse
from django.shortcuts import get_object_or_404, redirect
from django.urls import reverse_lazy
from django.utils.translation import gettext_lazy as _
from django.views.generic import View, edit, TemplateView

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


class IndexTemplateView(TemplateView):
    template_name = 'project/page/index/templates/page/index.html'
    
class SubscribeNewsLetterFormView(edit.FormView):
    template_name = 'project/page/index/templates/includes/footer/form.html'
    form_class = SubscribeNewsLetterForm
    success_url = reverse_lazy('index:home')

    def send_subscription_email(self, subscriber, unsubscribe_url):
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
    
    def form_valid(self, form):
        unique_id = form.cleaned_data.get('unique_id')
        if SubscribeNewsLetterModel.objects.filter(unique_id=unique_id).exists():
            form.add_error(None, _("This form has already been sent."))
            return redirect(reverse_lazy('index:home'))

        email = form.cleaned_data.get('email')
        existing_subscriber = SubscribeNewsLetterModel.objects.filter(email=email).first()
        
        if existing_subscriber:
            if existing_subscriber.is_active:
                form.add_error(None, _("This email is already subscribed."))
                return redirect(reverse_lazy('index:home'))
            else:
                existing_subscriber.is_active = True
                existing_subscriber.save()
                unsubscribe_url = self.request.build_absolute_uri(
                    reverse_lazy('index:unsubscribe', args=[existing_subscriber.unique_id])
                )
                self.send_subscription_email(existing_subscriber, unsubscribe_url)
                return redirect(reverse_lazy('index:home'))
            
        subscriber = form.save()

        unsubscribe_url = self.request.build_absolute_uri(
            reverse_lazy('index:unsubscribe', args=[subscriber.unique_id])
        )
        
        self.send_subscription_email(subscriber, unsubscribe_url)

        return super().form_valid(form)
