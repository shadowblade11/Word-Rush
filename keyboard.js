function press(letter){
    const text = document.getElementById("textBox");
    if (letter.innerHTML != "DELETE" && letter.innerHTML != "ENTER"){
        text.innerHTML += letter.innerHTML;
    }
    else{
        if (letter.innerHTML == "DELETE"){
            text.innerHTML = text.innerHTML.slice(0,-1);
        }
    }
}