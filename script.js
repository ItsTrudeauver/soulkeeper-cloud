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
            showCommandList();
            commandInput.focus();
        });
    });

    // Easter egg handling
    document.getElementById('easter-egg-trigger').addEventListener('click', () => {
        clickCount++;
        if(clickCount === 3) revealJillMessage();
    });

    // Command processing
    commandInput.addEventListener('keypress', (e) => {
        if(e.key === 'Enter') {
            processCommand(commandInput.value.trim());
            commandInput.value = '';
            commandInput.focus();
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

function showCommandList() {
    const commands = `
╔════════════════════════════╗
║       COMMAND LIST         ║
╟────────────────────────────╢
║ [1] View Backup Archives   ║
║ [2] Initiate Soul Audit    ║
║ [3] Purchase Afterlife DLC ║
║ [4] Decrypt Black Archives ║
║ [ESC] Log Out              ║
╚════════════════════════════╝
    `;
    terminalOutput.innerHTML += commands;
}

function processCommand(command) {
    const output = document.getElementById('output');
    output.innerHTML += '\n> ' + command + '\n';
    
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
    
    output.scrollTop = output.scrollHeight;
}

function typeWriter(text, callback, speed = 30) {
    let i = 0;
    const output = document.getElementById('output');
    
    function type() {
        if (i < text.length) {
            output.innerHTML += glitchText(text.charAt(i));
            i++;
            setTimeout(type, speed);
        } else if (callback) {
            callback();
        }
    }
    type();
}

function glitchText(text, intensity = 0.1) {
    const glitchChars = ['▓', '░', '▒', '≡', '≣', '⌇', '⍓'];
    return text.split('').map(c => 
        Math.random() < intensity 
            ? `<span class="glitch-char">${glitchChars[Math.floor(Math.random()*glitchChars.length)]}</span>`
            : c
    ).join('');
}

function viewBackupArchives() {
    typeWriter("\nACCESSING BLACK ARCHIVES...\n", () => {
        document.getElementById('output').innerHTML += ASCII.archives;
        simulateLoading(() => {
            typeWriter("\nWARNING: CORRUPTED ENTRIES DETECTED\n");
        });
    });
}

function initiateSoulAudit() {
    typeWriter("\nINITIATING SOUL INTEGRITY SCAN...\n", () => {
        document.getElementById('output').innerHTML += ASCII.soulAudit;
        simulateLoading(() => {
            typeWriter("\nALERT: TRAUMA ECHOES DETECTED\n");
        });
    });
}

function purchaseAfterlifeDLC() {
    typeWriter("\nCONNECTING TO LAZARUS STORE...\n", () => {
        document.getElementById('output').innerHTML += ASCII.afterlifeDLC;
        simulateLoading(() => {
            typeWriter("\nERROR: INSUFFICIENT CREDITS\n");
        });
    });
}

function decryptBlackArchives() {
    typeWriter("\nINITIALIZING QUANTUM DECRYPTION...\n", () => {
        document.getElementById('output').innerHTML += ASCII.blackArchives;
        simulateLoading(() => {
            typeWriter("\nWARNING: UNAUTHORIZED ACCESS DETECTED\n");
        });
    });
}

function logOut() {
    typeWriter("\nTERMINATING SESSION...\n", () => {
        simulateLoading(() => {
            typeWriter("\n███] LOGOUT COMPLETE\n");
            typeWriter("NEUROSYSTEMS THANKS YOU\n");
        }, 1500);
    });
}

function unlockSecretDrink() {
    typeWriter("\nVALIDATING SECRET CODE...\n", () => {
        simulateLoading(() => {
            typeWriter("\nUNLOCKED: 'GLITCH CITY BLUES' COCKTAIL\n");
            typeWriter("VISIT VALHALLA TO REDEEM\n");
        });
    });
}

function revealJillMessage() {
    document.getElementById('main-display').classList.add('hidden');
    hiddenMessage.classList.remove('hidden');
    localStorage.setItem('unlock_code', 'GLITCHCITY');
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
    const output = document.getElementById('output');
    const loader = document.createElement('div');
    loader.className = 'loading';
    output.appendChild(loader);

    let dots = 0;
    const interval = setInterval(() => {
        loader.textContent = `LOADING ${'.'.repeat(dots)}`;
        dots = (dots % 3) + 1;
    }, 500);

    setTimeout(() => {
        clearInterval(interval);
        output.removeChild(loader);
        if(callback) callback();
    }, duration);
}
