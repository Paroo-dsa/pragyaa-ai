// ======================================
// PRAGYA AI ASSISTANT
// APP.JS - PART 1
// ======================================


// ----------------------------
// DOM ELEMENTS
// ----------------------------

const input = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");
// const micBtn = document.getElementById("micBtn");

const bubble = document.getElementById("aiBubble");
const dots = document.getElementById("typingDots");
const status = document.getElementById("status");

const aiRing = document.getElementById("aiRing");

const greeting = document.getElementById("greeting");
const username = document.getElementById("username");

const time = document.getElementById("time");
const date = document.getElementById("date");


// ----------------------------
// USER NAME
// ----------------------------

let userName = localStorage.getItem("pragyaUser");

if (!userName) {

    userName = prompt("Enter Your Name");

    if (!userName) {

        userName = "Guest";

    }

    localStorage.setItem("pragyaUser", userName);

}

username.innerHTML = userName;

//weather
// ==============================
// WEATHER API
// ==============================

async function getWeather() {

    const city = "Ghaziabad"; // Apna city

    //const API_KEY = "01940be18e9a03f96c9c0ddb857cae51";
const url = `https://api.openweathermap.org/data/2.5/weather?q=Ghaziabad&appid=${WEATHER_API_KEY}&units=metric`;
   // const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

    try {

        const response = await fetch(url);

        const data = await response.json();

        document.getElementById("temperature").innerHTML =
            `${Math.round(data.main.temp)}°C`;

        document.getElementById("weatherText").innerHTML =
            data.weather[0].description;

    }

    catch (error) {

        document.getElementById("weatherText").innerHTML = "Weather Error";

        console.log(error);

    }

}

// Function Call
getWeather();

// ----------------------------
// GREETING
// ----------------------------

function updateGreeting() {

    let hour = new Date().getHours();

    if (hour < 12) {

        greeting.innerHTML = `🌅 Good Morning, ${userName}`;

    }

    else if (hour < 17) {

        greeting.innerHTML = `☀️ Good Afternoon, ${userName}`;

    }

    else if (hour < 21) {

        greeting.innerHTML = `🌇 Good Evening, ${userName}`;

    }

    else {

        greeting.innerHTML = `🌙 Good Night, ${userName}`;

    }

}

updateGreeting();


// ----------------------------
// CLOCK
// ----------------------------

function updateClock() {

    const now = new Date();

    time.innerHTML = now.toLocaleTimeString("en-IN");

}

updateClock();

setInterval(updateClock,1000);


// ----------------------------
// DATE
// ----------------------------

function updateDate(){

    const today = new Date();

    date.innerHTML = today.toLocaleDateString("en-IN",{

        weekday:"long",

        day:"numeric",

        month:"long",

        year:"numeric"

    });

}

updateDate();


// ----------------------------
// DEFAULT STATUS
// ----------------------------

status.innerHTML="🟢 Ready";

bubble.innerHTML="Hello 👋 I'm Pragya. Ask me anything.";
// ======================================
// APP.JS - PART 2
// GEMINI API
// ======================================
//const API_KEY = "AQ.Ab8RN6JnILA3XcryFWfYc3KHXUbUEcLRT3LoLna0uIrhedqtfA";

// ----------------------------
// API FUNCTION
// ----------------------------

async function askGemini(question) {

    const url =
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`;

    const response = await fetch(url, {

        method: "POST",

        headers: {

            "Content-Type": "application/json"

        },

        body: JSON.stringify({

            contents: [

                {

                    parts: [

                        {

                            text: question

                        }

                    ]

                }

            ]

        })

    });


    if (!response.ok) {

        throw new Error("API Request Failed");

    }

    const data = await response.json();

    if (
        !data.candidates ||
        !data.candidates.length ||
        !data.candidates[0].content ||
        !data.candidates[0].content.parts ||
        !data.candidates[0].content.parts.length
    ) {

        throw new Error("No reply received from Gemini.");

    }

    return data.candidates[0].content.parts[0].text;

}
// ======================================
// APP.JS - PART 3
// VOICE + UI EFFECTS
// ======================================





// ==========================
// VOICE RECOGNITION
// ==========================

// const SpeechRecognition =
// window.SpeechRecognition ||
// window.webkitSpeechRecognition;

// const recognition = new SpeechRecognition();

// recognition.lang = "en-IN";

// recognition.continuous = false;

// recognition.interimResults = false;


// const micBtn = document.getElementById("micBtn");

// micBtn.addEventListener("click", () => {

//     recognition.start();

//     status.innerHTML = "🎤 Listening...";

// });

// recognition.onresult = async (event) => {

//     let message = event.results[0][0].transcript;

//     input.value = message;

//     sendMessage();

// };
// recognition.onend = () => {

//     status.innerHTML = "🟢 Ready";

// };
// recognition.onerror = (event) => {

//     console.log(event.error);

//     status.innerHTML = "❌ Mic Error";

// };

// recognition.onresult = (event) => {

//     let transcript = "";

//     for (let i = event.resultIndex; i < event.results.length; i++) {

//         transcript += event.results[i][0].transcript;

//     }

//     input.value = transcript;

// };

// recognition.onend = () => {

//     status.innerHTML = "🟢 Ready";

//     if (input.value.trim() !== "") {

//         sendMessage();

//     }

// };


// const SpeechRecognition =
// window.SpeechRecognition || window.webkitSpeechRecognition;

// const recognition = new SpeechRecognition();

// recognition.lang = "en-IN";
// recognition.continuous = false;
// recognition.interimResults = false;

// const micBtn = document.getElementById("micBtn");

// micBtn.addEventListener("click", () => {
//     recognition.start();
//     status.innerHTML = "🎤 Listening...";
// });

// recognition.onresult = (event) => {

//     let transcript = "";

//     for (let i = event.resultIndex; i < event.results.length; i++) {
//         transcript += event.results[i][0].transcript;
//     }

//     // 👉 TEXTBOX ME SHOW KARNA (IMPORTANT)
//     input.value = transcript;

//     status.innerHTML = "🟢 Processing...";

//     // 👉 DIRECT AI CALL
//     sendMessage();
// };

// recognition.onerror = (event) => {
//     console.log(event.error);
//     status.innerHTML = "❌ Mic Error";
// };

// recognition.onend = () => {
//     status.innerHTML = "🟢 Ready";
// input.value = transcript;

// setTimeout(() => {
//     sendMessage();
// }, 500);


// };

const SpeechRecognition =
window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();

recognition.lang = "en-IN";
recognition.continuous = false;
recognition.interimResults = false;

const micBtn = document.getElementById("micBtn");

micBtn.addEventListener("click", () => {
    recognition.start();
    status.innerHTML = "🎤 Listening...";
});

recognition.onresult = (event) => {

    const transcript = event.results[0][0].transcript;

    console.log("Heard:", transcript);

    // ✅ TEXTBOX UPDATE (DIRECT + SAFE)
    input.value = transcript;

    status.innerHTML = "🟢 Ready";

    // optional delay for better UX
    setTimeout(() => {
        sendMessage();
    }, 1000);
};

recognition.onerror = (event) => {
    console.log("Mic error:", event.error);
    status.innerHTML = "❌ Mic Error";
};

recognition.onend = () => {
    status.innerHTML = "🟢 Ready";
};

// const SpeechRecognition =
// window.SpeechRecognition || window.webkitSpeechRecognition;

// const recognition = new SpeechRecognition();

// recognition.lang = "en-IN";
// recognition.continuous = false;
// recognition.interimResults = false;

// const micBtn = document.getElementById("micBtn");

// micBtn.addEventListener("click", () => {
//     recognition.start();
//     status.innerHTML = "🎤 Listening...";
// });

// recognition.onresult = (event) => {

//     let transcript = event.results[0][0].transcript;

//     console.log("Heard:", transcript);

//     // ✅ TEXTBOX ME SHOW
//     input.value = transcript;

//     // optional UX delay
//     setTimeout(() => {
//         sendMessage();
//     }, 300);
// };

// recognition.onerror = (event) => {
//     console.log("Mic error:", event.error);
//     status.innerHTML = "❌ Mic Error: " + event.error;
// };

// recognition.onend = () => {
//     status.innerHTML = "🟢 Ready";
// };
//const input = document.getElementById("messageBox");

// ----------------------------
// TYPEWRITER EFFECT
// ----------------------------

function typeWriter(text) {

    bubble.innerHTML = "";

    let i = 0;

    const typing = setInterval(() => {

        bubble.innerHTML += text.charAt(i);

        i++;

        if (i >= text.length) {

            clearInterval(typing);

        }

    }, 20);

}


// ----------------------------
// SPEAK FUNCTION
// ----------------------------
function speak(text) {

    speechSynthesis.cancel();

    let speech = new SpeechSynthesisUtterance(text);

    speech.lang = "hi-IN";

    speech.rate = 0.9;

    speech.pitch = 1;

    speech.volume = 1;

    let voices = speechSynthesis.getVoices();

    let femaleVoice = voices.find(voice =>
        voice.lang === "hi-IN"
    );

    if (femaleVoice) {
        speech.voice = femaleVoice;
    }

    speech.onstart = () => {

        aiRing.classList.add("speaking");

        status.innerHTML = "🗣 Pragya is Speaking...";

    };

    speech.onend = () => {

        aiRing.classList.remove("speaking");

        status.innerHTML = "🟢 Ready";

    };

    speechSynthesis.speak(speech);

}
// function speak(text) {

//     window.speechSynthesis.cancel();

//     const speech = new SpeechSynthesisUtterance(text);

//     speech.lang = "en-US";

//     speech.rate = 1;

//     speech.pitch = 1.2;

//     speech.volume = 1;


//     // Try to select a female voice if available
//     const voices = speechSynthesis.getVoices();

//     const femaleVoice = voices.find(voice =>
//         voice.lang.startsWith("en") &&
//         /(female|zira|aria|samantha|google us english)/i.test(voice.name)
//     );

//     if (femaleVoice) {
//         speech.voice = femaleVoice;
//     }


//     // Speaking Started
//     speech.onstart = () => {

//         aiRing.classList.add("speaking");

//         status.innerHTML = "🗣 Speaking...";

//     };


//     // Speaking Finished
//     speech.onend = () => {

//         aiRing.classList.remove("speaking");

//         status.innerHTML = "🟢 Ready";

//     };


//     window.speechSynthesis.speak(speech);

// }


// ----------------------------
// SHOW THINKING
// ----------------------------

function showThinking() {

    dots.style.display = "flex";

    status.innerHTML = "🤔 Thinking...";

}


// ----------------------------
// HIDE THINKING
// ----------------------------

function hideThinking() {

    dots.style.display = "none";

}
// ======================================
// APP.JS - PART 4
// SEND MESSAGE


function getCustomReply(message) {

    const msg = message.toLowerCase();

    if (msg.includes("tumhe kisne banaya") ||
        msg.includes("who made you") ||
        msg.includes("creator")) {
        return "Mujhe Saurabh Goud ne banaya hai 🤖";
    }

    if (msg.includes("hello") || msg.includes("hi")) {
        return "Hello 👋 Main Pragya AI hoon!";
    }

    return null; // ❗ means AI will handle
}

async function sendMessage() {

    const message = input.value.trim();
    if (message === "") return;

    input.value = "";
    bubble.innerHTML = "";

    showThinking();

    // 🔥 STEP 1: check custom brain FIRST
    const customReply = getCustomReply(message);

    if (customReply) {

        hideThinking();
        typeWriter(customReply);
        speak(customReply);
        return; // ❗ AI STOP HERE

    }

    // 🔥 STEP 2: ONLY IF NO MATCH → AI CALL
    try {

        const reply = await askGemini(message);

        hideThinking();
        typeWriter(reply);
        speak(reply);

    } catch (error) {

        hideThinking();
        bubble.innerHTML = "❌ Error";
        console.error(error);
    }
}


// ======================================
async function getAIResponse(message) {
    return await askGemini(message);
}
async function sendMessage() {

    const message = input.value.trim();

    if (message === "") return;

    input.value = "";

    bubble.innerHTML = "";

    showThinking();

    try {

        const reply = await askGemini(message);

        hideThinking();

        typeWriter(reply);

        speak(reply);

    }

    catch (error) {

        hideThinking();

        bubble.innerHTML = "❌ Something went wrong.";

        status.innerHTML = "❌ Error";

        console.error(error);

    }

}



// ==============================
// SEND BUTTON
// ==============================

sendBtn.addEventListener("click", sendMessage);


// ==============================
// ENTER KEY
// ==============================

input.addEventListener("keydown", function (e) {

    if (e.key === "Enter") {

        sendMessage();

    }

});


// ==============================
// SUGGESTION BUTTONS
// ==============================

document.querySelectorAll(".suggestions button")

.forEach(button => {

    button.addEventListener("click", () => {

        input.value = button.innerText;

        sendMessage();

    });

});