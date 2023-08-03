from django.contrib import admin
from .models import IncidentStatus, Level, Degree, Skill, Employee, Customer, Incident, SparePart, Product, Service

admin.site.register(IncidentStatus)
admin.site.register(Level)
admin.site.register(SparePart)
admin.site.register(Degree)
admin.site.register(Skill)
admin.site.register(Service)
admin.site.register(Product)
admin.site.register(Employee)
admin.site.register(Customer)
admin.site.register(Incident)
