var globalState;
function getWord(word){
    console.log(word);
    gWord = word;
    // console.log(validateWord(word));
    // console.log(doStuff());
    if(validateWord(word)){
        console.log("hello");
        if(checkIfWordInArray(word)){
            addWord(word);
        }
    }
}
function validateWord(word){
    // console.log(state);
    // return state;
    // doStuff(word);
    var Finalresult = false;
    console.log(doStuff(word));
    console.log("Global state is "+globalState);
    return Finalresult;
}

function makeAjaxCall(word, callback) {
    const url = "https://api.dictionaryapi.dev/api/v2/entries/en/" + word;
    $.ajax(url)
        .done( 
            function() {
                // Do stuff
                console.log("works");
                callback(true);
            }
        )
        .fail(
            function() {
                console.log("fails");
                callback(false);
            }
        );
}
function doStuff(word) {
var a = makeAjaxCall( word, function(result) {
    // return result;
    if (result == true){
        console.log("it worked");
        globalState = true;
        return true;
    }
    else{
        console.log("it didn't work")
        globalState = false;
        return false;
    }
    });
    return a;
}

function checkIfWordInArray(word){
    return true;
}

function addWord(word){
    let list = document.getElementById("list");
    let item = document.createElement("li");
    item.innerHTML = word;
    list.appendChild(item);
}