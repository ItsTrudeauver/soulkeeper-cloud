document.addEventListener('DOMContentLoaded', () => {
    const terminalOutput = document.getElementById('output');
    const commandInput = document.getElementById('command-input');
    const hiddenMessage = document.getElementById('hidden-message');
    let clickCount = 0;
    let activeTab = null;
    let containmentState = 'inactive';
    let containmentApproved = false;
    let hasAttemptedContainment = false;

    const ASCII = {
        // ... (keep existing ASCII art definitions exactly as provided) ...
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
        hiddenMessage.innerHTML = `
╔════════════════════════════╗
║▒▒▒▒▒ JILL'S LAST MESSAGE ▒▒▒▒▒║
║▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓║
║▒ "I LEFT THE BACKDOOR IN  ▒║
║▓ PHANTOM.CODE USE:        ▓║
║▒ SK-${Math.random().toString(36).slice(2)}   ▒║
║▓ THEY'RE LYING ABOUT THE  ▓║
║▒ AFTERLIFE DLC"           ▒║
║▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓║
╚════════════════════════════╝`;
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

    document.getElementById('easter-egg-trigger').addEventListener('click', () => {
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
