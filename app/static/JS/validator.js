// global array for valid words
var validWordsArray = [];
// global array for invalid words
var invalidWordsArray = [];
//variable that holds the last word typed
var lastWord = null;
/**
 * function that is called everytime the ENTER key is pressed
 * @param word - the word that the user has typed 
 */
function getWord(word){
    //checks if see if the lastword typed is the same or not (this stops them from taking advantage of the 1 second gap between the POST request)
    if(lastWord == null || lastWord != word){
        lastWord = word;
        validateWord(word);
        addWord(word);
    }
}

/**
 * Using the dictionary API, the function checks the status
 * of the request. if the status is valid, then that means
 * the word is valid, otherwise it is invalid
 * @param word -  the word that the user has typed 
 * @param callback - callback function
 */
function makeAjaxCall(word, callback) {
    //URL that'll check the word
    const url = "https://api.dictionaryapi.dev/api/v2/entries/en/" + word;
    $.ajax(url)
        .done( 
            function() {
                //returns true to the callback function
                callback(true);
            }
        )
        .fail(
            function() {
                //returns false to the callback function
                callback(false);
            }
        );
}

/**
 * function that checks the words and adds it to it's
 * specified array
 * @param word - the word that the user has typed
 */
function validateWord(word) {
    makeAjaxCall( word, function(result) {
        if (result == true){
            //adds the word to the validWords array
            if(!validWordsArray.includes(word)){
                validWordsArray.push(word);
            }
        }
        else{
            console.log("it didn't work")
            //adds the word to the invalidWords array
            if(!invalidWordsArray.includes(word)){
                invalidWordsArray.push(word);
            }
        }
        });
}

/**
 * adds the word that was typed to the list,
 * so that it appears on screen
 *  @param word - the word that the user has typed
 */
function addWord(word){
    if(!validWordsArray.includes(word) && !invalidWordsArray.includes(word)){
    let list = document.getElementById("list");
    let item = document.createElement("li");
    item.innerHTML = word;
    list.appendChild(item);
    }
}
