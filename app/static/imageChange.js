document.getElementById("myImg").addEventListener("click", imageChange());

function imageChange()
{
    if( document.getElementById("myImg").src == "https://w7.pngwing.com/pngs/131/14/png-transparent-audio-mute-sound-speaker-volume-basic-web-elements-icon.png" ){
        document.getElementById("audio").play();
        document.getElementById("audio").volume = 0.03;
        var img = document.getElementById("myImg").src = "https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Speaker_Icon.svg/750px-Speaker_Icon.svg.png"
        img.style.height = '100';
        img.style.width = '100';
        img;
        
    } else {
        document.getElementById("myImg").src = "https://w7.pngwing.com/pngs/131/14/png-transparent-audio-mute-sound-speaker-volume-basic-web-elements-icon.png";
        document.getElementById("audio").pause();
    }
}
