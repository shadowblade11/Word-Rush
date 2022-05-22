//global array for the letters
var letterArray;

//gets the letters 
function getLetters(){
    var letters = document.getElementById("letters");
    letterArray=letters.innerText.split("");
}

/**
 * iterates through the valid word array, and calculate the points
 * of each word and adds it up
 * @returns the total number of points
 */
function totalPoints(){
    getLetters();
    //declare variables
    var points = 0;
    var basePoints;
    var additional;
    var multiplier;
    //iterates through the array
    for (var wordIndex = 0; wordIndex < validWordsArray.length;wordIndex++){
        var word = validWordsArray[wordIndex];
        //initialize the variables
        basePoints = 0;
        additional = 0;
        multiplier = 1;
        if(word.includes(letterArray[0]) || word.includes(letterArray[1])){ //if true, then the word contains AT LEAST 1 letter, which means they get points
            basePoints = (validWordsArray[wordIndex].length)*10; //base points, for x length word, they get x*10 points
            var wordArray = word.split("");
            for (var i = 0; i < letterArray.length; i++){
                for (var j = 0; j < wordArray.length;j++){
                    if(letterArray[i] == wordArray[j]){ //for each letter matching, they get 5pt
                        additional+=5;
                    }
                }
            }
            //iterates through the word, checking the first 2 value if they're the same as letters
            for (var i = 1; i < wordArray.length;i++){
                if((wordArray[i-1] == letterArray[0]) &&(wordArray[i]==letterArray[1])){
                    multiplier=multiplier*2;
                }
            }
        }
        //points are added to get a total
        points += (basePoints+additional)*multiplier;
        
    }
    return points;
}
/**
 * when this function is called, it copies the text to the user's
 * clipboard
 */
function share(){
    var mode = document.getElementById("mode");
    navigator.clipboard.writeText(
       'Word Rush' + '\n'+
        mode.innerText+
        `
    ${letters}
    ${finalScore}pts
    ${wordAccuracy}%
    ${date}
        `
    );
}