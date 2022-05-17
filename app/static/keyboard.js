const keyboardKeys = [['Q','W','E','R','T','Y','U','I','O','P'],['A','S','D','F','G','H','J','K','L'],['DELETE','Z','X','C','V','B','N','M','ENTER']];
function initKeyboard(){
    let mainDiv = document.getElementById("main");
    for (let row = 0; row < keyboardKeys.length;row++){
        let rowOfKeys = document.createElement("div");
        rowOfKeys.className = "keyboard-keys";
        let arrayofKeys = keyboardKeys[row];
        for (let keyIndex = 0; keyIndex < arrayofKeys.length;keyIndex++){
            let button = document.createElement("button");
            button.onclick = function (){press(this.innerHTML)};
            if (arrayofKeys[keyIndex] == "DELETE" || arrayofKeys[keyIndex] == "ENTER"){
                button.className = "key key-wide";
            }
            else{
                button.className = "key";
            }
            button.innerHTML = arrayofKeys[keyIndex];
            rowOfKeys.appendChild(button);
        }
        mainDiv.appendChild(rowOfKeys);
    }
}

function press(letter){
    const text = document.getElementById("textBox");
    if (letter != "DELETE" && letter != "ENTER"){
        text.innerHTML += letter;
    }
    else{
        if (letter == "DELETE"){
            text.innerHTML = text.innerHTML.slice(0,-1);
        }
        if(letter == "ENTER"){
            if(text.innerHTML != ""){
                getWord(text.innerHTML);
                text.innerText = "";
            }
        }
    }
}
function activateKeyboard(){
    document.addEventListener('keydown', function(event){
        let letter = event.key;
        if (letter == "Backspace"){
            press("DELETE");
            return;
        }
        if (letter == "Enter"){
            press("ENTER");
            return;
        }
        if ((letter.length == 1) && ((letter >= 'a' && letter <= 'z') || (letter >= 'a' && letter <= 'z'))){
            if (letter == " "){
                return;
            }
            if (letter >= 'a' && letter <= 'z'){
                letter = letter.toUpperCase();
            }
            press(letter);
    }
    })
}


// function deactivateKeyboard(){
//     document.removeEventListener('keydown', function(event){
//         let letter = event.key;
//         if (letter == "Backspace"){
//             press("DELETE");
//             return;
//         }
//         if (letter == "Enter"){
//             press("ENTER");
//             return;
//         }
//         if ((letter.length == 1) && ((letter >= 'a' && letter <= 'z') || (letter >= 'a' && letter <= 'z'))){
//             if (letter == " "){
//                 return;
//             }
//             if (letter >= 'a' && letter <= 'z'){
//                 letter = letter.toUpperCase();
//             }
//             press(letter);
//     }
//     })
// }