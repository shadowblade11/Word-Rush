function getWord(word){
    console.log(word);
    // console.log(validateWord(word));
    if(validateWord(word)){
        console.log("he");
        if(checkIfWordInArray(word)){
            addWord(word);
        }
    }
}

function validateWord(word){
    const url = "https://api.dictionaryapi.dev/api/v2/entries/en/" + word;
    const http = new XMLHttpRequest();
    http.open("GET", url);
    http.send();
    var state = false;
    http.onload = function(){state = (http.status != 404)};
    console.log(state);
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