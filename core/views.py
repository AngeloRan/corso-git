from django.views.generic.base import TemplateView
from django.views import View
from django.http import HttpResponseForbidden
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.renderers import BrowsableAPIRenderer
from rest_framework_simplejwt.tokens import UntypedToken
from rest_framework_simplejwt.exceptions import InvalidToken, TokenError


# class JWTRequiredMixin(View):
#     def dispatch(self, request, *args, **kwargs):

#         token = request.COOKIES.get('token')
#         if not token:
#             # pass
#             return HttpResponseForbidden("Accesso negato. Devi essere autenticato per vedere questa pagina.")

#         try:
#             request.META['HTTP_AUTHORIZATION'] = f'Bearer {token}'
#             user, _ = JWTAuthentication().authenticate(request)
#             request.user = user
#         except Exception:
#             return HttpResponseForbidden("Accesso negato. Devi essere autenticato per vedere questa pagina.")
#             # pass
#         return super().dispatch(request, *args, **kwargs)


class CookieJWTAuthentication(JWTAuthentication):
    # def get_raw_token(self, request):
    #     # Controlla prima l'intestazione Authorization
    #     auth = super().get_raw_token(request)
    #     if auth is None:
    #         # Se non c'è token nell'intestazione, prova a prenderlo dai cookie
    #         return request.COOKIES.get('access_token')
    #     return auth

    def authenticate(self, request):
        header = self.get_header(request) or f'Bearer {
            request._request.COOKIES["token"]}'.encode("utf-8")
        print("HEADER", header)
        if header is None:
            return None

        raw_token = self.get_raw_token(header)
        if raw_token is None:
            return None

        validated_token = self.get_validated_token(raw_token)

        return self.get_user(validated_token), validated_token


class LoginTemplateView(TemplateView):
    template_name = 'core/login.html'


class HomeTemplateView(CookieJWTAuthentication, TemplateView):
    template_name = 'core/home.html'
