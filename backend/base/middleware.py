# your_app/middleware.py

from django.utils import translation

class CustomLocaleMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        language = request.META.get('HTTP_ACCEPT_LANGUAGE')
        if language:
            translation.activate(language)
            request.LANGUAGE_CODE = translation.get_language()
        response = self.get_response(request)
        translation.deactivate()
        return response
