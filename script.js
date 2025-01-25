document.addEventListener('DOMContentLoaded', () => {
    const terminalOutput = document.getElementById('output');
    const commandInput = document.getElementById('command-input');
    const hiddenMessage = document.getElementById('hidden-message');
    let clickCount = 0;
    let activeTab = null;

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
╚════════════════════════════╝
        `;
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
            activeTab.style.transform = 'scale(0.8)';
            activeTab.style.opacity = '0.5';
            activeTab.style.zIndex = '1';
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
        terminalOutput.innerHTML += '\n> ' + command + '\n';
        
        switch(command.toLowerCase()) {
            case '1':
            case '2':
            case '3':
            case '4':
                activateTab(command);
                break;
            case 'esc':
                closeAllTabs();
                break;
            case 'dorothy':
                unlockSecretDrink();
                break;
            default:
                typeWriter(`UNKNOWN COMMAND: ${command}\n`);
        }
        
        terminalOutput.scrollTop = terminalOutput.scrollHeight;
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
        if(++clickCount === 3) revealJillMessage();
    });

    commandInput.addEventListener('keypress', (e) => {
        if(e.key === 'Enter') {
            processCommand(commandInput.value.trim());
            commandInput.value = '';
            commandInput.focus();
        }
    });
});
