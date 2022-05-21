class WebsiteCase(unittest.TestCase):

    def setUp(self):
        basedir = os.path.abspath(os.path.dirname(__file__))
        app.config['SQLALCHEMY_DATABASE_URI']=\
            'sqlite:///'+os.path.join(basedir,'test.db')
        self.app = app.test_client() #Creates virtual test environemt
        db.create_all()
        u1 = User('''Input your db data here''')
        u2 = User('''Input your db data here''')
        lab = Lab(lab='test-lab', time='now')
        db.session.add(u1)
        db.session.add(u2)
        db.session.add(lab)
        db.session.commit()

    def tearDown(self):
        db.session.remove()
        db.drop_all()
    
    def test_password_hashtag(self):
        u = User.query.get('''Insert id here''')
        u.set_password('test')
        self.assertFalse(u.check_password('case'))
        self.assertTrue(u.check_password('test'))

    def test_is_committed(self):
        u = User.query.get('''Insert id here''')
        self.assertFalse(u.is_committed)
        u2 = User.query.get('''Insert id here''')
        lab = Lab.query.first()
        p = Project(description='test', lab_id=lab.lab_id)
        db.session.add(p)
        db.session.flush()
        u.project_id = p.project_id
        u2.project_id = p.project_id
        db.session.commit()
        self.assertTrue(u.is_committed())

if __namee__ = '__main__':
    