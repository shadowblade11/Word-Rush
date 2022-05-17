from app import app,db
from app.models import User
from flask import render_template, url_for, flash, redirect
from app.forms import LoginForm,RegisterForm
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import current_user, login_user, logout_user
@app.route('/')
@app.route('/index')
def index():
    return render_template("index.html")


@app.route('/login', methods=['GET','POST'])
def login():
    if current_user.is_authenticated:
        return redirect(url_for('index'))
    form = LoginForm()
    if form.validate_on_submit():
        user = User.query.filter_by(username=form.username.data).first()
        if user:
            if check_password_hash(user.password_hash, form.password.data):
                # return f"<h1>Hello {form.username.data}</h1>"
                login_user(user, remember=form.remember_me.data)
                return render_template("index.html")
            else:
                return render_template("login.html", form=form, incorrectPassword=True)
        else:
            return render_template("login.html", form=form, noUser = True)
    return render_template("login.html", form=form)


@app.route('/register',methods=['GET','POST'])
def register():
    form = RegisterForm()
    if form.validate_on_submit():
        hashed_password = generate_password_hash(form.password.data)
        try:
            new_user = User(username=form.username.data, password_hash=hashed_password)
            db.session.add(new_user)
            db.session.commit()
            return f"<h1>User has been created</h1>"
        except:
            return render_template("register.html", form=form, username=form.username.data)
    
    return render_template("register.html", form=form)


@app.route('/logout')
def logout():
    logout_user()
    return redirect(url_for('index'))