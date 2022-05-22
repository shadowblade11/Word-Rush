//Popup will display after 0.25 seconds after the page loads
window.addEventListener("load", function(){
    setTimeout(
        function open(event){
            document.querySelector(".popup").style.display = "block";
        },
        250
    )
});

//Click outside to close using jQuery
$(document).ready(function () {
    $('.popup').hide()
});

//Clicking anywhere on screen will close popup
$(document).one("click", function () {
    var popup = $(".popup");
    popup.hide(500); //Hides popup within 0.5 seconds of clicking
    document.querySelector(".container-popup").style.display = "none"; //Removes popup
    document.getElementById("audio").volume = 0.03;
});

//Same as previous function but for scorecard popup
$(document).mouseup(function () {
    var popup = $(".popup");
    popup.hide(500);
    document.querySelector(".container-popup").style.display = "none";
});




