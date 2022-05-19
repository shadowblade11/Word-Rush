// submit()
function submit(totalPoints,letters,totalwords,wordAccuracy,date){
    console.log("hello");
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