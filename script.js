document.addEventListener('DOMContentLoaded', () => {
    const terminalOutput = document.getElementById('output');
    const commandInput = document.getElementById('command-input');
    const hiddenMessage = document.getElementById('hidden-message');
    let clickCount = 0;

    // Async initialization sequence
    (async () => {
        await typeWriter("INITIALIZING SOULKEEPER™ CLOUD...\n\n");
        await simulateLoading(2000);
        await typeWriter("ACCESSING LAZARUS NEUROSYSTEMS MAINFRAME...\n");
        generateFakeData();
        showCommandList();
        commandInput.focus();
    })();

    // Easter egg handler
    document.getElementById('easter-egg-trigger').addEventListener('click', () => {
        if(++clickCount === 3) revealJillMessage();
    });

    // Command input handler
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
    terminalOutput.innerHTML += `
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
}

async function typeWriter(text, speed = 30) {
    return new Promise(resolve => {
        let i = 0;
        function type() {
            if (i < text.length) {
                terminalOutput.innerHTML += glitchText(text.charAt(i));
                i++;
                setTimeout(type, speed);
            } else {
                resolve();
            }
        }
        type();
    });
}

async function simulateLoading(duration = 2000) {
    return new Promise(resolve => {
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
            terminalOutput.removeChild(loader);
            resolve();
        }, duration);
    });
}

function processCommand(command) {
    terminalOutput.innerHTML += '\n> ' + command + '\n';
    
    switch(command.toLowerCase()) {
        case '1': viewBackupArchives(); break;
        case '2': initiateSoulAudit(); break;
        case '3': purchaseAfterlifeDLC(); break;
        case '4': decryptBlackArchives(); break;
        case 'esc': logOut(); break;
        case 'dorothy': unlockSecretDrink(); break;
        default: typeWriter(`UNKNOWN COMMAND: ${command}\n`);
    }
    
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
}

function glitchText(text, intensity = 0.1) {
    const glitchChars = ['▓', '░', '▒', '≡', '≣', '⌇', '⍓'];
    return text.split('').map(c => 
        Math.random() < intensity 
            ? `<span class="glitch-char">${glitchChars[Math.floor(Math.random()*glitchChars.length)]}</span>`
            : c
    ).join('');
}

async function viewBackupArchives() {
    await typeWriter("\nACCESSING BLACK ARCHIVES...\n");
    terminalOutput.innerHTML += ASCII.archives;
    await simulateLoading(1500);
    await typeWriter("\nWARNING: CORRUPTED ENTRIES DETECTED\n");
}

async function initiateSoulAudit() {
    await typeWriter("\nINITIATING SOUL INTEGRITY SCAN...\n");
    terminalOutput.innerHTML += ASCII.soulAudit;
    await simulateLoading(1500);
    await typeWriter("\nALERT: TRAUMA ECHOES DETECTED\n");
}

async function purchaseAfterlifeDLC() {
    await typeWriter("\nCONNECTING TO LAZARUS STORE...\n");
    terminalOutput.innerHTML += ASCII.afterlifeDLC;
    await simulateLoading(1500);
    await typeWriter("\nERROR: INSUFFICIENT CREDITS\n");
}

async function decryptBlackArchives() {
    await typeWriter("\nINITIALIZING QUANTUM DECRYPTION...\n");
    terminalOutput.innerHTML += ASCII.blackArchives;
    await simulateLoading(1500);
    await typeWriter("\nWARNING: UNAUTHORIZED ACCESS DETECTED\n");
}

async function logOut() {
    await typeWriter("\nTERMINATING SESSION...\n");
    await simulateLoading(1000);
    await typeWriter("\n███] LOGOUT COMPLETE\n");
    await typeWriter("NEUROSYSTEMS THANKS YOU\n");
}

async function unlockSecretDrink() {
    await typeWriter("\nVALIDATING SECRET CODE...\n");
    await simulateLoading(1000);
    await typeWriter("\nUNLOCKED: 'GLITCH CITY BLUES' COCKTAIL\n");
    await typeWriter("VISIT VALHALLA TO REDEEM\n");
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
