from datetime import datetime
from apps.project.page.index.forms import SubscribeNewsLetterForm
def custom_processors(request):
    ctx = {}
    ctx['subscribe_newsletter'] = SubscribeNewsLetterForm
    return ctx