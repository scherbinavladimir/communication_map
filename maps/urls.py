from django.urls import path
from django.views.generic import TemplateView

urlpatterns = [
    path('', TemplateView.as_view(template_name='maps/rzd.html')),
    path('rgp', TemplateView.as_view(template_name='maps/rgp.html')),
]
