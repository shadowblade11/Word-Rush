//Code below will trigger when start button is clicked using the id begin
document.getElementById("begin").addEventListener("click", function(){
    var timeleft = 3;

    //Deletes button after countdown ends
    var deleteButton = document.getElementById("begin");
    deleteButton.parentNode.removeChild(deleteButton);

    //Starts timer at 3 and ends at 'GO!'
    var downloadTimer = setInterval(function(){
    if(timeleft <= 0){
        clearInterval(downloadTimer);
        document.getElementById("countdown").innerHTML = "GO!";
    } else {
        document.getElementById("countdown").innerHTML = timeleft;
    }
    timeleft -= 1;
    }, 1000); // 1 second between each number

    //'GO!' text will disappear after 4.5 seconds
    setTimeout(removeElement, 4500);
    function removeElement(){
        if(document.getElementById("countdown").innerHTML = "GO!"){
            var rCountdown = document.getElementById("countdown");
            rCountdown.remove();
        }
    }
});