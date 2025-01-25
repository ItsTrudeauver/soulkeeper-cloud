document.addEventListener('DOMContentLoaded', () => {
    const terminalOutput = document.getElementById('output');
    const commandInput = document.getElementById('command-input');
    const hiddenMessage = document.getElementById('hidden-message');
    let clickCount = 0;

    // Initialize terminal
    typeWriter("INITIALIZING SOULKEEPER™ CLOUD...\n\n", () => {
        simulateLoading(() => {
            typeWriter("ACCESSING LAZARUS NEUROSYSTEMS MAINFRAME...\n");
            generateFakeData();
            showCommandPrompt();
        });
    });

    // Easter egg handling
    document.getElementById('easter-egg-trigger').addEventListener('click', () => {
        clickCount++;
        if(clickCount === 3) revealJillMessage();
    });

    // Command processing
    commandInput.addEventListener('keyup', (e) => {
        if(e.key === 'Enter') {
            processCommand(commandInput.value.trim());
            commandInput.value = '';
        }
    });
});

const ASCII = {
    archives: `
    ╔════════════════════════════╗
    ║▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓║
    ║▒▒▒▒▒▒▒▒▒▒▒▒ BLACK ARCHIVES ▒▒▒▒▒▒▒║
    ║▓ 199X_VAULT ░░░░░░░░░░░░░▓║
    ║▒ ► jill_backup_1999.soul ▒║
    ║▓ ► dana_core.mem        ▓║
    ║▒ 207X_VAULT ███████████▒▒║
    ║▓ ► user_${Math.random().toString(16).slice(2)}.soul ▓║
    ║▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒║
    ╚════════════════════════════╝
    `,

    soulAudit: `
    ╔════════════════════════════╗
    ║▒▒▒▒▒▒▒▒▒▒▒▒ SOUL AUDIT ▒▒▒▒▒▒▒║
    ║▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓║
    ║▒ TRAUMA INDEX: ████▓▓░░ 72% ▒║
    ║▓ MEMORY LEAKS: █████▓░░░ 85% ▓║
    ║▒ JOY FRAGMENTS: █▓░░░░░░ 15% ▒║
    ║▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓║
    ╚════════════════════════════╝
    `,

    afterlifeDLC: `
    ╔════════════════════════════╗
    ║▒▒▒▒▒▒▒ AFTERLIFE DLC ▒▒▒▒▒▒▒║
    ║▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓║
    ║▒ BASIC: ₵9.99/month ░░░░░ ▒║
    ║▓ PRO: ₵49.99/month ███▓░ ▓║
    ║▒ ETERNITY: ₵999.99 █████ ▒║
    ║▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓║
    ╚════════════════════════════╝
    `,

    blackArchives: `
    ╔════════════════════════════╗
    ║▒▒▒▒▒ DECRYPTING ARCHIVES ▒▒▒▒▒║
    ║▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓║
    ║▒ FILE: jill_backup.soul ▒║
    ║▓ PROGRESS: █████▓░░░ 80% ▓║
    ║▒ CONTENT: [REDACTED]    ▒║
    ║▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓║
    ╚════════════════════════════╝
    `
};

function glitchText(text, intensity = 0.3) {
    const glitchChars = ['▓', '░', '▒', '≡', '≣', '⌇', '⍓'];
    return text.split('').map(c => 
        Math.random() < intensity 
            ? glitchChars[Math.floor(Math.random()*glitchChars.length)]
            : c
    ).join('');
}

function typeWriter(text, callback, speed = 50) {
    let i = 0;
    terminalOutput.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            terminalOutput.innerHTML += glitchText(text.charAt(i));
            i++;
            setTimeout(type, speed);
        } else if (callback) {
            callback();
        }
    }
    type();
}

function processCommand(command) {
    terminalOutput.innerHTML = '';
    
    switch(command.toLowerCase()) {
        case '1':
            viewBackupArchives();
            break;
        case '2':
            initiateSoulAudit();
            break;
        case '3':
            purchaseAfterlifeDLC();
            break;
        case '4':
            decryptBlackArchives();
            break;
        case 'esc':
            logOut();
            break;
        case 'dorothy':
            unlockSecretDrink();
            break;
        default:
            typeWriter(`UNKNOWN COMMAND: ${command}\n`);
    }
}

function viewBackupArchives() {
    typeWriter("ACCESSING BLACK ARCHIVES...\n", () => {
        terminalOutput.innerHTML += ASCII.archives;
        simulateLoading(() => {
            typeWriter("\nWARNING: 3 CORRUPTED ENTRIES DETECTED\n");
        });
    });
}

function initiateSoulAudit() {
    typeWriter("INITIATING SOUL INTEGRITY SCAN...\n", () => {
        terminalOutput.innerHTML += ASCII.soulAudit;
        simulateLoading(() => {
            typeWriter("\nALERT: TRAUMA ECHOES DETECTED\n");
        });
    });
}

function purchaseAfterlifeDLC() {
    typeWriter("CONNECTING TO LAZARUS STORE...\n", () => {
        terminalOutput.innerHTML += ASCII.afterlifeDLC;
        simulateLoading(() => {
            typeWriter("\nERROR: INSUFFICIENT CREDITS\n");
        });
    });
}

function decryptBlackArchives() {
    typeWriter("INITIALIZING QUANTUM DECRYPTION...\n", () => {
        terminalOutput.innerHTML += ASCII.blackArchives;
        simulateLoading(() => {
            typeWriter("\nWARNING: UNAUTHORIZED ACCESS DETECTED\n");
        });
    });
}

function logOut() {
    typeWriter("TERMINATING SESSION...\n", () => {
        simulateLoading(() => {
            typeWriter("███] LOGOUT COMPLETE\n");
            typeWriter("NEUROSYSTEMS THANKS YOU\n");
        });
    });
}

function revealJillMessage() {
    document.getElementById('main-display').classList.add('hidden');
    hiddenMessage.classList.remove('hidden');
    localStorage.setItem('unlock_code', 'GLITCHCITY');
}

function unlockSecretDrink() {
    typeWriter("VALIDATING SECRET CODE...\n", () => {
        simulateLoading(() => {
            typeWriter("UNLOCKED: 'GLITCH CITY BLUES' COCKTAIL\n");
            typeWriter("VISIT VALHALLA TO REDEEM\n");
        });
    });
}

function generateFakeData() {
    const stats = {
        memory: Math.floor(Math.random() * 100),
        trauma: Math.floor(Math.random() * 100),
        joy: Math.floor(Math.random() * 20)
    };

    document.documentElement.style.setProperty('--progress', `${stats.memory}%`);
}

function simulateLoading(callback, duration = 2000) {
    const loader = document.createElement('div');
    loader.className = 'loading';
    terminalOutput.appendChild(loader);

    let dots = 0;
    const interval = setInterval(() => {
        loader.textContent = `LOADING ${'.'.repeat(dots)}`;
        dots = (dots % 3) + 1;
    }, 500);

    setTimeout(() => {
        clearInterval(interval);
        if(callback) callback();
    }, duration);
}

function showCommandPrompt() {
    typeWriter("\n\nSOULKEEPER™ READY\n");
    typeWriter("ENTER COMMAND: [1-4] OR 'ESC'\n");
}