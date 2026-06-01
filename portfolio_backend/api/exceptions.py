from rest_framework.views import exception_handler as drf_handler
from rest_framework.response import Response


def custom_exception_handler(exc, context):
    response = drf_handler(exc, context)
    if response is None:
        # Unhandled exception — return JSON so the frontend sees the real error
        return Response(
            {'error': f'{type(exc).__name__}: {exc}'},
            status=500,
        )
    return response
