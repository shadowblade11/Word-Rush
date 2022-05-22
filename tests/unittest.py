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
        #Creates a user and adds it to the db
        hashed_password = generate_password_hash("Case")
        u1 = User(username="Test",password_hash=hashed_password)
        db.session.add(u1)
        date_time_str = '18/09/2021 00:00:00'
        date_time_obj = datetime.strptime(date_time_str, '%d/%m/%Y %H:%M:%S')
        #Creates a history and adds it to the db, linking it to user
        h1 = History(user_id=1,date=date_time_obj,points=100,wordAccuracy=50,totalWords=1000,letters="AZ")
        db.session.add(h1)
        db.session.commit()

    def tearDown(self):
        db.session.remove()
        db.drop_all()
    '''
    Test to see if password has been stored and hashed properly
    '''
    def test_password_hashtag(self):
        u = User.query.get(1)
        self.assertTrue(check_password_hash(u.password_hash,"Case"))
        self.assertFalse(check_password_hash(u.password_hash,"Incorrect"))
    '''
    Test to see if username has been stored properly
    '''
    def test_user_name(self):
        u = User.query.get(1)
        self.assertTrue(u.username == "Test")
        self.assertFalse(u.username == "TEST")
    '''
    Test to see if unique username constraint works
    '''
    def test_user_same_username(self):
        u2 = User(username="Test",password_hash="hashed_password")
        db.session.add(u2)
        with self.assertRaises(sqlalchemy.exc.IntegrityError):
            self.assertRaises(db.session.commit())
    '''
    Test to see new users can be added properly
    '''
    def test_user_add_new_user(self):
        u2 = User(username="DifferentName",password_hash="hashed_password")
        db.session.add(u2)
        db.session.commit()
        totalUsers = len(User.query.all())
        self.assertEqual(totalUsers,2)
    '''
    Test to see if history date is stored properly
    '''
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
    '''
    Test to see if history letters is stored properly
    '''
    def test_history_letters(self):
        u = User.query.get(1)
        h = u.histories[0]
        letters = h.letters
        self.assertEqual(letters,'AZ')
    '''
    Test to see if history points is stored properly
    '''
    def test_history_points(self):
        u = User.query.get(1)
        h = u.histories[0]
        points = h.points
        self.assertEqual(points,100)
    '''
    Test to see if history accuracy is stored properly
    '''
    def test_history_accuracy(self):
        u = User.query.get(1)
        h = u.histories[0]
        accuracy = h.wordAccuracy
        self.assertEqual(accuracy,50)
    '''
    Test to see if history total words is stored properly
    '''
    def test_history_total_words(self):
        u = User.query.get(1)
        h = u.histories[0]
        totalWords = h.totalWords
        self.assertEqual(totalWords,1000)
    '''
    Test to see new games can be added properly
    '''
    def test_history_add_new_game(self):
        date_time_str = '18/09/2021 00:00:00'
        date_time_obj = datetime.strptime(date_time_str, '%d/%m/%Y %H:%M:%S')
        h2 = History(user_id=1,date=date_time_obj,points=100,wordAccuracy=50,totalWords=1000,letters="AZ")
        db.session.add(h2)
        db.session.commit()
        u = User.query.get(1)
        self.assertEqual(len(u.histories),2)


if __name__ == '__main__':
    unittest.main(verbosity=2)