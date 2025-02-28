function toggleMode() {
    let mode = document.getElementById("mode").value;
    let voiceInput = document.getElementById("voiceInput");
    let cameraInput = document.getElementById("cameraInput");

    if (mode === "active") {
        voiceInput.style.display = "block";
        cameraInput.style.display = "block";
    } else {
        voiceInput.style.display = "none";
        cameraInput.style.display = "none";
    }
}

function processInput() {
    let input = document.getElementById("userInput").value;
    let responseBox = document.getElementById("response");

    if (!input.trim()) {
        responseBox.innerHTML = "Please enter a message.";
        return;
    }

    responseBox.innerHTML = "Processing...";

    fetch("https://explorer-ai.onrender.com/api/process", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ text: input })
    })
    .then(response => response.json())
    .then(data => {
        responseBox.innerHTML = data.reply || "No response from AI.";
    })
    .catch(error => {
        console.error("Error:", error);
        responseBox.innerHTML = "Error processing request.";
    });
}

function startListening() {
    let recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    
    recognition.onresult = function(event) {
        let speech = event.results[0][0].transcript;
        document.getElementById("userInput").value = speech;
        processInput();
    };

    recognition.onerror = function(event) {
        console.error("Voice recognition error:", event.error);
    };

    recognition.start();
}

function openCamera() {
    document.getElementById("uploadImage").click();
}

function processImage() {
    let file = document.getElementById("uploadImage").files[0];
    let responseBox = document.getElementById("response");

    if (!file) {
        responseBox.innerHTML = "Please select an image.";
        return;
    }

    let formData = new FormData();
    formData.append("image", file);

    responseBox.innerHTML = "Uploading image...";

    fetch("https://explorer-ai.onrender.com/api/upload", {
        method: "POST",
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        responseBox.innerHTML = data.reply || "Image processed, but no response from AI.";
    })
    .catch(error => {
        console.error("Error:", error);
        responseBox.innerHTML = "Error processing image.";
    });
                      }
