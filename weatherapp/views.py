from django.shortcuts import render 
import urllib.request
import json
from urllib.error import HTTPError

def index(request):
    if request.method == 'POST':
        city = request.POST['city']
        try:
            source = urllib.request.urlopen('https://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=metric&appid=a2e6160a6f50608186f4eb5dd3065711').read()
            data_list = json.loads(source)
            data = {
                'description': str(data_list['weather'][0]['description']),
                'temp': str(data_list['main']['temp']),
                'icon': data_list['weather'][0]['icon'],
                'feels_like': str(data_list['main']['feels_like']),
                'humidity': str(data_list['main']['humidity']),
                'wind': str(data_list['wind']['speed'])
            }
        except HTTPError as e:
            # Handle HTTP error incase city is not found
            error_message = f"Error: {e}"
            data = {'error_message': error_message}
        
    else:
        data = {}
    return render(request, 'index.html', data)
