from django.shortcuts import render
from django.conf import settings

# Create your views here.
def index(request):
    api_key = settings.api_key
    return render(request, 'index.html')