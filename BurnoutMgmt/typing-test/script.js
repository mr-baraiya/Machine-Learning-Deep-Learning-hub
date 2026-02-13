const paragraphs = [
    "The concept of artificial intelligence has been around for centuries, but it wasn't until the 1950s that the field was formally founded. Early AI research focused on symbolic methods and problem-solving, with high hopes for creating machines that could think like humans. Over the decades, AI has experienced several 'winters' of reduced funding and interest, followed by resurgences driven by new techniques and increased computing power.",
    "Climate change is one of the most pressing issues facing our planet today. Rising global temperatures are leading to more frequent and severe weather events, melting ice caps, and rising sea levels. Scientists agree that human activities, particularly the burning of fossil fuels and deforestation, are the primary drivers of this warming trend. Urgent action is needed to reduce greenhouse gas emissions and transition to renewable energy sources.",
    "The Great Barrier Reef is the world's largest coral reef system, composed of over 2,900 individual reefs and 900 islands stretching for over 2,300 kilometers. It is located in the Coral Sea, off the coast of Queensland, Australia. The reef is home to an incredible diversity of marine life, including thousands of species of fish, mollusks, and corals. However, it faces significant threats from climate change, pollution, and overfishing.",
    "Reading is a complex cognitive process of decoding symbols in order to derive meaning. It is a means of language acquisition, communication, and sharing information and ideas. Like all language, it is a complex interaction between the text and the reader which is shaped by the reader's prior knowledge, experiences, attitude, and language community which is culturally and socially situated.",
    "Coffee is a brewed drink prepared from roasted coffee beans, the seeds of berries from certain Coffea species. When coffee berries turn from green to bright red in color – indicating ripeness – they are picked, processed, and dried. Dried coffee seeds (referred to as beans) are roasted to varying degrees, depending on the desired flavor using various methods.",
    "Photography is the art, application, and practice of creating durable images by recording light, either chemically by means of a light-sensitive material such as photographic film, or electronically by means of an image sensor. It is employed in many fields of science, manufacturing (e.g., photolithography), and business, as well as its more direct uses for art, film and video production, recreational purposes, hobby, and mass communication.",
    "The history of the internet begins with the development of electronic computers in the 1950s. Initial concepts of wide area networking originated in several computer science laboratories in the United States, United Kingdom, and France. The US Department of Defense awarded contracts as early as the 1960s for packet network systems, including the development of the ARPANET. The first message was sent over the ARPANET in 1969.",
    "Yoga is a group of physical, mental, and spiritual practices or disciplines which originated in ancient India. Yoga is one of the six ÃAstika (orthodox) schools of Hindu philosophical traditions. There is a broad variety of yoga schools, practices, and goals in Hinduism, Buddhism, and Jainism. The term 'yoga' in the Western world often denotes a modern form of Hatha yoga and yoga as exercise, consisting largely of the postures called asanas.",
    "Music is an art form, and cultural activity, whose medium is sound. General definitions of music include common elements such as pitch (which governs melody and harmony), rhythm (and its associated concepts tempo, meter, and articulation), dynamics (loudness and softness), and the sonic qualities of timbre and texture (which are sometimes termed the 'color' of a musical sound). Different styles or types of music may emphasize, de-emphasize or omit some of these elements.",
    "Space exploration is the use of astronomy and space technology to explore outer space. While the exploration of space is carried out mainly by astronomers with telescopes, its physical exploration though is conducted both by unmanned robotic space probes and human spaceflight. Space exploration, like its classical form astronomy, is one of the main sources for space science."
];

// Game State
let startTime;
let timerInterval;
let keyTimes = [];
let backspaces = 0;
let pauseCount = 0;
let lastKeyTime = 0;
let combo = 0;
let maxCombo = 0;
let totalTime = 60; // 60 seconds fixed

// DOM Elements
const mottoModal = document.getElementById('motto-modal');
const homeScreen = document.getElementById('home-screen');
const gameScreen = document.getElementById('game-screen');
const resultsScreen = document.getElementById('results-screen');
const input = document.getElementById("input");

// --- INITIALIZATION ---
function init() {
    loadStats();
}

function loadStats() {
    const xp = parseInt(localStorage.getItem('focus_xp') || '0');
    const level = Math.floor(xp / 1000) + 1;
    const streak = localStorage.getItem('focus_streak') || 0;
    const bestWpm = localStorage.getItem('focus_best_wpm') || 0;

    document.getElementById('user-xp').innerText = xp;
    document.getElementById('user-level').innerText = level;
    document.getElementById('daily-streak').innerText = streak + " 🔥";
    document.getElementById('best-wpm').innerText = bestWpm;
}

// --- GAME LOOP ---

window.startGame = function () {
    // Show instruction popup first
    showCustomAlert("MISSION START", "You have 1 minute to type the paragraph above with high accuracy.\n\nGood luck, Operator.", () => {
        // ACTUAL START LOGIC
        // UI Transitions
        homeScreen.classList.add('hidden');
        gameScreen.classList.remove('hidden');
        resultsScreen.classList.add('hidden');

        // Reset Game State
        input.value = "";
        input.focus();
        keyTimes = [];
        backspaces = 0;
        pauseCount = 0;
        combo = 0;
        maxCombo = 0;
        lastKeyTime = Date.now();

        // Set Text
        const randomIndex = Math.floor(Math.random() * paragraphs.length);
        document.getElementById("text").innerText = paragraphs[randomIndex];

        // Start Timer
        startTime = Date.now();
        if (timerInterval) clearInterval(timerInterval);
        timerInterval = setInterval(updateGameLoop, 100);
    });
}

function updateGameLoop() {
    const now = Date.now();
    const elapsed = (now - startTime) / 1000;
    const remaining = Math.max(0, totalTime - elapsed);

    // Update Timer Display
    document.getElementById("timer").innerText = remaining.toFixed(0) + "s";

    // Update Progress Bar
    const progress = (remaining / totalTime) * 100;
    document.getElementById("progress-bar").style.width = progress + "%";

    // Live WPM
    const textTyped = input.value.length;
    if (elapsed > 1 && textTyped > 0) {
        const wpm = ((textTyped / 5) / (elapsed / 60)).toFixed(0);
        document.getElementById("live-wpm").innerText = wpm;
    }

    if (remaining <= 0) {
        endTest();
    }
}

window.forceEndGame = function () {
    clearInterval(timerInterval);
    homeScreen.classList.remove('hidden');
    gameScreen.classList.add('hidden');
}

// --- INPUT HANDLING ---

input.addEventListener("keydown", (e) => {
    const now = Date.now();

    // Pause Detection (> 2 seconds idle)
    if (now - lastKeyTime > 2000 && input.value.length > 0) {
        pauseCount++;
    }
    lastKeyTime = now;
    keyTimes.push(now);

    if (e.key === "Backspace") {
        backspaces++;
        combo = 0; // Reset combo on error
        updateComboUI();
    } else if (e.key.length === 1) { // Normal character
        combo++;
        if (combo > maxCombo) maxCombo = combo;
        updateComboUI();
    }
});

function updateComboUI() {
    const comboEl = document.getElementById("combo");
    comboEl.innerText = combo + "x";

    // Visual feedback for high combo
    if (combo > 10) comboEl.classList.add('text-purple-400');
    else comboEl.classList.remove('text-purple-400');
}

// Prevent copy-pasting
input.addEventListener("paste", (e) => {
    e.preventDefault();
    showCustomAlert("SECURITY ALERT", "Copy-paste operations are restricted.");
});
input.addEventListener("drop", (e) => { e.preventDefault(); });

// --- MOTTO MODAL ---
window.closeMotto = function () {
    mottoModal.classList.add('hidden');
}

// --- RESULTS & SCORING ---

window.endTest = function () {
    clearInterval(timerInterval);

    // Calculate Metrics
    const endTime = Date.now();
    const duration = (endTime - startTime) / 1000;
    const textTyped = input.value.length;
    const wpm = Math.round(((textTyped / 5) / (duration / 60)));
    const avgDelay = averageDelay(keyTimes).toFixed(0);

    // Accuracy Calculation
    const totalKeys = textTyped + backspaces; // Approximation
    const accuracy = totalKeys > 0 ? Math.round(((totalKeys - backspaces) / totalKeys) * 100) : 100;

    // XP Calculation
    const xpBase = wpm * 2;
    const xpAccuracy = accuracy;
    const xpBonus = maxCombo * 2;
    const totalXP = xpBase + xpAccuracy + xpBonus;

    // Badge Logic
    let rank = "BRONZE";
    let badgeStartColor = "from-orange-700";
    let badgeEndColor = "to-orange-500";

    if (wpm > 60) {
        rank = "GOLD";
        badgeStartColor = "from-yellow-400";
        badgeEndColor = "to-yellow-600";
    } else if (wpm > 30) {
        rank = "SILVER";
        badgeStartColor = "from-slate-300";
        badgeEndColor = "to-slate-500";
    }

    // Save Local Stats
    const currentXP = parseInt(localStorage.getItem('focus_xp') || '0');
    localStorage.setItem('focus_xp', currentXP + totalXP);
    const bestWpm = parseInt(localStorage.getItem('focus_best_wpm') || '0');
    if (wpm > bestWpm) localStorage.setItem('focus_best_wpm', wpm);

    // Update Results UI
    document.getElementById("final-wpm").innerText = wpm;
    document.getElementById("final-accuracy").innerText = accuracy + "%";
    document.getElementById("xp-earned").innerText = totalXP;
    document.getElementById("rank-title").innerText = rank + " RANK";

    const badgeEl = document.getElementById("badge-display");
    badgeEl.className = `w-24 h-24 mx-auto mb-4 bg-gradient-to-br ${badgeStartColor} ${badgeEndColor} rounded-full flex items-center justify-center text-4xl shadow-[0_0_25px_rgba(255,255,255,0.3)] animate-pulse`;

    // Store Data Temporarily for Saving
    window.lastData = {
        wpm: wpm,
        backspaces: backspaces,
        avgDelay: avgDelay,
        duration: duration.toFixed(2),
        accuracy: accuracy,
        pauseCount: pauseCount,
        xp: totalXP,
        rank: rank,
        maxCombo: maxCombo,
        // Context fields will be read on save
    };

    // Show Results
    gameScreen.classList.add('hidden');
    resultsScreen.classList.remove('hidden');
}


// --- CUSTOM ALERT SYSTEM ---
const customAlertModal = document.getElementById('custom-alert-modal');
const alertTitle = document.getElementById('alert-title');
const alertMessage = document.getElementById('alert-message');
let alertCallback = null;

window.showCustomAlert = function (title, message, callback = null) {
    alertTitle.innerText = title || "SYSTEM NOTICE";
    alertMessage.innerText = message;
    alertCallback = callback;
    customAlertModal.classList.remove('hidden');
}

window.closeCustomAlert = function () {
    customAlertModal.classList.add('hidden');
    if (alertCallback) {
        alertCallback();
        alertCallback = null;
    }
}

// --- UTILITIES & SAVING ---

window.selectFocus = function (level) {
    document.getElementById('focus-input').value = level;

    // Visual Feedback
    document.querySelectorAll('.focus-btn').forEach(btn => {
        if (btn.dataset.value === level) {
            btn.classList.add('bg-cyan-600', 'text-white', 'border-cyan-500');
            btn.classList.remove('bg-slate-800', 'text-slate-400', 'border-slate-600');
        } else {
            btn.classList.remove('bg-cyan-600', 'text-white', 'border-cyan-500');
            btn.classList.add('bg-slate-800', 'text-slate-400', 'border-slate-600');
        }
    });
}


function validateInputs(data) {
    // 1. Name (3-20 chars, letters, numbers, underscore)
    const nameRegex = /^[a-zA-Z0-9_]{3,20}$/;
    if (!nameRegex.test(data.username)) {
        return "Name must be 3–20 characters.\nAllowed: Letters, Numbers, Underscore (_).\nNo spaces or special characters.";
    }

    // 2. Sleep (0-24, max 1 decimal)
    const sleep = parseFloat(data.sleep);
    if (isNaN(sleep) || sleep < 0 || sleep > 24) {
        return "Sleep must be between 0 and 24 hours.";
    }
    if (!/^\d+(\.\d{1})?$/.test(data.sleep)) {
        return "Sleep: Enter valid number (e.g., 7.5).";
    }

    // 3. Screen Time (0-24, max 2 decimals)
    const screen = parseFloat(data.screenTime);
    if (isNaN(screen) || screen < 0 || screen > 24) {
        return "Screen Time must be between 0 and 24 hours.";
    }
    if (!/^\d+(\.\d{1,2})?$/.test(data.screenTime)) {
        return "Screen Time: Max 2 decimal places allowed.";
    }

    // 4. Tiredness (1-5 integer)
    const fatigue = parseFloat(data.fatigue);
    if (!Number.isInteger(fatigue) || fatigue < 1 || fatigue > 5) {
        return "Tiredness Level must be 1 to 5.";
    }

    // 5. Stress Level (Required)
    if (!["0", "1", "2"].includes(data.stress)) {
        return "Please select your Stress Level.";
    }

    return null; // No errors
}

window.saveAndReset = function () {
    const data = window.lastData;

    // Get Values
    const focusLevel = document.getElementById('focus-input').value;
    const sleep = document.getElementById('sleep').value;
    const screenTime = document.getElementById('screen').value;
    const fatigue = document.getElementById('fatigue').value;
    const stress = document.getElementById('stress').value;
    const username = document.getElementById('username').value;

    // VALIDATION
    const validationError = validateInputs({
        username, sleep, screenTime, fatigue, stress
    });

    if (validationError) {
        showCustomAlert("INVALID DATA", validationError);
        return;
    }

    // Add Context Data
    data.focusLevel = focusLevel;
    data.sleep = sleep;
    data.screenTime = screenTime;
    data.fatigue = fatigue;
    data.stress = stress;
    data.username = username;

    // Send to Google Sheets
    sendToGoogleSheet(data);
}

function averageDelay(times) {
    if (times.length < 2) return 0;
    let sum = 0;
    for (let i = 1; i < times.length; i++) {
        sum += times[i] - times[i - 1];
    }
    return sum / (times.length - 1);
}

// PDF GENERATION
window.generatePDF = function (data) {
    // 1. Capture current form values into data if missing
    data.username = document.getElementById('username').value || "Anonymous Runner";
    data.focusLevel = document.getElementById('focus-input').value || "N/A";

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // --- THEME COLORS ---
    const bgDark = [15, 23, 42]; // Slate 900
    const cyan = [6, 182, 212];  // Cyan 500
    const purple = [168, 85, 247]; // Purple 500
    const white = [255, 255, 255];
    const gray = [148, 163, 184];

    // --- HEADER ---
    doc.setFillColor(...bgDark);
    doc.rect(0, 0, 210, 40, 'F');

    doc.setFont("helvetica", "bold");
    doc.setFontSize(24);
    doc.setTextColor(...cyan);
    doc.text("FOCUS CHALLENGE", 20, 20);

    doc.setFontSize(10);
    doc.setTextColor(...white);
    doc.text("// MISSION DEBRIEF REPORT", 20, 30);

    doc.setTextColor(...gray);
    doc.text(new Date().toLocaleString().toUpperCase(), 190, 20, { align: "right" });

    // --- PLAYER INFO ---
    doc.setDrawColor(...cyan);
    doc.setLineWidth(0.5);
    doc.line(20, 50, 190, 50);

    doc.setFontSize(14);
    doc.setTextColor(...bgDark);
    doc.text(`OPERATOR: ${data.username.toUpperCase()}`, 20, 65);
    doc.text(`RANK: ${data.rank}`, 190, 65, { align: "right" });

    // --- STATS GRID ---
    let y = 90;
    const boxWidth = 80;
    const boxHeight = 25;
    const gap = 10;

    const drawStatBox = (x, y, label, value, color) => {
        doc.setDrawColor(...color);
        doc.setFillColor(245, 247, 250);
        doc.roundedRect(x, y, boxWidth, boxHeight, 3, 3, 'FD');

        doc.setFontSize(8);
        doc.setTextColor(100, 116, 139);
        doc.text(label.toUpperCase(), x + 5, y + 8);

        doc.setFontSize(16);
        doc.setTextColor(...color);
        doc.setFont("courier", "bold");
        doc.text(String(value), x + 5, y + 20);
        doc.setFont("helvetica", "bold");
    };

    drawStatBox(20, y, "Total XP Earned", data.xp, purple);
    drawStatBox(110, y, "WPM Speed", data.wpm, cyan);

    y += boxHeight + gap;
    drawStatBox(20, y, "Accuracy", data.accuracy + "%", bgDark);
    drawStatBox(110, y, "Combo Streak", `${data.maxCombo}x`, bgDark);

    y += boxHeight + gap;
    drawStatBox(20, y, "Focus Level", data.focusLevel, purple);
    drawStatBox(110, y, "Distractions (Pauses)", data.pauseCount, cyan);

    // --- FOOTER ---
    doc.setDrawColor(200, 200, 200);
    doc.line(20, 270, 190, 270);
    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    doc.text("GENERATED BY DATA RUNNER SYSTEM // 2026", 105, 280, { align: "center" });

    doc.save(`focus_mission_${Date.now()}.pdf`);
}

// GOOGLE SHEETS
function sendToGoogleSheet(data) {
    const statusEl = document.getElementById("status");
    if (statusEl) statusEl.classList.remove("hidden");

    if (window.GOOGLE_SCRIPT_URL && window.GOOGLE_SCRIPT_URL.startsWith("http")) {
        fetch(window.GOOGLE_SCRIPT_URL, {
            method: "POST",
            mode: "no-cors",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        })
            .then(() => {
                showCustomAlert("UPLOAD COMPLETE", "Mission Data Uploaded Successfully!", () => {
                    location.reload(); // Reset to home
                });
            })
            .catch(err => {
                console.error(err);
                showCustomAlert("UPLOAD ERROR", "Connection failed. Check console logs.");
            });
    } else {
        showCustomAlert("SIMULATION COMPLETE", "Data logged locally (No cloud connection).", () => {
            location.reload();
        });
    }
}

// Initialize on Load
init();
