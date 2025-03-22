var apiKey = 'AIzaSyBIS3JuuhTFQwwrqu98J4t59j9FQnTiTQ0';
    
function YNC_Send() {
    var userMessage = document.getElementById("YNC_input").value;
        if (!userMessage) return;
            var chatBox = document.getElementById("conversation");
            chatBox.innerHTML += "<div class='message user'>" + userMessage + "</div>";
            chatBox.scrollTop = chatBox.scrollHeight;
            document.getElementById("YNC_input").value = "";
            
            var requestData = {
                "contents": [{ "role": "user", "parts": [{ "text": userMessage }] }],
                "systemInstruction": { "role": "user", "parts": [{ "text": "You're name is Yuna" }] },
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
                    } else {
                        chatBox.innerHTML += "<div class='message bot'>Error: " + xhr.status + "</div>";
                    }
                    chatBox.scrollTop = chatBox.scrollHeight;
                }
            };
    
            xhr.send(JSON.stringify(requestData));
        }