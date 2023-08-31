from datetime import datetime, timedelta
from backend.appps.models import Incident, Customer, IncidentStatus
import imaplib
from backend.appps.views import remove_html_tags
import email
from email.header import decode_header
import logging
logger = logging.getLogger(__name__)


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
    status, email_ids = imap.search(None, 'ALL')

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
                    body = remove_html_tags(part.get_payload(decode=True).decode())
                except:
                    pass

                # if content_type == "text/plain" and "attachment" not in content_disposition:
                #     body = remove_html_tags(body)
                #     print("body1")
                #     print(body)
                    # print(remove_html_tags(body))

        else:
            content_type = msg.get_content_type()
            body = remove_html_tags(msg.get_payload(decode=True).decode())
            # if content_type == "text/plain":
            #     body = remove_html_tags(body)
            #     print("body2")
            #     print(body)
                # print(remove_html_tags(body))
        # print(body)
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
    print('Email Reading Successfully')
    logger.info("Cron Job was Called")