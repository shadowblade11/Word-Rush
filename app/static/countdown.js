document.getElementById("begin").addEventListener("click", function(){
    var timeleft = 3;

    var deleteButton = document.getElementById("begin");
    deleteButton.parentNode.removeChild(deleteButton);
    
    var downloadTimer = setInterval(function(){
    if(timeleft <= 0){
        clearInterval(downloadTimer);
        document.getElementById("countdown").innerHTML = "GO!";
    } else {
        document.getElementById("countdown").innerHTML = timeleft;
    }
    timeleft -= 1;
    }, 1000);

    setTimeout(removeElement, 4500);
    function removeElement(){
        if(document.getElementById("countdown").innerHTML = "GO!"){
            var rCountdown = document.getElementById("countdown");
            rCountdown.remove();
        }
    }
});