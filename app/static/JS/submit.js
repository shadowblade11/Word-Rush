// submit()
function submit(totalPoints,letters,totalwords,wordAccuracy,date){
    console.log("hello");
    var boolean = document.getElementById("booleanStatement").innerText;
    if (boolean === 'False'){
        $.post("/submit",
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