

let btn = document.querySelector("#btn");
let content = document.querySelector("#content");
let voice = document.querySelector("#voice");

function speak(text) {
    let text_speak = new SpeechSynthesisUtterance(text);
    text_speak.rate = 1;
    text_speak.pitch = 1;
    text_speak.volume = 1;
    text_speak.lang = "en-IN"; 
    window.speechSynthesis.speak(text_speak);
}

function wishMe() {
    let day = new Date();
    let hours = day.getHours();
    if (hours >= 0 && hours < 12) {
        speak("Good morning");
    } else if (hours >= 12 && hours < 16) {
        speak("Good afternoon");
    } else {
        speak("Good evening");
    }
}

window.addEventListener("load", () => {
    wishMe();
});

let speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = new speechRecognition();
recognition.lang = "en-IN"; 
recognition.interimResults = false;

recognition.onresult = (event) => {
    let currentIndex = event.resultIndex;
    let transcript = event.results[currentIndex][0].transcript.toLowerCase(); 
    content.innerText = transcript; 
    takeCommand(transcript); 
};

recognition.onerror = (event) => {
    console.error("Error occurred in speech recognition:", event.error); 
};

btn.addEventListener("click", () => {
    recognition.start();
    btn.style.display = "none";
    voice.style.display = "block"; 
});

function takeCommand(message) {
    btn.style.display = "flex"; 
    voice.style.display = "none";

    if (message.includes("hello") || message.includes("hey")) {
        speak("Hello! What can I help you with?");
    } else if (message.includes("what is your name")) {
        speak("My name is Shifra, your virtual assistant created by Samreen.");
    } else if (message.includes("who are you")) {
        speak("I am your virtual assistant, created by Samreen.");
    } else if (message.includes("open youtube")) {
        speak("Opening YouTube...");
        window.open("https://www.youtube.com/", "_blank");
    } else if (message.includes("what is my name")) {
        speak("Sorry, I don't know your name.");
    } else if (message.includes("open google")) {
        speak("Opening Google...");
        window.open("https://www.google.com/", "_blank");
    } else if (message.includes("open instagram")) {
        speak("Opening Instagram...");
        window.open("https://www.instagram.com/", "_blank");
    } else if (message.includes("open facebook")) {
        speak("Opening Facebook...");
        window.open("https://www.facebook.com/", "_blank");
    } else if (message.includes("open calculator")) {
        speak("opening calculater");
        window.open("calculater://")
    } else if (message.includes("open whatsapp")) {
        speak("opening whatsapp");
        window.open("whatsapp:// ")
    } else if (message.includes("time")) {
        let time = new Date().toLocaleString(undefined, { hour: "numeric", minute: "numeric", hour12: true });
        speak("The current time is " + time);
    } else if (message.includes("date")) {
        let date = new Date().toLocaleString(undefined, { day: "numeric", month: "short", year: "numeric" });
        speak("Today's date is " + date);
    } else {
        let finalText = "This is what I found on the internet regarding " + message;
        speak(finalText);
        window.open(`https://www.google.com/search?q=${message}`, "_blank");
    }
}

