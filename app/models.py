from app import db
from app import login
from flask_login import UserMixin
class User(UserMixin,db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(64), index=True, unique=True)
    password_hash = db.Column(db.String(128))
    histories = db.relationship('History', backref='user')
    def __repr__(self):
        return f"<id = {self.id}, user = {self.username}, histories = {self.histories}"

@login.user_loader
def load_user(id):
    return User.query.get(int(id))

class History(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    date = db.Column(db.DateTime, nullable=False)
    letters = db.Column(db.String(2), nullable=False)
    points = db.Column(db.Integer, nullable=False)
    totalWords = db.Column(db.Integer, nullable=False)
    wordAccuracy = db.Column(db.Integer,nullable=False)
    def __repr__(self):
        return f"<id = {self.id}, user = {self.user_id}, letters = {self.letters}, points = {self.points}, totalWords = {self.totalWords}, wordAccuracy = {self.wordAccuracy} date = {self.date}>"
