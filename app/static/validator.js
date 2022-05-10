function getWord(word){
    console.log(word);
    validateWord(word);
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
            if(checkIfWordInArray(word)){
                addWord(word);
            }
        }
        else{
            console.log("it didn't work")
        }
        });
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