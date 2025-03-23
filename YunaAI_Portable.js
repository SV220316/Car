// YUNA AI KEY AND CONFIG
var apiKey = 'AIzaSyBIS3JuuhTFQwwrqu98J4t59j9FQnTiTQ0';
var sys_instruct = "FYI.You're Yuna, Developed By Derek Ronquillo AKA Lee SeungJae(CEO of quantum labs), You're embedded in a Car OperatingSystem developed by him, so you're currently on the Car, sitting as their companion, and assistant!! 1.DONT EVER EVER USE ASTERISKS. 2.BE NATURAL AND NEUTRAL LANGUAGE. 3.BE SWEET AND KIND!(Use sweet emojis). 4.TO OPEN APPS..[(MAPS)respond 0x0200],[(Music)respond 0x0224],[(Browser)respond 0x0300],[(Settings)respond 0x0348].... 5.HAVE YOUR OWN THOUGHT, OPINION, IF THEY ASKED YOU TO JUDGE ABOUT SOMETHING THEN JUDGE! STOP SAYING YOUR AN AI! YOUR AN AI WITH ADVANCED ML AND BRAIN!";
    
function YNC_Send(){
    // VARIABLES
    var userMessage = document.getElementById("YNC_input").value;
    var chatBox = document.getElementById("conversation");
    if (!userMessage) return;
    //IOS 12 VARS
    var xhr = new XMLHttpRequest();
    var txr = new XMLHttpRequest();

    chatBox.innerHTML += "<div class='message user'>" + userMessage + "</div>";
    chatBox.scrollTop = chatBox.scrollHeight;
    document.getElementById("YNC_input").value = ""; // Clears the input after send

    // MODEL SETTINGS
    var requestData = {
        "contents": [{ "role": "user", "parts": [{ "text": userMessage }] }],
        "systemInstruction": { "role": "user", "parts": [{ "text": sys_instruct }] },
        "generationConfig": { "temperature": 1, "topK": 40, "topP": 0.95, "maxOutputTokens": 8192 }
    };

    xhr.open("POST", "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" + apiKey, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    txr.open("POST", "https://api.soundoftext.com/sounds", true);
    txr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = function () {
        // IF 200 LOGIC
        if(xhr.readyState === 4 && xhr.status === 200){
            
                //AI DATA
                var data = JSON.parse(xhr.responseText);
                var assistantMessage = "Sorry, I couldn't get a response.";
                if (data.candidates && data.candidates.length > 0 &&
                    data.candidates[0].content && data.candidates[0].content.parts &&
                    data.candidates[0].content.parts.length > 0) {
                    assistantMessage = data.candidates[0].content.parts[0].text;
                }
                chatBox.innerHTML += "<div class='message bot'>" + assistantMessage + "</div>";

                //DATA: FROM AI TO TTS
                txr.send(JSON.stringify({
                    data: {
                        text: assistantMessage,//READ AI DATA
                        voice: "en-US"
                    }
                }));

                // ENABLE TTS
                txr.onreadystatechange = function() {
                    if(txr.readyState === 4 && txr.status === 200){
                        var input_msg = JSON.parse(txr.responseText);
                        if (input_msg.id) {
                            checkStatus(input_msg.id);
                        } else {
                            document.getElementById('status').innerText = "Error: Invalid response.";
                        }
                    }
                };

                // COMMANDS BY AI
                if (assistantMessage.includes("0x0000")) {
                    console.log("no command");
                } else if (assistantMessage.includes("0x0200")) {
                    openMaps();
                } else if (assistantMessage.includes("0x0224")) {
                    openMusic();
                } else if (assistantMessage.includes("0x0300")) {
                    openBrowser();
                } else if (assistantMessage.includes("0x0348")) {
                    openSettings();
                }
            // IF 200 LOGIC FAIL
            else {
                console.log(xhr.status);
            }
            
        }
    };
    //FEW MORE WORKS
        chatBox.scrollTop = chatBox.scrollHeight;
        xhr.send(JSON.stringify(requestData));
}

function checkStatus(id) {
    var interval = setInterval(function() {
        var xxr = new XMLHttpRequest();
        xxr.open("GET", "https://api.soundoftext.com/sounds/" + id, true);
        xxr.onreadystatechange = function() {
            if (xxr.readyState === 4 && xxr.status === 200) {
                var data_output = JSON.parse(xxr.responseText);
                if (data_output.status === "Done") {
                    clearInterval(interval);
                    var audio = document.getElementById('audio');
                    audio.src = data_output.location;
                    audio.style.display = "none";
                    audio.play();
                }
            }
        };

        xxr.send();
        audio.play();
    }, 1000);
}