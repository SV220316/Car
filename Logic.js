function Core(){
    // DATE AND TIME
    setInterval(() => {
    let now = new Date();  
        
        let hours = now.getHours();
        let minutes = now.getMinutes();

        let ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12 || 12;
        minutes = minutes < 10 ? '0' + minutes : minutes;

        document.getElementById('time').textContent = `${hours}:${minutes}`;    
        let options = { weekday: 'long', month: 'long', day: 'numeric' };
        let formattedDate = now.toLocaleDateString('en-US', options);
        document.getElementById('date').textContent = formattedDate;
    }, 1000);

    //BOOT PROCESS
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

function Yuna_CTRL(ctrl){
    var YNC = document.getElementById("YNC");
    if(ctrl == "on"){
        YNC.style.visibility = "visible";
        YNC.style.height = "30vh";
        YNC.style.animation = "SHOW_YNC";
        YNC.style.animationDuration = "1s";
    }
    if(ctrl == "off"){
        YNC.style.visibility = "hidden";
        YNC.style.height = "0vh";
        YNC.style.animation = "HIDE_YNC";
        YNC.style.animationDuration = "0.5s";
    }
}

function animateHome(){
    var dock = document.getElementById("app_dock");
    var ACB = document.getElementById("Activation_bar");
    var LC = document.getElementById("LC");
    dock.style.animation = "show_dock";
    dock.style.animationDuration = "1.5s"
    dock.style.bottom = "0.75vh";

    ACB.style.animation = "show_ACB";
    ACB.style.animationDuration = "1.5s"
    ACB.style.top = "0vh";
    
    LC.style.marginLeft = "0vh";
    LC.style.animation = "show_LC";
    LC.style.animationDuration = "1.5s"
}

function App_Control(cmd){
    if (cmd == "I_Maps") {
        window.location.href = "maps:";
    }
    
    if(cmd == "I_Music"){
    }
    else if(cmd == "O_Music"){
    }

    if(cmd == "I_Browser"){
    }
    else if(cmd == "O_Browser"){
    }
}

function closeWindow(winID){
    let win = document.getElementById(winID);
    if (win){
        win.style.visibility = "hidden";
        win.style.opacity = '0';
    };
}
function openWindow(winID){
    let win = document.getElementById(winID);
    if (win){
        win.style.visibility = "visible";
        win.style.opacity = '1';
    };
}



