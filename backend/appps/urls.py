from django.urls import path
from .views import EmployeeView, CustomerView, IncidentView, UserView, LogoutView, Superuser, SkillView, \
    LevelView, IncidentStatusView, DegreeView, SparePartView, ProductView, ServiceView
from . import views
from rest_framework import routers
from django.urls import path

from django.conf.urls import include

router2 = routers.DefaultRouter()
router2.register('', Superuser)

# router3 = routers.DefaultRouter()
# router3.register('', sendmail)

router = routers.DefaultRouter()
router.register('users', UserView)
router.register('incidentStatuses', IncidentStatusView)
router.register('levels', LevelView)
router.register('spareParts', SparePartView)
router.register('degrees', DegreeView)
router.register('skills', SkillView)
router.register('services', ServiceView)
router.register('products', ProductView)
router.register('employees', EmployeeView)
router.register('customers', CustomerView)
router.register('incidents', IncidentView)


urlpatterns = [
    path('logout/', LogoutView.as_view()),
    path('superuser/<str:pk>/', include(router2.urls)),
    # path("sendmail/", views.sendmail, name='sendmail'),
]
urlpatterns += router.urls
