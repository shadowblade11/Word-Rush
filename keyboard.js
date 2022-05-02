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
            //method
        }
    }
}


document.addEventListener('keydown', function(event){
    let letter = event.key;
    if (letter == "Backspace"){
        press("DELETE");
        return;
    }
    if (letter == "Enter"){
        //method
        return;
    }
    if ((letter >= 'a' && letter <= 'z') || letter >= 'A' && letter <= 'Z'){
    if (letter >= 'a' && letter <= 'z'){
        letter = letter.toUpperCase();
    }
    press(letter);
}

})