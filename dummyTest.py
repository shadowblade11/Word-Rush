from app.models import User, History
from app import db
import datetime


# u = User(username="nic", password_hash="123")
# db.session.add(u)
# db.session.commit()

# u = User(username="jez",password_hash="456")
# db.session.add(u)
# db.session.commit()


# 1 USER CAN HAVE MULTIPLE HISTORY (MATCHES) 

# h = History(user_id=1,date=datetime.datetime.now(),points=100,wordAccuracy=50,totalWords=1000,letters="CD")
# db.session.add(h)
# db.session.commit()


user1 = User.query.all()
print(user1)