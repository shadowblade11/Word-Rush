from app import app
from flask import render_template, url_for, flash, redirect
@app.route('/')
@app.route('/index')
def index():
    return render_template("index.html")


@app.route('/login', methods=['GET','POST'])
def login():
    return render_template("login.html")
