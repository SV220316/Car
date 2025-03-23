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
        document.getElementById("Btn").style.display = "flex";
    }
    if(ctrl == "off"){
        YNC.style.visibility = "hidden";
        YNC.style.height = "0vh";
        YNC.style.animation = "HIDE_YNC";
        YNC.style.animationDuration = "0.5s";
        document.getElementById("Btn").style.display = "none";
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
    var music_window = document.getElementById("Music_Window");
    var Browser_window = document.getElementById("Browser_Window");
    var Settings_window = document.getElementById("Settings_Window");
    if (cmd == "I_Maps") {
        window.location.href = "maps:";
    }
    
    if(cmd == "I_Music"){
        music_window.style.visibility = "visible";
        music_window.style.opacity = '1';
    }
    else if(cmd == "O_Music"){
        music_window.style.visibility = "hidden";
        music_window.style.opacity = '0';
    }

    if(cmd == "I_Browser"){
        Browser_window.style.visibility = "visible";
        Browser_window.style.opacity = '1';
        let iframe = document.getElementById("BWMS_frame");
        iframe.src = "https://www.google.com/webhp?igu=1";
    }
    else if(cmd == "O_Browser"){
        Browser_window.style.visibility = "hidden";
        Browser_window.style.opacity = '0';
        let iframe = document.getElementById("BWMS_frame");
        iframe.src = "about:blank";
    }
}

function filterLibrary(category) {
    let albums = document.querySelectorAll('.album');
    let library = document.getElementById('library');

    albums.forEach(album => {
        album.style.display = 'none'; // Hide all albums
    });

    let visibleAlbums = document.querySelectorAll('.' + category);
    visibleAlbums.forEach(album => {
        album.style.display = 'block'; // Show only the filtered albums
    });

    if (visibleAlbums.length === 0) {
        library.style.display = 'none';
    } else {
        library.style.display = 'grid';
    }
}

let images = ["ulzzang.jpg", "ulzzang2.jpg"];
let index = 0;

setInterval(() => {
    var img = document.getElementById("LW_Photos_img");
    img.src = images[index];
    index = (index + 1) % images.length; // Toggle between 0 and 1
}, 20000);