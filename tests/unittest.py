import unittest, os
from app import app, db
from app.models import User, History
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime
import sqlalchemy.exc
class WebsiteCase(unittest.TestCase):

    def setUp(self):
        basedir = os.path.abspath(os.path.dirname(__file__))
        app.config['SQLALCHEMY_DATABASE_URI']=\
            'sqlite:///'+os.path.join(basedir,'test.db')
        self.app = app.test_client() #Creates virtual test environemt
        db.create_all()
        hashed_password = generate_password_hash("Case")
        u1 = User(username="Test",password_hash=hashed_password)
        # u2 = User('''Input your db data here''')
        # lab = Lab(lab='test-lab', time='now')
        db.session.add(u1)
        date_time_str = '18/09/2021 00:00:00'
        date_time_obj = datetime.strptime(date_time_str, '%d/%m/%Y %H:%M:%S')
        h1 = History(user_id=1,date=date_time_obj,points=100,wordAccuracy=50,totalWords=1000,letters="AZ")
        db.session.add(h1)
        # db.session.add(lab)
        db.session.commit()

    def tearDown(self):
        db.session.remove()
        db.drop_all()
    
    def test_password_hashtag(self):
        u = User.query.get(1)
        self.assertTrue(check_password_hash(u.password_hash,"Case"))
        self.assertFalse(check_password_hash(u.password_hash,"Incorrect"))
    
    def test_user_name(self):
        u = User.query.get(1)
        self.assertTrue(u.username == "Test")
        self.assertFalse(u.username == "TEST")
    
    def test_user_same_username(self):
        u2 = User(username="Test",password_hash="hashed_password")
        db.session.add(u2)
        with self.assertRaises(sqlalchemy.exc.IntegrityError):
            self.assertRaises(db.session.commit())

    def test_history_date(self):
        u = User.query.get(1)
        h = u.histories[0]
        date = h.date
        date_time_str1 = '18/09/2021 00:00:00'
        date_time_str2 = '24/10/2002 00:00:00'
        date_time_obj1 = datetime.strptime(date_time_str1, '%d/%m/%Y %H:%M:%S')
        date_time_obj2 = datetime.strptime(date_time_str2, '%d/%m/%Y %H:%M:%S')
        self.assertTrue(date==date_time_obj1)
        self.assertFalse(date==date_time_obj2)

    def test_history_letters(self):
        u = User.query.get(1)
        h = u.histories[0]
        letters = h.letters
        self.assertEqual(letters,'AZ')
    
    def test_history_points(self):
        u = User.query.get(1)
        h = u.histories[0]
        points = h.points
        self.assertEqual(points,100)

    def test_history_accuracy(self):
        u = User.query.get(1)
        h = u.histories[0]
        accuracy = h.wordAccuracy
        self.assertEqual(accuracy,50)

    def test_history_total_words(self):
        u = User.query.get(1)
        h = u.histories[0]
        totalWords = h.totalWords
        self.assertEqual(totalWords,1000)



if __name__ == '__main__':
    unittest.main(verbosity=2)