from django.urls import path, include
from django.http import JsonResponse


def handler404(request, exception=None):
    return JsonResponse({'error': f'Endpoint not found: {request.path}'}, status=404)


def handler500(request):
    return JsonResponse({'error': 'Internal server error'}, status=500)


urlpatterns = [
    path('api/', include('api.urls')),
]
