from django.contrib import admin
from django.urls import path, re_path
from django.views.static import serve
from django.conf.urls import include
from django.conf import settings
from rest_framework_simplejwt import views as jwt_views
from django.views.generic import TemplateView

urlpatterns = [
    path('api/', include('appps.urls')),
    path('',TemplateView.as_view(template_name="index.html")),
    path('admin/', admin.site.urls),
    path('token/', jwt_views.TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
    
    
    
    re_path(r'^media/(?P<path>.*)$', serve,{'document_root': settings.MEDIA_ROOT}),
    re_path(r'^static/(?P<path>.*)$', serve,{'document_root': settings.STATIC_ROOT}),
]
