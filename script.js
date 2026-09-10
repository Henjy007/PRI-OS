// ==========================================
// CONFIGURATION & GLOBAL STATE
// ==========================================
const DEFAULT_LINE_DELAY = 150;
let currentUsername = "User";
let currentClearance = "1";
let currentMode = "login_user"; // 'login_user', 'login_clearance', 'root', 'raisa', 'off'
let commandHistory = [];
let historyIndex = -1;

const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

function playKeySound() {
  if (audioCtx.state === 'suspended') audioCtx.resume();
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.type = 'square';
  osc.frequency.setValueAtTime(400 + Math.random() * 200, audioCtx.currentTime);
  gain.gain.setValueAtTime(0.02, audioCtx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.03);
  osc.connect(gain);
  gain.connect(audioCtx.destination);
  osc.start();
  osc.stop(audioCtx.currentTime + 0.03);
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
  playReadySound();
}

// ==========================================
// BOOT SEQUENCE
// ==========================================
async function runBootSequence() {
  currentMode = "login_user";
  const bootText = [
    "Paragon OS. v2.3.11786 (c) 1982 Generative OS. All rights reserved. Licensed under the MIT License.",
    "Property of the Paragon Research Institute.",
    "[ DEUS EX MACHINA ]",
    ""
  ];
  await printSequence(bootText, 80);
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
    showPrompt();
    return;
  }

// LOGIN STEP 2: CLEARANCE & AUTO-PASSWORD
  if (currentMode === "login_clearance") {
    // Check if input consists strictly of a single digit between 0 and 5
    if (!/^[0-5]$/.test(trimmed)) {
      appendLine("ERROR: Invalid Security Clearance level. Must be a digit from 0 to 5.");
      showPrompt();
      return;
    }

    currentClearance = trimmed;

    // Stream the password prompt label
    const passLabel = document.createElement("div");
    passLabel.className = "line";
    passLabel.textContent = "Please insert password: ";
    outputLog.appendChild(passLabel);

    // Stream characters one by one with keypress audio
    const passwordLength = 12;
    for (let i = 0; i < passwordLength; i++) {
      passLabel.textContent += "•";
      playKeySound();
      await sleep(60);
    }

    await sleep(400);
    appendLine("AUTHENTICATING... SUCCESS");
    appendLine("");
    
    currentMode = "root";
    const postLoginInstructions = [
      "Press the [Up] and [Down] arrow keys to reference previous/later commands",
      "Type a command or type 'help' for a list of commands.",
      "Type 'exit' to exit the OS."
    ];
    await printSequence(postLoginInstructions, 60);
    return;
  }
  
  // ROOT MODE
  if (currentMode === "root") {
    const cmd = trimmed.toLowerCase();
    
    if (cmd === "help") {
      await printSequence([
        "HELP          Recieve a list of commands.",
        "SELFCHECK     Perform a full system check.",
        "STATIC        Advance to next prompt line.",
        "RAISASERVICE  Enters Raisa Service.",
        "EXIT          Exits the Operating System.",
        "CLEAR         Clears the terminal screen."
      ]);
    } else if (cmd === "selfcheck") {
      await printSequence([
        "BEGINNING SELF CHECK PROTOCOL...",
        { type: "text", value: "BEGIN MEMORY BOARD CHECK..." },
        { type: "pause", duration: 1500 },
        { type: "text", value: "MEMORY BOARD CHECK [ OK ]" },
        { type: "text", value: "BEGIN CPU SYSTEMS BOARD CHECK..." },
        { type: "pause", duration: 1500 },
        { type: "text", value: "CPU SYSTEMS BOARD CHECK [ OK ]" },
        { type: "text", value: "Running init.s..." },
        { type: "pause", duration: 2000 },
        { type: "text", value: "CONSENSUS [ OK ]" },
        "",
        `User: ${currentUsername}`,
        "ID: 8592-A4",
        `Rank: Level-${currentClearance} Clearance`
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
        "exit      Exits Raisa Service.",
        "help      Recieve a list of commands",
        "open      Open a document by name.",
        "cat       Open a document by name.",
        "share     Shares a document to a specified personnel.",
        "unshare   Unshares a document to a specified personnel.",
        "ls        Lists all available documents that you have clearance to.",
        "access    View all personnel that have access to a file."
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
        await printSequence(["Usage: open <document_name>"]);
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
      await printSequence(["Access Denied: Clearance level insufficient to modify document permissions."]);
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
  } else if (e.key === "ArrowDown") {
    e.preventDefault();
    if (historyIndex < commandHistory.length - 1) {
      historyIndex++;
      cliInput.value = commandHistory[historyIndex];
    } else {
      historyIndex = commandHistory.length;
      cliInput.value = "";
    }
  } else if (e.key !== "F5") {
    playKeySound();
  }
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
