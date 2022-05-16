var letterArray;
function getLetters(){
    var letters = document.getElementById("letters");
    console.log(letters.innerText);
    letterArray=letters.innerText.split("");
    console.log(letterArray);
}

function totalPoints(){
    getLetters();
    var points = 0;
    var basePoints;
    var additional;
    var multiplier;
    for (var wordIndex = 0; wordIndex < validWordsArray.length;wordIndex++){
        var word = validWordsArray[wordIndex];
        basePoints = 0;
        additional = 0;
        multiplier = 1;
        if(word.includes(letterArray[0]) || word.includes(letterArray[1])){ //if true, then the word contains AT LEAST 1 letter, which means they get points
            basePoints = (validWordsArray[wordIndex].length)*10; //base points, for x length word, they get x*10 points
            var wordArray = word.split("");
            for (var i = 0; i < letterArray.length; i++){
                for (var j = 0; j < wordArray.length;j++){
                    if(letterArray[i] == wordArray[j]){ //for each letter, they get 5pt
                        additional+=5;
                    }
                }
            }
            for (var i = 1; i < wordArray.length;i++){
                if((wordArray[i-1] == letterArray[0]) &&(wordArray[i]==letterArray[1])){
                    multiplier=multiplier*2;
                }
            }
        }
        points += (basePoints+additional)*multiplier;
        // console.log("basePoints = ", basePoints);
        // console.log("additional = ", additional);
        // console.log("multiplier = ", multiplier);
        // console.log(word, "is equal to ", (basePoints+additional)*multiplier);
        // console.log("total points = ",points);
        return points;
    }
}