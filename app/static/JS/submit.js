/**
 * sends a POST request to the url /submit with the data
 * so that it can be added to the database
 * @param totalPoints - total points
 * @param letters - the letters
 * @param totalwords - the total words they've typed
 * @param wordAccuracy - how accurate they were
 * @param date - the date
 */
function submit(totalPoints,letters,totalwords,wordAccuracy,date){
    //checks to see whether the game they've played is daily or free play
    var boolean = document.getElementById("booleanStatement").innerText;
    if (boolean === 'False'){
        //sends a POST request,
        $.post("/submit",
            //the date is in JSON format
            {
                points: totalPoints,
                letters: letters,
                totalwords: totalwords,
                wordAccuracy: wordAccuracy,
                date: date
            }
        )
    }
}