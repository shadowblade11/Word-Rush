# Word Rush
An online daily puzzle game created for the CITS3403 project

## Getting Started
(Please note that this guide will assume that wsl or some other linux based terminal is used, and not windows)

### Prerequisites
First ensure that python3 and pip are installed.

To check, run these commands (separately) in your terminal:
```
python3 --version
pip --version
```

If you do not have `python3` or `pip`, run these commands (separately) to install:
```
sudo apt update && upgrade
sudo apt install python3 python3-pip
```

### Making the virtual environment
After ensuring that you have python3 and pip installed. You'll need to create a virtual environment.

First, run this command:
```
python3 -m venv venv
```
(please note that an error may pop up saying to download python3.8-venv. if so, follow what it says)

After it has finished installing, run:
```
source venv/bin/activate
```
to activate the virtual environment
(afterward, you should see `(venv)` near your command line)


### Installing the requirements
After creating and activating the virtual environment. You'll need to install the requirements needed

Run this command:
```
pip install -r requirements.txt
```

## Starting the game
### Testing the game
Run this command in order to test the database:
```
python3 -m tests.unittest
```

### Creating the database
first, a database needs to be created to store user and game details.

Run these commands (separately):
```
flask db migrate
flask db upgrade
```

### Starting the game
(ensure that the virtual environment is activated)
to start the website, run this:
```
flask run
```
This should start the app running on localhost at port 5000, i.e. [http://localhost:5000/index](http://localhost:5000/index)


## Gameplay
### Instructions
2 letters will appear near the top. Your goal is to type as many words as you can in under a minute. However, the words that you type have to contain **AT LEAST** one of the letters that are shown. The more letters that are used in your word, the more points. If you write a word that has **BOTH LETTERS** in the **SAME POSITION**, you get double the points (this stacks btw :) ).

### Example
TH

POOL -> 0pt (doesn't have T or H)

HER -> 35pt (contains a H so the word is counted. It has 3 letters, so a base amount of 30pt are given. Since a H was used, 5 pt was added)

HATCH -> 65pt (contains a letter, so base of 50pt. Plus 15pt for 3 occurrence of T or H)

THAT = 110pt (you get a base of 40pt, plus 15 for using T or H 3 times. BUT since TH are together you get a 2 times multiplier, 55*2 equal 110)


## Authors
Sunny Lac - [shadowblade11](https://github.com/shadowblade11)

Jeremy Robertson

## Acknowledgments
Built following the [Flask Mega-Tutorial](https://blog.miguelgrinberg.com/post/the-flask-mega-tutorial-part-i-hello-world) by **Miguel Grinberg**.


