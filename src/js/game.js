/* ============================================
   MAIN GAME CONTROLLER
   Game state, initialization, flow control
   ============================================ */

const Game = {
    // Game state
    playerBoard: null,
    opponentBoard: null,
    cardManager: null,
    
    // Turn management
    currentRound: 1,
    currentPlayer: 'player', // 'player' or 'opponent'
    currentAction: null,
    selectedCell: null,
    skipNextTurn: false,
    
    // Resources
    actionPoints: 3,
    intelligence: 0,
    
    // Game status
    gameActive: false,
    winner: null,
    
    /**
     * Initialize the game
     */
    async init() {
        console.log('🎮 Initializing ACCESS DENIED!...');
        
        // Show loading screen
        const loadingScreen = document.getElementById('loading-screen');
        const gameContainer = document.getElementById('game-container');
        
        await Utils.sleep(2000); // Simulate loading
        
        // Hide loading, show game
        loadingScreen.style.animation = 'fadeOut 0.5s ease';
        setTimeout(() => {
            loadingScreen.classList.add('hidden');
            gameContainer.classList.remove('hidden');
        }, 500);
        
        // Initialize boards
        this.playerBoard = new Board('player-grid', false);
        this.opponentBoard = new Board('opponent-grid', true);
        
        // Initialize card manager
        this.cardManager = new CardManager();
        
        // Setup game
        this.setupGame();
        
        // Initialize UI handlers
        UI.init();
        
        // Start game
        this.gameActive = true;
        this.startTurn();
        
        Utils.addLog('> SYSTEM INITIALIZED', 'system');
        Utils.addLog('> GAME START', 'system');
        Utils.showNotification('GAME START', 'Build your network and breach your opponent!', 'success', 4000);
    },
    
    /**
     * Setup initial game state
     */
    setupGame() {
        // Setup player's network
        this.setupPlayerNetwork();
        
        // Setup opponent's network (AI/hidden)
        this.setupOpponentNetwork();
        
        // Draw initial cards
        this.cardManager.drawCards(2);
        
        // Initialize threat track
        UI.updateThreatTrack(this.currentRound);
        
        // Update UI
        this.updateUI();
    },
    
    /**
     * Setup player's network (for demo - in real game, player would place these)
     */
    setupPlayerNetwork() {
        // Database Server (3 segments) - L-shaped
        this.playerBoard.placeServer('db', [[1, 1], [1, 2], [2, 1]], true);
        
        // Web Server (2 segments) - horizontal
        this.playerBoard.placeServer('web', [[0, 4], [0, 5]], false);
        
        // Email Server (2 segments) - vertical
        this.playerBoard.placeServer('email', [[3, 3], [4, 3]], true);
        
        // Infrastructure Server (2 segments) - horizontal
        this.playerBoard.placeServer('infra', [[5, 0], [5, 1]], true);
        
        // Place firewalls
        this.playerBoard.placeFirewall(1, 0); // Protecting DB
        this.playerBoard.placeFirewall(2, 2); // Protecting DB
        this.playerBoard.placeFirewall(0, 3); // Protecting Web
        this.playerBoard.placeFirewall(4, 2); // Protecting Email
        
        // Place honeypot
        this.playerBoard.placeHoneypot(2, 4);
        
        Utils.addLog('> Player network configured', 'system');
    },
    
    /**
     * Setup opponent's network (hidden)
     */
    setupOpponentNetwork() {
        // For demo purposes, create a predefined opponent network
        // In a real game with AI, this would be randomized or strategic
        
        // Database Server (3 segments) - straight
        this.opponentBoard.placeServer('db', [[0, 0], [0, 1], [0, 2]], true);
        
        // Web Server (2 segments) - vertical
        this.opponentBoard.placeServer('web', [[2, 5], [3, 5]], true);
        
        // Email Server (2 segments) - horizontal
        this.opponentBoard.placeServer('email', [[4, 1], [4, 2]], false);
        
        // Infrastructure Server (2 segments) - vertical
        this.opponentBoard.placeServer('infra', [[3, 3], [4, 3]], true);
        
        // Place firewalls
        this.opponentBoard.placeFirewall(1, 1);
        this.opponentBoard.placeFirewall(2, 4);
        this.opponentBoard.placeFirewall(3, 2);
        this.opponentBoard.placeFirewall(5, 3);
        
        // Place honeypot
        this.opponentBoard.placeHoneypot(1, 3);
        
        Utils.addLog('> Opponent network configured', 'system');
    },
    
    /**
     * Start a new turn
     */
    startTurn() {
        if (!this.gameActive) return;
        
        // Check if turn should be skipped (honeypot penalty)
        if (this.skipNextTurn) {
            Utils.addLog('⚠ TURN SKIPPED - Honeypot penalty', 'error');
            Utils.showNotification('TURN SKIPPED', 'Honeypot penalty - lose this turn', 'error', 3000);
            this.skipNextTurn = false;
            this.endTurn();
            return;
        }
        
        // Gain AP
        this.actionPoints = Math.min(this.actionPoints + 1, 6);
        
        // Draw card if intelligence >= 6
        if (this.intelligence >= 6) {
            this.cardManager.drawCards(1);
        }
        
        // Update UI
        this.updateUI();
        
        Utils.addLog(`═══ ROUND ${this.currentRound} START ═══`, 'system');
        Utils.addLog(`> AP: ${this.actionPoints} | Intel: ${this.intelligence}`, 'system');
    },
    
    /**
     * Select an action
     */
    selectAction(action) {
        const costs = { scan: 1, probe: 2, exploit: 3 };
        const cost = costs[action];
        
        if (this.actionPoints < cost) {
            Utils.showNotification('INSUFFICIENT AP', `${action.toUpperCase()} requires ${cost} AP`, 'error');
            return;
        }
        
        this.currentAction = action;
        UI.updateActionButtons(this.actionPoints, action);
        
        Utils.addLog(`> Action selected: ${action.toUpperCase()}`, 'action');
        Utils.showNotification('ACTION SELECTED', `Click enemy grid to ${action.toUpperCase()}`, 'info');
    },
    
    /**
     * Execute selected action on target cell
     */
    async executeAction(row, col) {
        if (!this.currentAction) {
            Utils.showNotification('NO ACTION', 'Select an action first (SCAN/PROBE/EXPLOIT)', 'warning');
            return;
        }
        
        const costs = { scan: 1, probe: 2, exploit: 3 };
        const cost = costs[this.currentAction];
        
        if (this.actionPoints < cost) {
            Utils.showNotification('INSUFFICIENT AP', 'Not enough Action Points', 'error');
            return;
        }
        
        // Deduct AP
        this.actionPoints -= cost;
        
        // Execute action
        let result;
        switch (this.currentAction) {
            case 'scan':
                result = await Actions.executeScan(this.opponentBoard, row, col);
                break;
            case 'probe':
                result = await Actions.executeProbe(this.opponentBoard, row, col);
                break;
            case 'exploit':
                result = await Actions.executeExploit(this.opponentBoard, row, col);
                break;
        }
        
        // Clear action selection
        this.currentAction = null;
        
        // Update UI
        this.updateUI();
        
        // Check victory conditions
        this.checkVictoryConditions();
    },
    
    /**
     * End current turn
     */
    endTurn() {
        if (this.actionPoints > 0) {
            if (!confirm(`You have ${this.actionPoints} AP remaining. End turn anyway?`)) {
                return;
            }
        }
        
        Utils.addLog(`═══ ROUND ${this.currentRound} END ═══`, 'system');
        
        // Advance round
        this.currentRound++;
        
        // Check round limit (12 rounds)
        if (this.currentRound > 12) {
            this.endGameAttrition();
            return;
        }
        
        // Update threat track
        UI.updateThreatTrack(this.currentRound);
        
        // In a real game, opponent would take their turn here
        // For this prototype, we'll just start the next player turn
        setTimeout(() => {
            this.startTurn();
        }, 500);
    },
    
    /**
     * Update UI elements
     */
    updateUI() {
        // Update status bar
        document.getElementById('current-round').textContent = this.currentRound;
        document.getElementById('current-ap').textContent = this.actionPoints;
        document.getElementById('intel-count').textContent = this.intelligence;
        
        const breachedCount = this.opponentBoard.getBreachCount();
        document.getElementById('breach-count').textContent = `${breachedCount}/4`;
        
        // Update action buttons
        UI.updateActionButtons(this.actionPoints, this.currentAction);
    },
    
    /**
     * Check all victory conditions
     */
    checkVictoryConditions() {
        // Offensive victory (3+ servers breached)
        const breachedCount = this.opponentBoard.getBreachCount();
        if (breachedCount >= 3) {
            this.endGame('attacker');
            return;
        }
        
        // Intelligence victory (12 intel)
        if (this.intelligence >= 12) {
            this.endGame('intelligence');
            return;
        }
        
        // Defensive victory checked in honeypot trigger
        // Attrition victory checked in endTurn
    },
    
    /**
     * End game due to attrition (round 12)
     */
    endGameAttrition() {
        const playerBreaches = this.playerBoard.getBreachCount();
        const opponentBreaches = this.opponentBoard.getBreachCount();
        
        if (opponentBreaches < playerBreaches) {
            this.endGame('attrition-player');
        } else if (playerBreaches < opponentBreaches) {
            this.endGame('attrition-opponent');
        } else {
            this.endGame('draw');
        }
    },
    
    /**
     * End the game
     */
    endGame(reason) {
        this.gameActive = false;
        
        let title, message, type;
        
        switch (reason) {
            case 'attacker':
                title = '🎯 OFFENSIVE VICTORY!';
                message = 'You successfully breached 3 enemy servers!';
                type = 'success';
                break;
                
            case 'intelligence':
                title = '🔍 INTELLIGENCE VICTORY!';
                message = 'You gathered 12 Intelligence Tokens through reconnaissance!';
                type = 'success';
                break;
                
            case 'defender':
                title = '🎭 DEFENSIVE VICTORY!';
                message = 'Enemy triggered your honeypot twice!';
                type = 'success';
                break;
                
            case 'attrition-player':
                title = '⏰ ATTRITION VICTORY!';
                message = 'You survived 12 rounds with fewer breaches!';
                type = 'success';
                break;
                
            case 'attrition-opponent':
                title = '💀 DEFEAT';
                message = 'Your network suffered more breaches by round 12';
                type = 'error';
                break;
                
            case 'draw':
                title = '⚖️ STALEMATE';
                message = 'Both networks equally compromised after 12 rounds';
                type = 'warning';
                break;
                
            default:
                title = 'GAME OVER';
                message = 'Game ended';
                type = 'info';
        }
        
        Utils.addLog(`═══ GAME OVER: ${title} ═══`, 'system');
        
        // Show victory modal
        const modalContent = `
            <h2>${title}</h2>
            <p>${message}</p>
            
            <h3>FINAL STATISTICS</h3>
            <p><strong>Rounds Played:</strong> ${this.currentRound}</p>
            <p><strong>Intelligence Gathered:</strong> ${this.intelligence}</p>
            <p><strong>Enemy Servers Breached:</strong> ${this.opponentBoard.getBreachCount()}/4</p>
            <p><strong>Your Servers Breached:</strong> ${this.playerBoard.getBreachCount()}/4</p>
            
            <h3>EDUCATIONAL CONCEPTS PRACTICED</h3>
            <ul>
                <li>Network Reconnaissance (Scanning)</li>
                <li>Vulnerability Discovery (Probing)</li>
                <li>Exploit Execution (Breaching)</li>
                <li>Defense-in-Depth (Firewalls & Honeypots)</li>
                <li>Resource Management (Action Points)</li>
                <li>Risk Assessment (Honeypot Avoidance)</li>
            </ul>
            
            <div style="margin-top: 20px; padding: 15px; border: 2px solid var(--color-matrix-green); background: rgba(0,255,65,0.1);">
                <strong>CyBOK ALIGNMENT:</strong><br>
                This game reinforced concepts from Network Security, Vulnerability Management, and Operational Security domains.
            </div>
            
            <button onclick="location.reload()" style="margin-top: 20px; padding: 10px 20px; background: var(--color-matrix-green); color: var(--color-black); border: none; font-family: var(--font-mono); font-weight: 700; cursor: pointer; font-size: 14px;">
                PLAY AGAIN
            </button>
        `;
        
        Utils.showModal(modalContent);
        Utils.showNotification(title, message, type, 0); // No auto-dismiss
    }
};

// Initialize game when page loads
document.addEventListener('DOMContentLoaded', () => {
    console.log(`
    ╔═══════════════════════════════════════╗
    ║                                       ║
    ║       ACCESS DENIED!                  ║
    ║       Beyond the Firewall             ║
    ║                                       ║
    ║   Cybersecurity Educational Game      ║
    ║   North-West University               ║
    ║   CMPG215 | CyBOK Aligned            ║
    ║                                       ║
    ╚═══════════════════════════════════════╝
    `);
    
    Game.init();
});
