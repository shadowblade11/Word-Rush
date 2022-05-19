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

$(document).one("click", function () {
    var popup = $(".popup");
    popup.hide(500);
    document.querySelector(".container-popup").style.display = "none";
    document.getElementById("audio").play();
    document.getElementById("audio").volume = 0.03;
});





