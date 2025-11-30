/* ============================================
   UI MANAGEMENT
   Interface updates, event handlers
   ============================================ */

const UI = {
    
    /**
     * Initialize UI event handlers
     */
    init() {
        // Action buttons - PREVENT PROPAGATION
        document.getElementById('scan-btn').addEventListener('click', (e) => {
            e.stopPropagation();
            e.preventDefault();
            console.log('SCAN button clicked');
            Game.selectAction('scan');
        });
        
        document.getElementById('probe-btn').addEventListener('click', (e) => {
            e.stopPropagation();
            e.preventDefault();
            console.log('PROBE button clicked');
            Game.selectAction('probe');
        });
        
        document.getElementById('exploit-btn').addEventListener('click', (e) => {
            e.stopPropagation();
            e.preventDefault();
            console.log('EXPLOIT button clicked');
            Game.selectAction('exploit');
        });
        
        // Footer buttons
        document.getElementById('end-turn-btn').addEventListener('click', (e) => {
            e.stopPropagation();
            Game.endTurn();
        });
        
        document.getElementById('reset-btn').addEventListener('click', (e) => {
            e.stopPropagation();
            if (confirm('Reset the game? All progress will be lost.')) {
                location.reload();
            }
        });
        
        document.getElementById('help-btn').addEventListener('click', (e) => {
            e.stopPropagation();
            this.showHelpModal();
        });
        
        document.getElementById('rules-btn').addEventListener('click', (e) => {
            e.stopPropagation();
            this.showRulesModal();
        });
    },
    
    /**
     * Update action button states
     */
    updateActionButtons(currentAP, selectedAction) {
        const scanBtn = document.getElementById('scan-btn');
        const probeBtn = document.getElementById('probe-btn');
        const exploitBtn = document.getElementById('exploit-btn');
        
        // Remove all selected states
        [scanBtn, probeBtn, exploitBtn].forEach(btn => {
            btn.classList.remove('selected');
        });
        
        // Disable buttons if not enough AP
        scanBtn.classList.toggle('disabled', currentAP < 1);
        probeBtn.classList.toggle('disabled', currentAP < 2);
        exploitBtn.classList.toggle('disabled', currentAP < 3);
        
        // Highlight selected action
        if (selectedAction === 'scan') scanBtn.classList.add('selected');
        if (selectedAction === 'probe') probeBtn.classList.add('selected');
        if (selectedAction === 'exploit') exploitBtn.classList.add('selected');
    },
    
    /**
     * Update threat track
     */
    updateThreatTrack(currentRound) {
        const trackContainer = document.getElementById('threat-track');
        trackContainer.innerHTML = '';
        
        for (let i = 1; i <= 12; i++) {
            const segment = document.createElement('div');
            segment.className = 'track-segment';
            segment.textContent = i;
            
            if (i < currentRound) {
                segment.classList.add('active');
            }
            if (i === currentRound) {
                segment.classList.add('current');
            }
            
            trackContainer.appendChild(segment);
        }
    },
    
    /**
     * Show help modal
     */
showHelpModal: function() {
    const content = `
        <h2>HOW TO PLAY</h2>
        <p><strong>OBJECTIVE:</strong> Breach 3 of your opponent's 4 servers.</p>
        
        <div style="text-align: center; margin: 20px 0;">
            <button onclick="Tutorial.start()" style="padding: 12px 24px; background: var(--color-cyber-cyan); color: var(--color-black); border: none; cursor: pointer; font-family: var(--font-mono); font-weight: 700; font-size: 14px; margin: 0 10px;">
                🎓 START TUTORIAL
            </button>
            <button onclick="document.getElementById('modal-overlay').classList.add('hidden')" style="padding: 12px 24px; background: var(--color-matrix-green); color: var(--color-black); border: none; cursor: pointer; font-family: var(--font-mono); font-weight: 700; font-size: 14px; margin: 0 10px;">
                CLOSE
            </button>
        </div>
        
        <h3>ACTIONS</h3>
        <p><strong>SCAN (1 AP):</strong> Detect if a server exists.</p>
        <p><strong>PROBE (2 AP):</strong> Reveal server type.</p>
        <p><strong>EXPLOIT (3 AP):</strong> Breach vulnerable servers.</p>
        
        <h3>VICTORY CONDITIONS</h3>
        <ul>
            <li>Breach 3 of 4 enemy servers</li>
            <li>Accumulate 12 Intelligence</li>
            <li>Survive to Round 12</li>
        </ul>
    `;
    
    Utils.showModal(content);
},
    
    /**
     * Show rules modal
     */
    showRulesModal() {
        const content = `
            <h2>GAME RULES</h2>
            
            <h3>SETUP</h3>
            <p>Each player has a 6×6 grid with:</p>
            <ul>
                <li>4 Servers (Database, Web, Email, Infrastructure)</li>
                <li>4 Vulnerability markers (placed under servers)</li>
                <li>4 Firewalls (placed between grid squares)</li>
                <li>1 Honeypot (placed on empty square)</li>
            </ul>
            
            <h3>TURN STRUCTURE</h3>
            <ol>
                <li><strong>Refresh:</strong> Gain +1 AP, advance threat track</li>
                <li><strong>Planning:</strong> Select one action (Scan/Probe/Exploit)</li>
                <li><strong>Execution:</strong> Perform action on enemy grid</li>
                <li><strong>Reaction:</strong> Defender may play Tool Cards</li>
                <li><strong>Maintenance:</strong> Update game state, check victory</li>
            </ol>
            
            <h3>SERVER TYPES</h3>
            <p><strong>Database (3 segments):</strong> Harder to breach, high value</p>
            <p><strong>Web, Email, Infrastructure (2 segments each):</strong> Standard targets</p>
            
            <h3>TOOL CARDS</h3>
            <p>Draw 1 card per turn when Intelligence ≥ 6. Max hand size: 4 cards.</p>
            
            <h3>EDUCATIONAL VALUE</h3>
            <p>This game teaches network security, vulnerability management, and defense-in-depth strategies aligned with CyBOK framework.</p>
        `;
        
        Utils.showModal(content);
    }
};
