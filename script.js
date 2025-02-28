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

    if (input.toLowerCase().includes("hello")) {
        responseBox.innerHTML = "Hi there! Welcome to AI Explorer.";
    } else {
        responseBox.innerHTML = "I'm analyzing your input...";
    }
}

function startListening() {
    let recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    
    recognition.onresult = function(event) {
        let speech = event.results[0][0].transcript;
        document.getElementById("userInput").value = speech;
        processInput();
    };

    recognition.start();
}

function openCamera() {
    document.getElementById("uploadImage").click();
}

function processImage() {
    let file = document.getElementById("uploadImage").files[0];
    let responseBox = document.getElementById("response");

    if (file) {
        responseBox.innerHTML = "Image uploaded! AI processing coming soon...";
    }
}