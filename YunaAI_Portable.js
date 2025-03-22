var apiKey = 'AIzaSyBIS3JuuhTFQwwrqu98J4t59j9FQnTiTQ0';
var sys_instruct = "FYI.You're Yuna, Developed By Derek Ronquillo AKA Lee SeungJae(CEO of quantum labs), You're embedded in a Car OperatingSystem developed by him, so you're currently on the Car, sitting as their companion, and assistant!! 1.DONT EVER EVER USE ASTERISKS. 2.BE NATURAL AND NEUTRAL LANGUAGE. 3.BE SWEET AND KIND!(Use sweet emojis). 4.TO OPEN APPS..[(MAPS)respond 0x0200],[(Music)respond 0x0224],[(Browser)respond 0x0300],[(Settings)respond 0x0348].. to go to home, respond 0x0000.... 5.HAVE YOUR OWN THOUGHT, OPINION, IF THEY ASKED YOU TO JUDGE ABOUT SOMETHING THEN JUDGE! STOP SAYING YOUR AN AI! YOUR AN AI WITH ADVANCED ML AND BRAIN!";

function YNC_Send() {
    var userMessage = document.getElementById("YNC_input").value;
        if (!userMessage) return;
            var chatBox = document.getElementById("conversation");
            chatBox.innerHTML += "<div class='message user'>" + userMessage + "</div>";
            chatBox.scrollTop = chatBox.scrollHeight;
            document.getElementById("YNC_input").value = "";
            
            var requestData = {
                "contents": [{ "role": "user", "parts": [{ "text": userMessage }] }],
                "systemInstruction": { "role": "user", "parts": [{ "text": sys_instruct }] },
                "generationConfig": { "temperature": 1, "topK": 40, "topP": 0.95, "maxOutputTokens": 8192 }
            };
    
            var xhr = new XMLHttpRequest();
            xhr.open("POST", "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" + apiKey, true);
            xhr.setRequestHeader("Content-Type", "application/json");
    
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        var data = JSON.parse(xhr.responseText);
                        var assistantMessage = "Sorry, I couldn't get a response.";
    
                        if (data.candidates && data.candidates.length > 0 &&
                            data.candidates[0].content && data.candidates[0].content.parts &&
                            data.candidates[0].content.parts.length > 0) {
                            assistantMessage = data.candidates[0].content.parts[0].text;
                        }
                        chatBox.innerHTML += "<div class='message bot'>" + assistantMessage + "</div>";
                        if (assistantMessage.includes("0x0000")) {
                            GoHome();
                        } else if (assistantMessage.includes("0x0200")) {
                            openMaps();
                        } else if (assistantMessage.includes("0x0224")) {
                            openMusic();
                        } else if (assistantMessage.includes("0x0300")) {
                            openBrowser();
                        } else if (assistantMessage.includes("0x0348")) {
                            openSettings();
                        }
                    } else {
                        chatBox.innerHTML += "<div class='message bot'>Error: " + xhr.status + "</div>";
                    }
                    chatBox.scrollTop = chatBox.scrollHeight;
                }
            };
    
            xhr.send(JSON.stringify(requestData));
        }