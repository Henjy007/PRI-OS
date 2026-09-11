// ==========================================
// CONFIGURATION & GLOBAL STATE
// ==========================================
const DEFAULT_LINE_DELAY = 180;
let currentUsername = "User";
let currentClearance = "1";
let currentMode = "login_user"; // 'login_user', 'login_clearance', 'root', 'raisa', 'off'
let commandHistory = [];
let historyIndex = -1;

const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

// Hitting a keystroke sound
const keyAudio = new Audio('366f2799-7060-488e-9d1b-f8852a946afd-render.mp3'); 

function playKeySound() {
  // Cloning the audio node lets keys play rapidly on top of each other without cutting off
  const soundClone = keyAudio.cloneNode(); 
  soundClone.volume = 0.3; // Volume from 0.0 to 1.0
  soundClone.play().catch(() => {}); // Prevents browser console errors
}

// Sound one
const soundOneAudio = new Audio('Sound one.mp3'); 

function playSoundOne() {
  const soundClone = soundOneAudio.cloneNode();
  soundClone.volume = 0.3; // Volume from 0.0 to 1.0
  soundClone.play().catch(() => {});
}

// Sound two
const soundTwoAudio = new Audio('Sound two.mp3'); 

function playSoundTwo() {
  const soundClone = soundTwoAudio.cloneNode();
  soundClone.volume = 0.3; // Volume from 0.0 to 1.0
  soundClone.play().catch(() => {});
}

// Sound three
const soundThreeAudio = new Audio('Sound three.mp3'); 

function playSoundThree() {
  const soundClone = soundThreeAudio.cloneNode();
  soundClone.volume = 0.3; // Volume from 0.0 to 1.0
  soundClone.play().catch(() => {});
}

function playReadySound() {
  if (audioCtx.state === 'suspended') audioCtx.resume();
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.type = 'sine';
  osc.frequency.setValueAtTime(800, audioCtx.currentTime);
  gain.gain.setValueAtTime(0.04, audioCtx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.08);
  osc.connect(gain);
  gain.connect(audioCtx.destination);
  osc.start();
  osc.stop(audioCtx.currentTime + 0.08);
}

// ==========================================
// DOCUMENT DATABASE ARCHITECTURE
// ==========================================
const DOCUMENTS = {
  "test_001": {
    archivedOn: "07/09/2026",
    content: [
      { type: "text", value: "PARAGON RESEARCH INSTITUTE - CLASSIFIED RECORD" },
      { type: "text", value: "Subject: Initial terminal testing sequence." },
      { type: "pause", duration: 1000 },
      { type: "text", value: "Status: All subsystem parameters nominal." }
    ]
  },
  "test_002": {
    archivedOn: "08/09/2026",
    content: [
      { type: "text", value: "PARAGON RESEARCH INSTITUTE - VIDEO ARCHIVE" },
      { type: "video", url: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
      { type: "text", value: "End of media transmission." }
    ]
  }
};

// ==========================================
// DOM ELEMENTS
// ==========================================
const outputLog = document.getElementById("output-log");
const inputLine = document.getElementById("input-line");
const cliInput = document.getElementById("cli-input");
const promptSpan = document.getElementById("prompt");

// ==========================================
// UTILITY FUNCTIONS
// ==========================================
function appendLine(text = "") {
  const line = document.createElement("div");
  line.className = "line";
  line.textContent = text;
  outputLog.appendChild(line);
  document.getElementById("terminal").scrollTop = document.getElementById("terminal").scrollHeight;
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function printSequence(lines, defaultDelay = DEFAULT_LINE_DELAY) {
  inputLine.classList.add("hidden");
  for (const item of lines) {
    if (typeof item === "string") {
      appendLine(item);
      await sleep(defaultDelay);
    } else if (item.type === "text") {
      appendLine(item.value);
      await sleep(item.delay || defaultDelay);
    } else if (item.type === "pause") {
      await sleep(item.duration);
    } else if (item.type === "video") {
      const iframe = document.createElement("iframe");
      iframe.className = "doc-video";
      iframe.src = item.url;
      iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
      outputLog.appendChild(iframe);
      await sleep(defaultDelay);
    } else if (item.type === "sound") {
      item.fn();
    }
  }
  showPrompt();
}

function showPrompt() {
  if (currentMode === "off") return;
  
  if (currentMode === "login_user") {
    promptSpan.innerHTML = "Please insert username:&nbsp;";
  } else if (currentMode === "login_clearance") {
    promptSpan.innerHTML = "Please insert your security clearance: SC -&nbsp;";
  } else if (currentMode === "root") {
    promptSpan.innerHTML = "root@localhost:~#&nbsp;";
  } else if (currentMode === "raisa") {
    promptSpan.innerHTML = "raisa$&nbsp;";
  }
  
  inputLine.classList.remove("hidden");
  cliInput.value = "";
  cliInput.focus();
  
  playKeySound();
}

// ==========================================
// BOOT SEQUENCE
// ==========================================
async function runBootSequence() {
  currentMode = "login_user";
  await printSequence([
    { type: "pause", duration: 500 },
    { type: "text", value: "Paragon OS. v2.3.11786 (c) 1982 Generative OS. All rights reserved. Licensed under the MIT License." },
    { type: "pause", duration: 750 },
    { type: "text", value: "Property of the Paragon Research Institute." },
    { type: "text", value: "[ DEUS EX MACHINA ]" },
    { type: "text", value: " " },
  ])
}

// ==========================================
// COMMAND HANDLERS
// ==========================================
async function handleCommand(rawInput) {
  const trimmed = rawInput.trim();
  appendLine(`${promptSpan.textContent}${rawInput}`);
  
  if (trimmed.length > 0 && currentMode !== "login_user" && currentMode !== "login_clearance") {
    commandHistory.push(rawInput);
    historyIndex = commandHistory.length;
  }

  // LOGIN STEP 1: USERNAME
  if (currentMode === "login_user") {
    currentUsername = trimmed || "User";
    currentMode = "login_clearance";
    await sleep(DEFAULT_LINE_DELAY);
    showPrompt();
    return;
  }

// LOGIN STEP 2: CLEARANCE & AUTO-PASSWORD
if (currentMode === "login_clearance") {
  if (!/^[0-5]$/.test(trimmed)) {
    appendLine("ERROR: Invalid Security Clearance level. Must be a digit from 0 to 5.");
    showPrompt();
    return;
  }

  currentClearance = trimmed;

  await sleep(180)

  // 1. Create the container line
  const passLine = document.createElement("div");
  passLine.className = "line";
  
  const labelSpan = document.createElement("span");
  labelSpan.textContent = "Please insert password: ";
  
  const dotsSpan = document.createElement("span");
  
  const cursorSpan = document.createElement("span");
  cursorSpan.textContent = "|"; 

  passLine.appendChild(labelSpan);
  passLine.appendChild(dotsSpan);
  passLine.appendChild(cursorSpan);
  outputLog.appendChild(passLine);

  // 2. Pause before typing starts
  await sleep(400); 

  // 3. Autotype dots with flashing cursor effect
  const passwordLength = 12;
  for (let i = 0; i < passwordLength; i++) {
    dotsSpan.textContent += "•";
    playKeySound();
    
    // Toggle cursor visibility for the flashing effect
    cursorSpan.style.visibility = (i % 2 === 0) ? "hidden" : "visible";
    
    await sleep(150);
  }

  // Hide the autotype cursor once finished
  cursorSpan.style.visibility = "hidden";

  await sleep(250);
  appendLine("AUTHENTICATING...");
  await sleep(750);
  appendLine("SUCCESS");
  appendLine("");
  
  currentMode = "root";
  const postLoginInstructions = [
    { type: "pause", duration: 500 },
    { type: "text", value: " " },
    { type: "text", value: "Press the [Up] and [Down] arrow keys to reference previous/later commands" },
    { type: "text", value: "Type a command or type 'help' for a list of commands." },
    { type: "text", value: "Type 'exit' to exit the OS." },
  ];
  await printSequence(postLoginInstructions, 180);
  return;
}
  
  // ROOT MODE
  if (currentMode === "root") {
    const cmd = trimmed.toLowerCase();
    
    if (cmd === "help") {
      await printSequence([
        "HELP              Provides help for commands.",
        "SELFCHECK         Performs a System self-check.",
        "STATIC            Displays and manages static variables.",
        "RAISASERVICE      Enters Raisa Service for all document needs.",
        "EXIT              Exits the OS.",
        "CLEAR             Clears the OS log."
      ]);
    } else if (cmd === "selfcheck") {
      await printSequence([
        { type: "text", value: "BEGIN MEMORY BOARD CHECK" },
        { type: "pause", duration: 1000 },
        { type: "sound", fn: playSoundOne },
        { type: "text", value: "MEMORY BOARD CHECK [ OK ]" },
        { type: "text", value: " " },
        { type: "text", value: "THE TOP OF RAM IS 7FFF HEX." },
        { type: "text", value: "STACK BEGINS FROM 7F90 HEX." },
        { type: "text", value: " " },
        { type: "text", value: "BEGIN CPU SYSTEMS BOARD CHECK" },
        { type: "pause", duration: 1000 },
        { type: "sound", fn: playSoundTwo },
        { type: "text", value: "CPU SYSTEMS BOARD CHECK [ OK ]" },
        { type: "text", value: " " },
        { type: "text", value: "Started Initialize ExtIOStream" },
        { type: "text", value: "No External Storage Device Detected" },
        { type: "text", value: "Mounting $boot..." },
        { type: "text", value: "Mounted $boot [ OK ]" },
        { type: "text", value: "Started Apply Kernel Variables" },
        { type: "text", value: "Running init.s" },
        { type: "text", value: " " },
        { type: "sound", fn: playSoundThree },
        { type: "text", value: "CONSENSUS [ OK ]" },
        { type: "text", value: " " },
        { type: "pause", duration: 500 },
        { type: "text", value: "CURRENT USER DATA" },
        { type: "pause", duration: 1000 },
        "",
        `User: ${currentUsername}`,
        "ID: 8592-A4",
        `Rank: SC-${currentClearance}`
      ]);
    } else if (cmd === "static") {
      showPrompt();
    } else if (cmd === "raisaservice") {
      currentMode = "raisa";
      await printSequence([
        "Welcome to Raisa Service.",
        "Please use the ‘help’ command to see a list of commands."
      ]);
    } else if (cmd === "clear") {
      inputLine.classList.add("hidden");
      outputLog.classList.add("credits-scroll");
      await sleep(2500);
      outputLog.classList.remove("credits-scroll");
      outputLog.innerHTML = "";
      await sleep(2000);
      showPrompt();
    } else if (cmd === "exit") {
      await printSequence([
        "Exiting Operating System...",
        "Locking Session...",
        { type: "pause", duration: 1500 },
        "SYSTEM SHUTDOWN COMPLETE"
      ]);
      await sleep(1500);
      outputLog.innerHTML = "";
      currentMode = "off";
      appendLine("Press any key to turn the PC back on.");
    } else {
      await printSequence([`ERROR: Command '${trimmed}' not found.`]);
    }
    return;
  }

// RAISA SUBSYSTEM MODE
  if (currentMode === "raisa") {
    const parts = trimmed.split(" ");
    const cmd = parts[0].toLowerCase();
    const arg = parts.slice(1).join(" ");

    if (cmd === "help") {
      await printSequence([
        "exit         Exits Raisa Service.",
        "help         Recieve a list of commands",
        "open         Open a document by name.",
        "cat          Open a document by name.",
        "share        Shares a document to a specified personnel.",
        "unshare      Unshares a document to a specified personnel.",
        "ls           Lists all available documents that you have clearance to.",
        "access       View all personnel that have access to a file."
      ]);
    } else if (cmd === "exit") {
      currentMode = "root";
      await printSequence(["Exiting Raisa Service."]);
    } else if (cmd === "ls") {
      const docKeys = Object.keys(DOCUMENTS);
      if (docKeys.length === 0) {
        await printSequence(["No documents found."]);
      } else {
        const lines = ["Document Name:                  Archived on:"];
        docKeys.forEach(name => {
          const doc = DOCUMENTS[name];
          lines.push(`${name.padEnd(32, ' ')}${doc.archivedOn}`);
        });
        await printSequence(lines);
      }
    } else if (cmd === "open" || cmd === "cat") {
      if (!arg) {
        // Dynamically displays 'Usage: open <document_name>' or 'Usage: cat <document_name>'
        await printSequence([`Usage: ${cmd} <document_name>`]);
        return;
      }
      if (DOCUMENTS[arg]) {
        await printSequence([
          `Searching for document '${arg}'.`,
          { type: "pause", duration: 800 },
          "Document found.",
          "Opening document.",
          { type: "pause", duration: 1500 }
        ]);
        await printSequence(DOCUMENTS[arg].content);
      } else {
        await printSequence([`ERROR: Document '${arg}' not found.`]);
      }
    } else if (cmd === "access") {
      if (!arg) {
        await printSequence(["Usage: access <document_name>"]);
      } else if (DOCUMENTS[arg]) {
        await printSequence([
          `DOCUMENT: ${arg}`,
          "CLEARANCE LEVEL: PUBLIC / ALL PERSONNEL APPROVED"
        ]);
      } else {
        await printSequence([`ERROR: Document '${arg}' not found.`]);
      }
    } else if (cmd === "share" || cmd === "unshare") {
      if (!arg) {
        await printSequence([`Usage: ${cmd} <document_name>`]);
      } else if (!DOCUMENTS[arg]) {
        // Point 5 fix: Checks if document exists FIRST
        await printSequence([`ERROR: Document '${arg}' not found.`]);
      } else {
        // Point 5 fix: Only triggers if document exists
        await printSequence(["Access Denied: Clearance level insufficient to modify document permissions."]);
      }
    } else {
      await printSequence([`ERROR: Command '${trimmed}' not found.`]);
    }
  }
}

// ==========================================
// EVENT LISTENERS
// ==========================================
cliInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const val = cliInput.value;
    inputLine.classList.add("hidden");
    handleCommand(val);
  } else if (e.key === "ArrowUp") {
    e.preventDefault();
    if (historyIndex > 0) {
      historyIndex--;
      cliInput.value = commandHistory[historyIndex];
    }
    playKeySound(); // Plays sound for ArrowUp
  } else if (e.key === "ArrowDown") {
    e.preventDefault();
    if (historyIndex < commandHistory.length - 1) {
      historyIndex++;
      cliInput.value = commandHistory[historyIndex];
    } else {
      historyIndex = commandHistory.length;
      cliInput.value = "";
    }
    playKeySound(); // Plays sound for ArrowDown
  } else if (e.key.length === 1 || e.key === "Backspace") {
    // Plays sound ONLY for single printable characters and Backspace
    playKeySound();
  }
  // Left/Right arrows, Shift, Ctrl, Alt, CapsLock, F-keys, etc. are silently ignored
});

window.addEventListener("keydown", async (e) => {
  if (currentMode === "off") {
    outputLog.innerHTML = "";
    currentMode = "root";
    await printSequence([`Welcome ${currentUsername}!`, ""]);
  }
});

document.getElementById("terminal").addEventListener("click", () => {
  if (currentMode !== "off" && !inputLine.classList.contains("hidden")) {
    cliInput.focus();
  }
});

window.addEventListener("DOMContentLoaded", runBootSequence);
