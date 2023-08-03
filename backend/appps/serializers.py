from rest_framework.serializers import ModelSerializer
from drf_writable_nested.serializers import WritableNestedModelSerializer
from django.contrib.auth.models import User, Group
from .models import Employee, Customer, Incident, Skill, Level, IncidentStatus, Degree, SparePart, Product, Service
from rest_framework.authtoken.models import Token
from django.contrib.auth.password_validation import validate_password


class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'first_name', 'last_name', 'email', 'username', 'password', 'is_superuser']
        extra_kwargs = {'password': {'write_only': True, 'required': True}}

    def create(self, validated_data):
        print("Create inside serializers")
        print(validated_data)
        user = User.objects.create_user(**validated_data)
        user.is_active = True
        Token.objects.create(user=user)
        print(user)
        return user


class IncidentStatusSerializer(ModelSerializer):
    class Meta:
        model = IncidentStatus
        fields = ['incidentStatusId', 'name']


class LevelSerializer(ModelSerializer):
    class Meta:
        model = Level
        fields = ['levelId', 'name', 'tat']


class SparePartSerializer(ModelSerializer):
    class Meta:
        model = SparePart
        fields = ['sparePartId', 'name', 'price', 'totalQuantity', 'reorderLevel']


class DegreeSerializer(ModelSerializer):
    class Meta:
        model = Degree
        fields = ['degreeId', 'name']


class SkillSerializer(ModelSerializer):
    class Meta:
        model = Skill
        fields = ['skillId', 'name']


class ServiceSerializer(ModelSerializer):
    class Meta:
        model = Service
        fields = ['serviceId', 'name', 'price']


class ProductSerializer(ModelSerializer):
    class Meta:
        model = Product
        fields = ['productId', 'name', 'modelNumber', 'warrantyPeriod']


class EmployeeSerializer(ModelSerializer):
    skill = SkillSerializer(allow_null=True)
    level = LevelSerializer(allow_null=True)
    class Meta:
        model = Employee
        fields = ['employeeId', 'name', 'address', 'email', 'phone', 'skill', 'level']


class CustomerSerializer(ModelSerializer):
    class Meta:
        model = Customer
        fields = ['customerId', 'name', 'address', 'email', 'phone']


class IncidentSerializer(WritableNestedModelSerializer):
    # customer = serializers.CharField(required=False)
    # employee = serializers.CharField(required=False)
    customer = CustomerSerializer(allow_null=True)
    employee = EmployeeSerializer(allow_null=True)
    incidentStatus = IncidentStatusSerializer(allow_null=True)
    severity = DegreeSerializer(allow_null=True)
    level = LevelSerializer(allow_null=True)
    complexity = DegreeSerializer(allow_null=True)
    product = ProductSerializer(allow_null=True)
    class Meta:
        model = Incident
        fields = ['incidentId', "customIncidentId", 'incidentDescription', 'incidentDate', 'incidentTime', 'employee', 'customer',
                  'severity', 'complexity', 'level', 'incidentRemark', 'incidentStatus','expectedCompletionDate',
                  'expectedCompletionTime', 'amount', 'editHistory', 'spareParts', 'productPurchaseDate', 'product',
                  'services']


