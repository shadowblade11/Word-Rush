//const array that holds the letters and it's specified position and row
const keyboardKeys = [['Q','W','E','R','T','Y','U','I','O','P'],['A','S','D','F','G','H','J','K','L'],['DELETE','Z','X','C','V','B','N','M','ENTER']];

//when the window loads, the keyboard is created
window.addEventListener("load", function(){
    initKeyboard();
});

//function that creates the keyboard on the page
function initKeyboard(){
    let mainDiv = document.getElementById("main");
    //iterates through the 3 rows
    for (let row = 0; row < keyboardKeys.length;row++){
        let rowOfKeys = document.createElement("div");
        rowOfKeys.className = "keyboard-keys";
        let arrayofKeys = keyboardKeys[row];
        //iterates through each value in the row
        for (let keyIndex = 0; keyIndex < arrayofKeys.length;keyIndex++){
            let button = document.createElement("button");
            //adds an onclick to each button
            button.onclick = function (){press(this.innerHTML)};
            //this checks if the button is ENTER or DELETE, if so. it becomes wider
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

/**
 * takes the letter and either adds it to the textbox,
 * remove a character from the textbox or clear the textbox
 * @param letter - the key that was pressed
 */
function press(letter){
    //gets the textbox
    const text = document.getElementById("textBox");
    //if the key pressed isn't DELETE or ENTER, then it is added onto the textbox
    if (letter != "DELETE" && letter != "ENTER"){
        text.innerHTML += letter;
    }
    else{
        //if the key is DELETE, then the last character is removed
        if (letter == "DELETE"){
            text.innerHTML = text.innerHTML.slice(0,-1);
        }
        //if the key is ENTER, the textbox is cleared, and the content is validated
        if(letter == "ENTER"){
            if(text.innerHTML != ""){
                getWord(text.innerHTML);
                text.innerText = "";
            }
        }
    }
}

/**
 * this will activate the keyboard, ensuring users don't type before the letters appear
 */
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
