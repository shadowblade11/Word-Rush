from app import app,db
from app.models import History, User
from flask import render_template, url_for, request, redirect
from app.forms import LoginForm,RegisterForm
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import current_user, login_user, logout_user, login_required
from datetime import date, datetime
@app.route('/')
@app.route('/index')
def index():
    if current_user.is_authenticated:
        return redirect(url_for('daily'))
    else:
        return redirect(url_for('free_play'))


@app.route('/login', methods=['GET','POST'])
def login():
    if current_user.is_authenticated:
        return redirect(url_for('index'))
    form = LoginForm()
    if form.validate_on_submit():
        user = User.query.filter_by(username=form.username.data).first()
        if user:
            if check_password_hash(user.password_hash, form.password.data):
                login_user(user, remember=form.remember_me.data)
                return redirect(url_for('daily'))
            else:
                return render_template("login.html", form=form, incorrectPassword=True)
        else:
            return render_template("login.html", form=form, noUser = True)
    return render_template("login.html", form=form, title="Login")


@app.route('/register',methods=['GET','POST'])
def register():
    form = RegisterForm()
    if form.validate_on_submit():
        hashed_password = generate_password_hash(form.password.data)
        try:
            new_user = User(username=form.username.data, password_hash=hashed_password)
            db.session.add(new_user)
            db.session.commit()
            login_user(new_user)
            return redirect(url_for('index'))
        except:
            return render_template("register.html", form=form, username=form.username.data)
    
    return render_template("register.html", form=form, title="Register")


@app.route('/matchHistory')
@login_required
def matchHistory():
    data = current_user.histories
    sortedData = []
    for i in data:
        sortedData.append(
        {
            "date":str(i.date.date()),
            "letters":i.letters,
            "points":i.points,
            "totalWords":i.totalWords,
            "wordAccuracy":i.wordAccuracy
        }
        )
    sortedData.sort(key=lambda x : x.get('date'), reverse=True)
    return render_template('matchHistory.html', data=sortedData, title="Match History")

@app.route('/logout')
def logout():
    logout_user()
    return redirect(url_for('index'))



@app.route('/submit', methods=['GET', 'POST'])
def submit():
    if request.method == "POST":
        points = request.form['points']
        letters = request.form['letters']
        wordAccuracy = request.form['wordAccuracy']
        totalWords = request.form['totalwords']
        date = request.form['date']
        formatted_date = datetime.strptime(date,'%d/%m/%Y %H:%M:%S')#converts from string to datetime object
        if current_user.is_authenticated:
            h = History(user_id=current_user.id,
            date=formatted_date,letters=letters,
            points=points,totalWords=totalWords,wordAccuracy=wordAccuracy)
            db.session.add(h)
            db.session.commit()
            return f"<h1>Hello</h1>"
    else:
        return f"<h1>wrong data</h1>"

@app.route('/free_play')
def free_play():
    return render_template('index.html', freeplay=True, title="Free Play")


@app.route('/daily')
@login_required
def daily():
    data = current_user.histories
    dates = []
    for i in data:
        dates.append(str(i.date.date()))
    dates.sort(reverse=True)
    if dates==[]:
        return render_template('index.html',freeplay=False,Played=False, title="Daily")
    if dates[0] == str(date.today()):
        return render_template('index.html',freeplay=False,Played=True, title="Daily")
    else:
        return render_template('index.html',freeplay=False,Played=False, title="Daily")

@app.route('/leaderboard')
def leaderboard():
    leaderboard=[]
    usersList = User.query.all()
    for user in usersList:
        dates = []
        user_histories = user.histories
        print(user_histories)
        if user_histories == []:
            continue
        if str(user_histories[-1].date.date()) == str(date.today()):
            leaderboard.append(
                {
                    "username":user.username,
                    "points":user_histories[-1].points,
                    "totalWords":user_histories[-1].totalWords,
                    "wordAccuracy":user_histories[-1].wordAccuracy
                }
            )
    print(leaderboard)
    leaderboard.sort(key = lambda x : x.get('points'), reverse=True)
    return render_template('leaderboard.html',title="Leaderboard",data=leaderboard)