document.getElementById("begin").addEventListener("click", function(){

    setTimeout(function(){
        var letterOne;
        var letterTwo;
        var boolean = document.getElementById("booleanStatement").innerText;
        if (boolean === 'True'){
            letterOne = Math.floor(Math.random() * (26 - 1 + 1) + 1)%26;
            letterTwo = Math.floor(Math.random() * (26 - 1 + 1) + 1)%26;  
        }
        else{
            var date = new Date();
            const yyyy = date.getFullYear();
            let mm = date.getMonth() + 1
            let dd = date.getDay();
    
            letterOne = (yyyy * mm * dd) % 26;
            letterTwo = (yyyy + mm + dd) % 26;
        }
        const alphabet= ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

        document.getElementById("letters").innerHTML = alphabet[letterOne] + alphabet[letterTwo];
    }, 4500);
});
