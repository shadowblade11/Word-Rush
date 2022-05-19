from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, BooleanField, SubmitField
from wtforms.validators import DataRequired, Length

class LoginForm(FlaskForm):
    username    = StringField('username',   validators=[DataRequired(),Length(min=8, max=20)])
    password    = PasswordField('password', validators=[DataRequired(),Length(min=8, max=30)])
    remember_me = BooleanField('remember me?')

class RegisterForm(FlaskForm):
    username    = StringField('username',   validators=[DataRequired(),Length(min=8, max=20)])
    password    = PasswordField('password', validators=[DataRequired(),Length(min=8, max=30)])