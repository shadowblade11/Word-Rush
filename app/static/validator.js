var validWordsArray = [];
var invalidWordsArray = [];
var lastWord = null;
function getWord(word){
    if(lastWord == null || lastWord != word){
        lastWord = word;
        console.log(word);
        validateWord(word);
        addWord(word);
    }
}

function makeAjaxCall(word, callback) {
    const url = "https://api.dictionaryapi.dev/api/v2/entries/en/" + word;
    $.ajax(url)
        .done( 
            function() {
                // console.log("works");
                callback(true);
            }
        )
        .fail(
            function() {
                // console.log("fails");
                callback(false);
            }
        );
}

function validateWord(word) {
    makeAjaxCall( word, function(result) {
        if (result == true){
            console.log("it worked");
            if(!validWordsArray.includes(word)){
                validWordsArray.push(word);
            }
        }
        else{
            console.log("it didn't work")
            if(!invalidWordsArray.includes(word)){
                invalidWordsArray.push(word);
            }
        }
        });
}

function addWord(word){
    if(!validWordsArray.includes(word) && !invalidWordsArray.includes(word)){
    let list = document.getElementById("list");
    let item = document.createElement("li");
    item.innerHTML = word;
    list.appendChild(item);
    }
}
