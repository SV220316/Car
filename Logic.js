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
function updateTime() {
    let now = new Date();

    // Format time as 12-hour format (hh:mm AM/PM)
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12; // Convert 0 to 12
    minutes = minutes < 10 ? '0' + minutes : minutes;
    document.getElementById('time').textContent = `${hours}:${minutes}`;

    // Format date as "Monday, June 5"
    let options = { weekday: 'long', month: 'long', day: 'numeric' };
    let formattedDate = now.toLocaleDateString('en-US', options);
    document.getElementById('date').textContent = formattedDate;
}

updateTime();
setInterval(updateTime, 1000);

function GoHome(){
    console.log("Going Home");

}
function openMaps(){
    console.log("loading Maps");
    window.location.href = "maps://";
}
function openMusic(){
    console.log("loading Music");

}
function openBrowser(){
    console.log("loading Browser");

}
function openSettings(){
    console.log("loading Settings");

}
function LOGIC_ON() {
    let element = document.getElementById("BSI");
    element.style.display = "flex";
    element.style.opacity = "1";
    element.style.transition = "opacity 1s ease-out";

    setTimeout(() => {
        element.style.opacity = "0";

        setTimeout(() => {
            element.style.display = "none";
            console.log("Booted Succesfully");
            animateHome();
        }, 1000);
    }, 5000);
}

function animateHome(){
    var dock = document.getElementById("app_dock");
    dock.style.animation = "show_dock";
    dock.style.animationDuration = "1.5s"
    dock.style.bottom = "0.75vh";

    var ACB = document.getElementById("Activation_bar");
    ACB.style.animation = "show_ACB";
    ACB.style.animationDuration = "1.5s"
    ACB.style.top = "0vh";

    var LC = document.getElementById("LC");
    LC.style.marginLeft = "0vh";
    LC.style.animation = "show_LC";
    LC.style.animationDuration = "1.5s"
}