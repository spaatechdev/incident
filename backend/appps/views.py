import re
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.contrib.auth.models import User, Group
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.hashers import make_password
from rest_framework.response import Response
from .models import Employee, Customer, Incident, Skill, Level, IncidentStatus, Degree, SparePart, Product, Service
from .serializers import EmployeeSerializer, CustomerSerializer, IncidentSerializer, UserSerializer, LevelSerializer,\
    SkillSerializer, IncidentStatusSerializer, SparePartSerializer, DegreeSerializer, ProductSerializer,\
    ServiceSerializer
import json
import calendar
from datetime import datetime, timedelta    
from django.utils.dateparse import parse_date
from rest_framework.decorators import api_view
from django.http import HttpResponse
import imaplib
import email
from email.header import decode_header
from django.conf import settings
from django.core.mail import send_mail
# import pywhatkit


class LogoutView(APIView):
    permission_classes = (IsAuthenticated,)
    def post(self, request):
        try:
            refresh_token = request.data["refresh_token"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)


class UserView(viewsets.ModelViewSet):
    queryset = User.objects.all()
    def create(self, request, *args, **kwargs):
        try:
            print("Inside view create")
            data = json.loads(request.body)
            print("data: ", data)
            g = Group.objects.get(name='Employee')
            user = User.objects.create(
                first_name=data['first_name'],
                last_name=data['last_name'],
                email=data['email'],
                username=data['username'],
                password=make_password(data['password']),
            )
            user.groups.add(g)
            return Response(status=status.HTTP_200_OK)

        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)

    serializer_class = UserSerializer
    permission_classes = (AllowAny,)


class Superuser(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    @action(detail=False, methods=['GET'])
    def get_queryset(self, *args, **kwargs):
        usern = self.kwargs.get('pk', None)
        return super().get_queryset().filter(username=usern)


class IncidentStatusView(viewsets.ModelViewSet):
    queryset = IncidentStatus.objects.all()
    serializer_class = IncidentStatusSerializer
    permission_classes = [IsAuthenticated]


class LevelView(viewsets.ModelViewSet):
    queryset = Level.objects.all()
    serializer_class = LevelSerializer
    permission_classes = [IsAuthenticated]


class SparePartView(viewsets.ModelViewSet):
    queryset = SparePart.objects.all()
    serializer_class = SparePartSerializer
    permission_classes = [IsAuthenticated]


class DegreeView(viewsets.ModelViewSet):
    queryset = Degree.objects.all()
    serializer_class = DegreeSerializer
    permission_classes = [IsAuthenticated]


class SkillView(viewsets.ModelViewSet):
    queryset = Skill.objects.all()
    serializer_class = SkillSerializer
    permission_classes = [IsAuthenticated]


class ServiceView(viewsets.ModelViewSet):
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer
    permission_classes = [IsAuthenticated]


class ProductView(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [IsAuthenticated]


class EmployeeView(viewsets.ModelViewSet):
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer
    permission_classes = [IsAuthenticated]
    def create(self, request, *args, **kwargs):
        try:
            data = json.loads(request.body)
            level = Level.objects.get(levelId=data['levelId'])
            skill = Skill.objects.get(skillId=data['skillId'])
            Employee.objects.create(
                name=data['name'],
                address=data['address'],
                email=data['email'],
                phone=data['phone'],
                level=level,
                skill=skill
            )
            return Response(status=status.HTTP_200_OK)

        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, *args, **kwargs):
        try:
            data = json.loads(request.body)
            pk = self.kwargs['pk']
            level = Level.objects.get(levelId=data['levelId'])
            skill = Skill.objects.get(skillId=data['skillId'])
            employee = Employee.objects.get(employeeId=pk)
            employee.name = data['name']
            employee.address = data['address']
            employee.email = data['email']
            employee.phone = data['phone']
            employee.level = level
            employee.skill = skill
            employee.save()
            return Response(status=status.HTTP_200_OK)

        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)


class CustomerView(viewsets.ModelViewSet):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer
    permission_classes = [IsAuthenticated]


class IncidentView(viewsets.ModelViewSet):
    queryset = Incident.objects.all()
    serializer_class = IncidentSerializer
    permission_classes = (IsAuthenticated,)

    def create(self, request, *args, **kwargs):
        try:
            data = json.loads(request.body)
            print(data)
            employee = Employee.objects.get(employeeId=data['employeeId'])
            customer = Customer.objects.get(customerId=data['customerId'])
            product = Product.objects.get(productId=data['productId'])
            incidentstatus = IncidentStatus.objects.get(incidentStatusId=1)
            severity = Degree.objects.get(degreeId=data['severity'])
            complexity = Degree.objects.get(degreeId=data['complexity'])
            averageid = (data['severity']+data['severity'])/2
            levelid = 1
            if averageid < round(Level.objects.all().count()/2):
                levelid = 1
            elif averageid > round(Level.objects.all().count()/2):
                levelid = 3
            else:
                levelid = 2
            level = Level.objects.get(levelId=levelid)
            Incident.objects.create(
                customIncidentId = "INC"+(str(Incident.objects.last().incidentId+1) if (Incident.objects.all().count())!=0 else "1").zfill(4),
                customer=customer,
                employee=employee,
                incidentDescription=data['incidentDescription'],
                incidentRemark=data['incidentRemark'],
                incidentDate=datetime.now().date(),
                incidentTime=datetime.now().time().replace(microsecond=0),
                incidentStatus=incidentstatus,
                severity=severity,
                complexity=complexity,
                level=level,
                expectedCompletionDate=(datetime.now() + timedelta(hours=level.tat)).date(),
                expectedCompletionTime=(datetime.now() + timedelta(hours=level.tat)).time().replace(microsecond=0),
                editHistory=[],
                spareParts=[],
                services=[],
                productPurchaseDate=parse_date(data['productPurchaseDate']),
                product=product
            )

            # sending email to customer
            # incidentid = "INC"+str(Incident.objects.last().incidentId).zfill(4)
            # subject = 'Confirmation of your incident report.'
            # message = f'Dear {customer.name},\nYour incident no. {incidentid } has been reported and has ' \
            #           f'been assigned to {employee.name}. {employee.name} (Mob no:{employee.phone}) will ' \
            #           'further investigate your matter and try to solve it as soon as possible.\n' \
            #           'Hope your issue gets resolved soon.\n' \
            #           'Best regards.'
            # email_from = settings.EMAIL_HOST_USER
            # recipient_list = [customer.email, ]
            # send_mail(subject, message, email_from, recipient_list)
            # pywhatkit.sendwhatmsg(str(customer.phone), message, 14, 1)
            # pywhatkit.sendwhatmsg()
            #
            # # sending email to employee
            # subject = 'Incident assignment'
            # message = f'Dear {employee.name},\n' \
            #           f'You have been assigned {customer.name}’s incident no. {incidentid}. ' \
            #           'Try to complete it within the stipulated time assigned to you according ' \
            #           'to your level.\nHope you would resolve the issue without any problem.\n' \
            #           'Best regards.'
            # email_from = settings.EMAIL_HOST_USER
            # recipient_list = [employee.email, ]
            # send_mail(subject, message, email_from, recipient_list)

            return Response(status=status.HTTP_200_OK)

        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, *args, **kwargs):
        data = json.loads(request.body)
        pk = self.kwargs['pk']
        oldSP = Incident.objects.get(incidentId=pk).spareParts
        newSP = data['spareParts']
        for i in oldSP:
            flag = False
            sp = SparePart.objects.get(sparePartId=i['sparePart'])
            for j in newSP:
                if j['sparePart'] == i['sparePart']:
                    sp.totalQuantity += i['quantity'] - j['quantity']
                    flag = True
                    break
            if flag == False:
                sp.totalQuantity += i['quantity']
            sp.save()
        for i in newSP:
            flag = False
            sp = SparePart.objects.get(sparePartId=i['sparePart'])
            for j in oldSP:
                if j['sparePart'] == i['sparePart']:
                    flag = True
                    break
            if flag == False:
                sp.totalQuantity -= i['quantity']
            sp.save()
        employee = Employee.objects.get(employeeId=data['employeeId'])
        incidentstatus = IncidentStatus.objects.get(incidentStatusId=data['incidentStatus'])
        severity = Degree.objects.get(degreeId=data['severity'])
        complexity = Degree.objects.get(degreeId=data['complexity'])
        averageid = (data['severity'] + data['severity']) / 2
        levelid = 1
        if averageid < round(Level.objects.all().count() / 2):
            levelid = 1
        elif averageid > round(Level.objects.all().count() / 2):
            levelid = 3
        else:
            levelid = 2
        level = Level.objects.get(levelId=levelid)
        incident = Incident.objects.get(incidentId=pk)
        incident.incidentDescription = data['incidentDescription']
        incident.employee = employee
        incident.incidentRemark = data['incidentRemark']
        incident.incidentStatus = incidentstatus
        incident.severity = severity
        incident.complexity = complexity
        incident.level = level
        incident.editHistory = data['editHistory']
        incident.spareParts = data['spareParts']
        incident.services = data['services']
        current_date_time = datetime.combine(incident.incidentDate, incident.incidentTime)
        incident.expectedCompletionDate = (current_date_time + timedelta(hours=level.tat)).date()
        incident.expectedCompletionTime = (current_date_time + timedelta(hours=level.tat)).time().replace(microsecond=0)
        if data['amount']:
            incident.amount = data['amount']
        else:
            incident.amount = None
        if data['incidentStatus'] == 2:
            incident.completionDate = incident.expectedCompletionDate
        else:                
            incident.completionDate = None
        incident.save()
        return Response(status=status.HTTP_200_OK)

        # except Exception as e:
        #     return Response(status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def RegisteredVsResolved(request):
    year = request.data['year']
    month = request.data['month']
    x = {
        calendar.month_name[month-2]: {"registered": 10, "resolved": 4},
        calendar.month_name[month-1]: {"registered": 7, "resolved": 5},
        calendar.month_name[month]: {"registered": 4, "resolved": 3},
    }
    if request.method == 'POST':
        return Response(x)

    return Response("Failure")


def remove_html_tags(text):
    """Remove html tags from a string"""
    clean = re.compile('<.*?>')
    return re.sub(clean, '', text)

@api_view(['GET'])
def readEmail(request):
    # account credentials
    username = "andleebmiraanyt@gmail.com"
    password = "gaskdxgijwrctxtx"
    # use your email provider's IMAP server, you can look for your provider's IMAP server on Google
    # or check this page: https://www.systoolsgroup.com/imap/
    # for office 365, it's this:
    imap_server = "imap.gmail.com"

    # Connect to the IMAP server
    imap = imaplib.IMAP4_SSL(imap_server)
    imap.login(username, password)

    # Select the mailbox you want to access (e.g., "inbox")
    status, email_ids = imap.select('inbox')

    # Search for unseen emails (UNSEEN indicates unread emails)
    status, email_ids = imap.search(None, 'UNSEEN')

    # Retrieve and print email details
    for email_id in email_ids[0].split():
        status, msg_data = imap.fetch(email_id, '(RFC822)')
        msg = email.message_from_bytes(msg_data[0][1])

        subject, encoding = decode_header(msg['Subject'])[0]
        if isinstance(subject, bytes):
            subject = subject.decode(encoding or 'utf-8')

        from_, encoding = decode_header(msg.get('From'))[0]
        if isinstance(from_, bytes):
            from_ = from_.decode(encoding or 'utf-8')
        print(from_)
        # date, encoding = decode_header(msg.get('Date'))[0]
        # if isinstance(date, bytes):
        #     date = date.decode(encoding or 'utf-8')
        # d = date.split(" ")
        # dt = datetime(int(d[3]), datetime.strptime(d[2], '%b').month, int(d[1])).date()
        body = None
        if msg.is_multipart():
            for part in msg.walk():
                content_type = part.get_content_type()
                content_disposition = str(part.get("Content-Disposition"))

                try:
                    body = part.get_payload(decode=True).decode()
                except:
                    pass

                if content_type == "text/plain" and "attachment" not in content_disposition:
                    body = remove_html_tags(body)
                    # print("body1")
                    # print(body)
                    # print(remove_html_tags(body))

        else:
            content_type = msg.get_content_type()
            body = msg.get_payload(decode=True).decode()
            if content_type == "text/plain":
                body = remove_html_tags(body)
                # print("body2")
                # print(body)
                # print(remove_html_tags(body))

        senderEmail = from_[from_.index('<') + 1:from_.index('>')]
        if not Customer.objects.filter(email__exact=senderEmail).exists():
            Customer.objects.create(
                name=from_[:from_.index('<')-1],
                email=senderEmail
            )
        Incident.objects.create(
            customIncidentId="INC" + (
                str(Incident.objects.last().incidentId + 1) if (Incident.objects.all().count()) != 0 else "1").zfill(4),
            customer=Customer.objects.get(email=senderEmail),
            incidentDate=datetime.now().date(),
            incidentTime=datetime.now().time().replace(microsecond=0),
            incidentStatus=IncidentStatus.objects.get(incidentStatusId=1),
            incidentDescription=body,
            editHistory=[],
            spareParts=[],
            services=[],
        )

    # Logout and close the connection
    imap.logout()
    return HttpResponse('Email Reading Successfully')
