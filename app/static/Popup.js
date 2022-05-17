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

$(document).mouseup(function () {
    var popup = $(".popup");
    popup.hide(500);
    document.querySelector(".container-popup").style.display = "none";
});





