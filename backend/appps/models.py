from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator


class IncidentStatus(models.Model):
    incidentStatusId = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100, null=True, blank=True)

    def __str__(self):
        return self.name


class Level(models.Model):
    levelId = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100, null=True, blank=True)
    tat = models.IntegerField(null=True, blank=True)

    def __str__(self):
        return self.name


class SparePart(models.Model):
    sparePartId = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100, null=True, blank=True)
    price = models.IntegerField(null=True, blank=True)
    totalQuantity = models.DecimalField(null=True, blank=True, max_digits=20, decimal_places=3)
    reorderLevel = models.DecimalField(null=True, blank=True, max_digits=20, decimal_places=3)

    def __str__(self):
        return self.name


class Degree(models.Model):
    degreeId = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100, null=True, blank=True)

    def __str__(self):
        return self.name


class Skill(models.Model):
    skillId = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100, null=True, blank=True)

    def __str__(self):
        return self.name


class Service(models.Model):
    serviceId = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100, null=True, blank=True)
    price = models.IntegerField(null=True, blank=True)

    def __str__(self):
        return self.name


class Product(models.Model):
    productId = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100, null=True, blank=True)
    modelNumber = models.CharField(max_length=100, null=True, blank=True)
    warrantyPeriod = models.IntegerField(null=True, blank=True)

    def __str__(self):
        return self.name


class Employee(models.Model):
    employeeId = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100, blank=True, null=True)
    address = models.CharField(max_length=400, null=True, blank=True)
    email = models.EmailField(max_length=254, null=True, blank=True)
    phone = models.BigIntegerField(validators=[MinValueValidator(1000000000), MaxValueValidator(9999999999)], null=True, blank=True)
    level = models.ForeignKey(Level, on_delete=models.SET_NULL, null=True, blank=True)
    skill = models.ForeignKey(Skill, on_delete=models.SET_NULL, null=True, blank=True)

    def __str__(self):
        return self.name


class Customer(models.Model):
    customerId = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100, null=True, blank=True)
    address = models.CharField(max_length=400, null=True, blank=True)
    email = models.EmailField(max_length=254, null=True, blank=True)
    phone = models.BigIntegerField(validators=[MinValueValidator(1000000000), MaxValueValidator(9999999999)],
                                   null=True, blank=True)

    def __str__(self):
        return self.name


class Incident(models.Model):
    incidentId = models.AutoField(primary_key=True)
    customIncidentId = models.CharField(max_length=1000, null=True, blank=True)
    customer = models.ForeignKey(Customer, on_delete=models.PROTECT, null=True, blank=True)
    employee = models.ForeignKey(Employee, on_delete=models.PROTECT, null=True, blank=True)
    incidentDescription = models.TextField(max_length=1000, null=True, blank=True)
    incidentRemark = models.TextField(max_length=1000, null=True, blank=True)
    incidentDate = models.DateField(null=True, blank=True)
    incidentTime = models.TimeField(null=True, blank=True)
    incidentStatus = models.ForeignKey(IncidentStatus, on_delete=models.PROTECT, null=True, blank=True, default=1)
    severity = models.ForeignKey(Degree, on_delete=models.PROTECT, null=True, blank=True,
                                 related_name='degree_of_severity')
    complexity = models.ForeignKey(Degree, on_delete=models.PROTECT, null=True, blank=True,
                                   related_name='degree_of_complexity')
    level = models.ForeignKey(Level, on_delete=models.PROTECT, null=True, blank=True)
    editHistory = models.JSONField(null=True, blank=True)
    expectedCompletionDate = models.DateField(null=True, blank=True)
    expectedCompletionTime = models.TimeField(null=True, blank=True)
    amount = models.DecimalField(null=True, blank=True, max_digits=20, decimal_places=2)
    spareParts = models.JSONField(null=True, blank=True)
    services = models.JSONField(null=True, blank=True)
    productPurchaseDate = models.DateField(null=True, blank=True)
    product = models.ForeignKey(Product, on_delete=models.PROTECT, null=True, blank=True)
    completionDate = models.DateField(null=True, blank=True)

    def __str__(self):
        return "Incident "+str(self.incidentId)
