document.getElementById("begin").addEventListener("click", function(){

    setTimeout(function(){

        var date = new Date();

        const yyyy = date.getFullYear();
        let mm = date.getMonth() + 1
        let dd = date.getDay();

        var letterOne = (yyyy * mm * dd) % 26;
        var letterTwo = (yyyy + mm + dd) % 26

        const alphabet= ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

        document.getElementById("letters").innerHTML = alphabet[letterOne] + alphabet[letterTwo];
    }, 4500);
});
