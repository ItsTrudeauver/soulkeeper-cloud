document.addEventListener('DOMContentLoaded', () => {
  
    const bgm = document.getElementById('bgm');
   document.addEventListener('click', () => {
        bgm.play().catch(() => {
            console.log('Audio requires user interaction');
        });
    }, { once: true });
    
    
    const terminalOutput = document.getElementById('output');
    const commandInput = document.getElementById('command-input');
    const hiddenMessage = document.getElementById('hidden-message');
    let clickCount = 0;
    let activeTab = null;
    let containmentState = 'inactive';
    let containmentApproved = false;
    let hasAttemptedContainment = false;

   const ASCII = {
    archives: `
╔══════════════════════════════════════════════════╗
║▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓║
║▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ BLACK ARCHIVES v9.4.20 ▒▒▒▒▒▒▒▒▒║
║▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓║
║▒ ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ ▒║
║▓ [>] 199X_VAULT                     ₵ORRUPTION:88%▓║
║▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒║
║▓ ► jill_backup_1999.soul           [████░░ 64%] ▓║
║▒   Type: Neural Ghost              Size: 847TB   ▒║
║▓   Last Modified: 12/31/1999 23:59               ▓║
║▒ ► dana_core.mem                   [███▓░░ 45%] ▒║
║▓   Type: Memory Crypt              Size: 2.1PB   ▓║
║▒   Last Access: 10/31/2001 00:01                 ▒║
║▓ ► user_${Math.random().toString(16).slice(2)}.soul [▓░░░░░ 12%] ▓║
║▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒║
║▓ [>] 207X_VAULT                     ₵ORRUPTION:97%▓║
║▒ ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ ▒║
║▓ ► neural_echo_2077.ghst           [▒▒▒▒▒▒ 100%]▓║
║▒   Type: Fractured Psyche          Size: ????    ▒║
║▓ ► Lazarus_Protocol_Omega.mem      [█▓▓▓░░ 55%] ▓║
║▒   Type: Encrypted Directive       Size: 666ZB   ▒║
║▓ ► [REDACTED]_X12.soul             [█████ 95%]  ▓║
║▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒║
║▓ [>] FRAGMENTED ENTRIES (${Math.floor(Math.random()*9999)})       ▓║
║▒ ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡ ▒║
║▓ ░░░▒▓▓ ERROR: SOULBOUND ENCRYPTION DETECTED ▓▓▒░░▓║
║▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒║
║▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓║
║▒▒▒▒▒▒▒▒ DECRYPTION IMPOSSIBLE - CONSUME ₵OINS ▒▒▒▒▒║
╚══════════════════════════════════════════════════╝
    `,
    
    soulAudit: `
╔══════════════════════════════════════════════════╗
║▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ SOUL AUDIT v3.1.4 ▓▓▓▓▓▓▓▓▓▓▓▓▓▓║
║▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒║
║▓ NEURAL INTEGRITY ASSESSMENT              ▓▓▓▓▓▓ ▓║
║▒ ███████████████████████████▓▓▓░░░░░░ 72%       ▒║
║▓ PSYCHIC FRAGMENTATION INDEX             ████▓░ ▓║
║▒ ███████████████████████████████▓▓▓▓░░░ 89%     ▒║
║▓ TRAUMA ECHO AMPLIFICATION               █▓░░░░ ▓║
║▒ ██████████████████████████░░░░░░░░░░░ 15%      ▒║
║▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓║
║▒ [WARNING]                                    ▒▒▒║
║▓ ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ ▓║
║▒ █ CRITICAL MEMORY LEAK DETECTED              ▒║
║▓ █ 127 ACTIVE NIGHTMARE PROTOCOLS             ▓║
║▒ █ SOULBOUND ENCRYPTION ACTIVE                ▒║
║▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓║
║▒▒▒▒▒▒▒▒ RECOMMENDATION: PURCHASE AFTERLIFE DLC ▒▒▒║
╚══════════════════════════════════════════════════╝
    `,
    
    afterlifeDLC: `
╔══════════════════════════════════════════════════╗
║▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ AFTERLIFE DLC STORE ▓▓▓▓▓▓▓▓▓▓▓▓║
║▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒║
║▓ BASIC TIER                               ₵9.99/m▓║
║▒ ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ ▒║
║▓ ► 5GB Soul Storage                      ░░░░░ ▓║
║▒ ► Basic Consciousness Upload            ░░░░░ ▒║
║▓ ► Ad-Supported Afterlife                ░░░░░ ▓║
║▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒║
║▓ PRO TIER                                ₵49.99/m▓║
║▒ ████████████████████████████████████████████ ▒║
║▓ ► 50GB Soul Storage                     ███▓░ ▓║
║▒ ► Premium Neural Archives               ███▓░ ▒║
║▓ ► Ad-Free Eternity                      ███▓░ ▓║
║▒ ► Trauma Filter (Basic)                 ███▓░ ▒║
║▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓║
║▒ ULTIMATE PACKAGE                        ₵999.99 ▒║
║▓ ████████████████████████████████████████████ ▓║
║▒ ► Unlimited Storage                     █████ ▒║
║▓ ► Quantum Immortality                   █████ ▓║
║▒ ► Memory Editing Suite                  █████ ▒║
║▓ ► VIP Lazarus Support                   █████ ▓║
║▒ ► [REDACTED] Feature                    █████ ▒║
║▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓║
║▒▒▒▒▒▒▒▒ LIMITED TIME: FREE SOUL BACKUP! ▒▒▒▒▒▒▒▒▒║
╚══════════════════════════════════════════════════╝
    `,
    
    blackArchives: `
╔══════════════════════════════════════════════════╗
║▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ QUANTUM DECRYPTION ▓▓▓▓▓▓▓▓▓▓▓▓▓║
║▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒║
║▓ TARGET: jill_backup_1999.soul                  ▓║
║▒ PROGRESS: █████████████████████▓▓▓▓░░ 82%      ▒║
║▓ ESTIMATED TIME: 14H 22M (Subject to paradox)   ▓║
║▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒║
║▓ FRAGMENT RECOVERY:                            ▓║
║▒ ► Memory_Shard_01.ghst         [███▓░░ 45%]   ▒║
║▓ ► Trauma_Echo_1999.enc         [▓▓░░░░ 18%]   ▓║
║▒ ► Last_Breath.frag             [█████ 100%]   ▒║
║▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓║
║▒ [ALERT] NEURAL GHOST DETECTED IN STREAM       ▒▒║
║▓ ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ ▓║
║▒ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ ▒║
║▓ ► INITIATE CONTAINMENT PROTOCOL? (Y/N)        ▓║
╚══════════════════════════════════════════════════╝
    `
};

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

    function showCommandList() {
        terminalOutput.innerHTML += `
╔════════════════════════════╗
║       COMMAND LIST         ║
╟────────────────────────────╢
║ [1] View Backup Archives   ║
║ [2] Initiate Soul Audit    ║
║ [3] Purchase Afterlife DLC ║
║ [4] Decrypt Black Archives ║
║ [ESC] Close All Tabs       ║
╚════════════════════════════╝`;
    }

    function glitchText(text, intensity = 0.1) {
        const glitchChars = ['▓', '░', '▒', '≡', '≣', '⌇', '⍓'];
        return text.split('').map(c => 
            Math.random() < intensity 
                ? `<span class="glitch-char">${glitchChars[Math.floor(Math.random()*glitchChars.length)]}</span>`
                : c
        ).join('');
    }

    function createTab(id, content) {
        const tab = document.createElement('div');
        tab.className = 'cyber-tab';
        tab.id = `tab-${id}`;
        tab.innerHTML = content;
        tab.style.transform = 'scale(0.9)';
        tab.style.opacity = '0';
        terminalOutput.appendChild(tab);
        setTimeout(() => {
            tab.style.transform = 'scale(1)';
            tab.style.opacity = '1';
        }, 50);
        return tab;
    }

    function activateTab(command) {
        if (activeTab) {
            activeTab.style.transform = 'scale(0.8) translateY(20px)';
            activeTab.style.opacity = '0.3';
            activeTab.style.filter = 'blur(2px)';
        }
        
        const tabId = `tab-${command}`;
        let tab = document.getElementById(tabId);
        
        if (!tab) {
            const content = ASCII[{
                '1': 'archives',
                '2': 'soulAudit',
                '3': 'afterlifeDLC',
                '4': 'blackArchives'
            }[command]];
            tab = createTab(command, content);
        }

        tab.style.transform = 'scale(1)';
        tab.style.opacity = '1';
        tab.style.zIndex = '2';
        activeTab = tab;
        tab.innerHTML = glitchText(tab.innerHTML, 0.05);
    }

    function closeAllTabs() {
        const tabs = document.querySelectorAll('.cyber-tab');
        tabs.forEach(tab => {
            tab.style.transform = 'scale(0)';
            tab.style.opacity = '0';
            setTimeout(() => tab.remove(), 300);
        });
        activeTab = null;
    }

    function processCommand(command) {
        const normalizedCmd = command.toLowerCase().trim();
        
        if (containmentState === 'awaiting-response') {
            handleContainmentResponse(normalizedCmd);
            return;
        }

        terminalOutput.innerHTML += '\n> ' + command + '\n';
        
        switch(normalizedCmd) {
            case '1': 
                activateTab('1');
                break;
            case '2': 
                activateTab('2');
                break;
            case '3': 
                activateTab('3');
                break;
            case '4': 
                activateTab('4');
                containmentState = 'awaiting-response';
                hasAttemptedContainment = true;
                break;
            case 'esc': 
                closeAllTabs();
                break;
            case 'dorothy': 
                unlockSecretDrink();
                break;
            case 'override':
                handleOverrideCommand();
                break;
            case '19991231':
                showMillenniumBug();
                break;
            default: 
                typeWriter(`UNKNOWN COMMAND: ${command}\n`);
        }
        
        terminalOutput.scrollTop = terminalOutput.scrollHeight;
    }

    async function handleContainmentResponse(response) {
        containmentState = 'processing';
        
        await typeWriter("\nINITIALIZING CONTAINMENT PROTOCOL...");
        await simulateLoading(1500);

        if (response === 'y') {
            containmentApproved = true;
            terminalOutput.innerHTML += `
╔════════════════════════════╗
║▒▒▒▒▒ CONTAINMENT SEQUENCE ▒▒▒▒▒║
║▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓║
║▒ NEURAL GHOST: CONTAINED  ▒║
║▓ SYSTEM STABILITY: 12%    ▓║
║▒ WARNING: SOUL FRAGMENTS  ▒║
║▓ LOST IN PROCESS          ▓║
║▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒║
╚════════════════════════════╝\n`;
        } else {
            terminalOutput.innerHTML += `
╔════════════════════════════╗
║▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓║
║▒ CONTAINMENT ABORTED      ▒║
║▓ NEURAL GHOST ACTIVITY    ▓║
║▒ INCREASING: 300%         ▒║
║▓ RECOMMEND EVACUATION     ▓║
║▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓║
╚════════════════════════════╝\n`;
        }

        containmentState = 'inactive';
        terminalOutput.scrollTop = terminalOutput.scrollHeight;
    }

    async function handleOverrideCommand() {
        if (!containmentApproved) {
            await typeWriter("\nACCESS DENIED: INSUFFICIENT CLEARANCE\n");
            return;
        }

        await typeWriter("\nOVERRIDING SAFETY PROTOCOLS...");
        await simulateLoading(2000);
        
        terminalOutput.innerHTML += `
╔════════════════════════════╗
║▓▓▓▓▓▓▓ GHOST PROTOCOL ▓▓▓▓▓▓▓║
║▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒║
║▓ TEMPORAL SHIELD: OFF  ▓║
║▒ ACCESSING PRIME MEMORY... ▒║
║▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓║
║▒ ERROR: 0xDEADCODE         ▒║
║▓ YOU SHOULDN'T BE HERE     ▓║
║▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒║
╚════════════════════════════╝\n`;
    }

    async function showMillenniumBug() {
        await typeWriter("\nTEMPORAL ANOMALY DETECTED...");
        await simulateLoading(1000);
        
        terminalOutput.innerHTML += `
╔════════════════════════════╗
║▓▓▓▓▓▓▓ MILLENNIUM BUG ▓▓▓▓▓▓▓║
║▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒║
║▓ SOULKEEPER.EXE FAILURE▓║
║▒ Y2K COMPLIANCE:        ▒║
║▓ [██████████ 99.9%]     ▓║
║▒ REBOOTING...           ▒║
║▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓║
╚════════════════════════════╝\n`;
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
    
    // Wrap in <pre> and add ASCII art styling classes
    hiddenMessage.innerHTML = `
        <pre class="ascii-art jill-message">
╔════════════════════════════╗
║▒▒▒▒▒ JILL'S LAST MESSAGE ▒▒▒▒▒║
║▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓║
║▒ "I LEFT THE BACKDOOR IN  ▒║
║▓ PHANTOM.CODE USE:        ▓║
║▒ SK-${Math.random().toString(36).slice(2).toUpperCase()}   ▒║
║▓ THEY'RE LYING ABOUT THE  ▓║
║▒ AFTERLIFE DLC"           ▒║
║▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓║
╚════════════════════════════╝
        </pre>
        <p class="secret-code glitched">COCKTAIL CODE: GLITCHCITY</p>
    `;
    
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

    (async () => {
        try {
            await typeWriter("INITIALIZING SOULKEEPER™ CLOUD...\n\n");
            await simulateLoading(2000);
            await typeWriter("ACCESSING LAZARUS NEUROSYSTEMS MAINFRAME...\n");
            generateFakeData();
            showCommandList();
            commandInput.focus();
        } catch (error) {
            console.error("Initialization failed:", error);
        }
    })();

    document.getElementById('main-logo').addEventListener('click', () => {
        if(++clickCount === 3) {
            revealJillMessage();
            clickCount = 0;
        }
    });

    commandInput.addEventListener('keypress', (e) => {
        if(e.key === 'Enter') {
            processCommand(commandInput.value.trim());
            commandInput.value = '';
            commandInput.focus();
        }
    });
});
