from select import select
from app.models import User, History
from app import db
import datetime
from datetime import date
from datetime import datetime
from sqlalchemy import desc


# u = User(username="nic", password_hash="123")
# db.session.add(u)
# db.session.commit()

# u = User(username="jez",password_hash="456")
# db.session.add(u)
# db.session.commit()


# 1 USER CAN HAVE MULTIPLE HISTORY (MATCHES) 
# date_time_str = '18/09/2021 00:00:00'

# date_time_obj = datetime.strptime(date_time_str, '%d/%m/%Y %H:%M:%S')
# h = History(user_id=1,date=date_time_obj,points=100,wordAccuracy=50,totalWords=1000,letters="ZZ")
# db.session.add(h)
# db.session.commit()


user1 = User.query.get(3)
print(user1.histories)
curdate = str(datetime.today().strftime('%d/%m/%Y')) +" 00:00:00"
formated_date = datetime.strptime(curdate, '%d/%m/%Y %H:%M:%S')
print(formated_date.date())
for i in user1.histories:
    print(i.date)
    print(str(i.date==formated_date))
# print(date.today())