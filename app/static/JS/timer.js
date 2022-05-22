/* The javascript was from https://css-tricks.com/how-to-create-an-animated-countdown-timer-with-html-css-and-javascript/ howerver,
the actual content was modified to fit our game*/

// Our own added variables
var finalScore;
var letters;
var wordAccuracy;
var date;

document.getElementById("begin").addEventListener("click", function(){

    setTimeout(function(){ //Timer will appear after 4.5 seconds

        const FULL_DASH_ARRAY = 283;
        const WARNING_THRESHOLD = 20;
        const ALERT_THRESHOLD = 10;

        const COLOR_CODES = {
        info: {
            color: "green"
        },
        warning: {
            color: "orange",
            threshold: WARNING_THRESHOLD
        },
        alert: {
            color: "red",
            threshold: ALERT_THRESHOLD
        }
        };

        const TIME_LIMIT = 60;
        let timePassed = 0;
        let timeLeft = TIME_LIMIT;
        let timerInterval = null;
        let remainingPathColor = COLOR_CODES.info.color;

        document.getElementById("timer").innerHTML = `
        <div class="base-timer">
        <svg class="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <g class="base-timer__circle">
            <circle class="base-timer__path-elapsed" cx="50" cy="50" r="45"></circle>
            <path
                id="base-timer-path-remaining"
                stroke-dasharray="283"
                class="base-timer__path-remaining ${remainingPathColor}"
                d="
                M 50, 50
                m -45, 0
                a 45,45 0 1,0 90,0
                a 45,45 0 1,0 -90,0
                "
            ></path>
            </g>
        </svg>
        <span id="base-timer-label" class="base-timer__label">${formatTime(
            timeLeft
        )}</span>
        </div>
        `;

        startTimer();

        function onTimesUp() {
            clearInterval(timerInterval);
            // CODE BETWEEN HERE IS OUR OWN CODE
            finalScore = totalPoints();
            //Gets instruction popup structure
            document.querySelector(".popup").style.display = "block";
            document.querySelector(".container-popup").style.display = "block";
            //Converts instruction popup to a scorecard by replacing text with new text
            document.querySelector(".popup").innerHTML=`
                        <h4>Your Score Is:</h4>
                        <h1>${finalScore}</h1>
                        <p>(click anywhere to close)</p>
                    `;
            //Displays play again and share button once time us up 
            document.getElementById('reset').hidden = false;
            document.getElementById('shareBtn').hidden = false;
            letters = document.getElementById("letters").innerText; //Gets the two letters
            var totalWords = validWordsArray.length + invalidWordsArray.length //Get the total words typed
            wordAccuracy = (validWordsArray.length / totalWords) * 100 //Checks and gets the word accuracy
            var year = new Date().getFullYear();
            var month = new Date().getMonth()+1;
            var day = new Date().getDate();
            date = day+'/'+month+'/'+year;
            var fullDate = day+'/'+month+'/'+year+" 00:00:00" //Formatted date for database
            console.log(fullDate);
            submit(finalScore,letters,totalWords,wordAccuracy,fullDate) //Submits/inputs to the database
        }
        // CODE BETWEEN HERE IS OUR OWN CODE

        function startTimer() {
            activateKeyboard();
        timerInterval = setInterval(() => {
            timePassed = timePassed += 1;
            timeLeft = TIME_LIMIT - timePassed;
            document.getElementById("base-timer-label").innerHTML = formatTime(
            timeLeft
            );
            setCircleDasharray();
            setRemainingPathColor(timeLeft);

            if (timeLeft === 0) {
            onTimesUp();
            }
        }, 1000);
        }

        function formatTime(time) {
        const minutes = Math.floor(time / 60);
        let seconds = time % 60;

        if (seconds < 10) {
            seconds = `0${seconds}`;
        }

        return `${minutes}:${seconds}`;
        }

        function setRemainingPathColor(timeLeft) {
        const { alert, warning, info } = COLOR_CODES;
        if (timeLeft <= alert.threshold) {
            document
            .getElementById("base-timer-path-remaining")
            .classList.remove(warning.color);
            document
            .getElementById("base-timer-path-remaining")
            .classList.add(alert.color);
        } else if (timeLeft <= warning.threshold) {
            document
            .getElementById("base-timer-path-remaining")
            .classList.remove(info.color);
            document
            .getElementById("base-timer-path-remaining")
            .classList.add(warning.color);
        }
        }

        function calculateTimeFraction() {
        const rawTimeFraction = timeLeft / TIME_LIMIT;
        return rawTimeFraction - (1 / TIME_LIMIT) * (1 - rawTimeFraction);
        }

        function setCircleDasharray() {
        const circleDasharray = `${(
            calculateTimeFraction() * FULL_DASH_ARRAY
        ).toFixed(0)} 283`;
        document
            .getElementById("base-timer-path-remaining")
            .setAttribute("stroke-dasharray", circleDasharray);
        }
    }, 4500);
});
