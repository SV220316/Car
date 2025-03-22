function Yuna_Show(){
    var YNC = document.getElementById("YNC");
    YNC.style.visibility = "visible";
    YNC.style.height = "30vh";
    YNC.style.animation = "SHOW_YNC";
    YNC.style.animationDuration = "1s";
}
function Yuna_Hide(){
    var YNC = document.getElementById("YNC");
    YNC.style.visibility = "hidden";
    YNC.style.height = "0vh";
    YNC.style.animation = "HIDE_YNC";
    YNC.style.animationDuration = "0.5s";
}