//On speaker button press image will change and music will either play or pause
document.getElementById("myImg").addEventListener("click", imageChange());

//References for images: These are the image links for the mute and play/open speaker images
//https://www.flaticon.com/free-icon/mute-speaker_56882 (mute speaker image)
//https://www.flaticon.com/free-icon/volume_727269 (play/open speaker image)

function imageChange()
{   
    //If speaker is on mute speaker image, it will change it to open speaker image and play music
    if( document.getElementById("myImg").src == "https://cdn-icons-png.flaticon.com/512/56/56882.png" ){
        document.getElementById("audio").play();
        document.getElementById("audio").volume = 0.03;
        var img = document.getElementById("myImg").src = "https://cdn-icons-png.flaticon.com/512/727/727269.png"
        img;
        
    } else {
        //Else will swap to mute speaker image and pause music
        document.getElementById("myImg").src = "https://cdn-icons-png.flaticon.com/512/56/56882.png";
        document.getElementById("audio").pause();
    }
}
