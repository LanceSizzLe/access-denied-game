/* ============================================
   MAIN GAME CONTROLLER - FIXED & ENHANCED
   ============================================ */

const Game = {
    // Game state
    playerBoard: null,
    opponentBoard: null,
    cardManager: null,
    
    // Turn management
    currentRound: 1,
    currentPlayer: 'player',
    currentAction: null,
    selectedCell: null,
    skipNextTurn: false,
    
    // Resources
    actionPoints: 3,
    maxActionPoints: 6,
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
        
        await Utils.sleep(2000);
        
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
        Utils.showNotification('GAME START', 'Select an action, then click enemy grid to execute!', 'success', 5000);
    },
    
    /**
     * Setup initial game state
     */
    setupGame() {
        this.setupPlayerNetwork();
        this.setupOpponentNetwork();
        this.cardManager.drawCards(2);
        UI.updateThreatTrack(this.currentRound);
        this.updateUI();
    },
    
    /**
     * Setup player's network
     */
    setupPlayerNetwork() {
        // Database Server (3 segments)
        this.playerBoard.placeServer('db', [[1, 1], [1, 2], [2, 1]], true);
        
        // Web Server (2 segments)
        this.playerBoard.placeServer('web', [[0, 4], [0, 5]], false);
        
        // Email Server (2 segments)
        this.playerBoard.placeServer('email', [[3, 3], [4, 3]], true);
        
        // Infrastructure Server (2 segments)
        this.playerBoard.placeServer('infra', [[5, 0], [5, 1]], true);
        
        // Firewalls
        this.playerBoard.placeFirewall(1, 0);
        this.playerBoard.placeFirewall(2, 2);
        this.playerBoard.placeFirewall(0, 3);
        this.playerBoard.placeFirewall(4, 2);
        
        // Honeypot
        this.playerBoard.placeHoneypot(2, 4);
        
        Utils.addLog('> Player network configured', 'system');
    },
    
    /**
     * Setup opponent's network
     */
    setupOpponentNetwork() {
        // Database Server
        this.opponentBoard.placeServer('db', [[0, 0], [0, 1], [0, 2]], true);
        
        // Web Server
        this.opponentBoard.placeServer('web', [[2, 5], [3, 5]], true);
        
        // Email Server
        this.opponentBoard.placeServer('email', [[4, 1], [4, 2]], false);
        
        // Infrastructure Server
        this.opponentBoard.placeServer('infra', [[3, 3], [4, 3]], true);
        
        // Firewalls
        this.opponentBoard.placeFirewall(1, 1);
        this.opponentBoard.placeFirewall(2, 4);
        this.opponentBoard.placeFirewall(3, 2);
        this.opponentBoard.placeFirewall(5, 3);
        
        // Honeypot
        this.opponentBoard.placeHoneypot(1, 3);
        
        Utils.addLog('> Opponent network configured', 'system');
    },
    
    /**
     * Start a new turn
     */
    startTurn() {
        if (!this.gameActive) return;
        
        // Check honeypot skip
        if (this.skipNextTurn) {
            Utils.addLog('⚠ TURN SKIPPED - Honeypot penalty', 'error');
            Utils.showNotification('TURN SKIPPED', 'Honeypot penalty active!', 'error', 3000);
            this.skipNextTurn = false;
            setTimeout(() => this.endTurn(), 2000);
            return;
        }
        
        // Gain AP (max 6)
        this.actionPoints = Math.min(this.actionPoints + 1, this.maxActionPoints);
        
        // Draw card if intelligence >= 6
        if (this.intelligence >= 6 && this.cardManager.hand.length < this.cardManager.maxHandSize) {
            const drawn = this.cardManager.drawCards(1);
            if (drawn.length > 0) {
                Utils.addLog(`> Drew card: ${drawn[0].name}`, 'success');
                Utils.showNotification('CARD DRAWN', drawn[0].name, 'success', 2000);
            }
        }
        
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
        Utils.showNotification('INSUFFICIENT AP', `${action.toUpperCase()} requires ${cost} AP (You have ${this.actionPoints})`, 'error');
        Utils.addLog(`✕ Insufficient AP for ${action.toUpperCase()}`, 'error');
        return;
    }
    
    // Set current action
    this.currentAction = action;
    
    // Update UI
    UI.updateActionButtons(this.actionPoints, action);
    
    // Log
    Utils.addLog(`> Action selected: ${action.toUpperCase()} (${cost} AP)`, 'action');
    Utils.showNotification('ACTION SELECTED', `Click ENEMY NETWORK to ${action.toUpperCase()}`, 'info', 4000);
    
    // Visual feedback - highlight enemy grid
    const enemyBoard = document.getElementById('opponent-board');
    enemyBoard.style.boxShadow = '0 0 30px rgba(255, 255, 0, 0.6)';
    enemyBoard.style.borderColor = 'var(--color-caution-yellow)';
    
    console.log(`Action selected: ${action}, currentAction is now: ${this.currentAction}`);
},
```

**CRITICAL:** Notice the comma `,` at the end! Make sure it's there.

---

### FIX 3: Verify All Files Are Saved

Sometimes files don't save properly. Check:
1. All files show **no unsaved indicator** (dot on tab)
2. Refresh browser with **hard refresh**: `Cmd+Shift+R` or `Ctrl+Shift+R`

---

## 🚨 EMERGENCY ROLLBACK

If you can't find the error, revert to the working version by replacing the files you changed with their original versions, then we'll fix them one at a time.

---

## 📸 SEND ME THE CONSOLE ERROR

Once you open the console (F12), you'll see something like:
```
Uncategorized SyntaxError: Unexpected token ','
  at game.js:123
    
/**
 * Execute selected action on target cell
 */
async executeAction(row, col) {
    if (!this.currentAction) {
        Utils.showNotification('NO ACTION', 'Select SCAN, PROBE, or EXPLOIT first!', 'warning');
        console.log('executeAction called but no action selected');
        return;
    }
    
    console.log(`Executing ${this.currentAction} on [${row}, ${col}]`);
    
    const costs = { scan: 1, probe: 2, exploit: 3 };
    const cost = costs[this.currentAction];
    
    // Double check AP
    if (this.actionPoints < cost) {
        Utils.showNotification('INSUFFICIENT AP', 'Not enough Action Points', 'error');
        this.currentAction = null;
        UI.updateActionButtons(this.actionPoints, null);
        return;
    }
    
    // Deduct AP
    this.actionPoints -= cost;
    Utils.addLog(`> Spent ${cost} AP (${this.actionPoints} remaining)`, 'action');
    
    // Remove highlight from enemy grid
    const enemyBoard = document.getElementById('opponent-board');
    enemyBoard.style.boxShadow = '';
    enemyBoard.style.borderColor = '';
    
    // Execute action
    let result;
    const coord = Utils.indexToCoord(row, col);
    
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
    
    console.log('Action executed, result:', result);
    
    // Clear action selection
    this.currentAction = null;
    UI.updateActionButtons(this.actionPoints, null);
    
    // Update UI
    this.updateUI();
    
    // Check victory
    this.checkVictoryConditions();
}
    
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
        
        // Reset action selection
        this.currentAction = null;
        UI.updateActionButtons(this.actionPoints, null);
        
        // Advance round
        this.currentRound++;
        
        // Check round limit
        if (this.currentRound > 12) {
            this.endGameAttrition();
            return;
        }
        
        UI.updateThreatTrack(this.currentRound);
        
        // Start next turn
        setTimeout(() => {
            this.startTurn();
        }, 1000);
    },
    
    /**
     * Update UI
     */
    updateUI() {
        document.getElementById('current-round').textContent = this.currentRound;
        document.getElementById('current-ap').textContent = this.actionPoints;
        document.getElementById('intel-count').textContent = this.intelligence;
        
        const breachedCount = this.opponentBoard.getBreachCount();
        document.getElementById('breach-count').textContent = `${breachedCount}/4`;
        
        UI.updateActionButtons(this.actionPoints, this.currentAction);
    },
    
    /**
     * Check victory conditions
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
    },
    
    /**
     * End game - attrition
     */
    endGameAttrition() {
        const playerBreaches = this.playerBoard.getBreachCount();
        const opponentBreaches = this.opponentBoard.getBreachCount();
        
        if (opponentBreaches < playerBreaches) {
            this.endGame('attrition-opponent');
        } else if (playerBreaches < opponentBreaches) {
            this.endGame('attrition-player');
        } else {
            this.endGame('draw');
        }
    },
    
    /**
     * End game
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
                message = 'You gathered 12 Intelligence Tokens!';
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
                message = 'Your network suffered more breaches';
                type = 'error';
                break;
                
            case 'draw':
                title = '⚖️ STALEMATE';
                message = 'Equal breaches after 12 rounds';
                type = 'warning';
                break;
                
            default:
                title = 'GAME OVER';
                message = 'Game ended';
                type = 'info';
        }
        
        Utils.addLog(`═══ ${title} ═══`, 'system');
        
        const modalContent = `
            <h2>${title}</h2>
            <p style="font-size: 16px; margin: 20px 0;">${message}</p>
            
            <h3>FINAL STATISTICS</h3>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin: 20px 0;">
                <div><strong>Rounds:</strong> ${this.currentRound}</div>
                <div><strong>Intel:</strong> ${this.intelligence}</div>
                <div><strong>Enemy Breaches:</strong> ${this.opponentBoard.getBreachCount()}/4</div>
                <div><strong>Your Breaches:</strong> ${this.playerBoard.getBreachCount()}/4</div>
            </div>
            
            <h3>CONCEPTS PRACTICED</h3>
            <ul style="text-align: left; line-height: 1.8;">
                <li>Network Reconnaissance</li>
                <li>Vulnerability Discovery</li>
                <li>Exploit Execution</li>
                <li>Defense-in-Depth</li>
                <li>Resource Management</li>
            </ul>
            
            <div style="margin-top: 30px; text-align: center;">
                <button onclick="location.reload()" style="padding: 15px 40px; background: var(--color-matrix-green); color: var(--color-black); border: none; font-family: var(--font-mono); font-weight: 700; cursor: pointer; font-size: 16px; letter-spacing: 2px;">
                    PLAY AGAIN
                </button>
            </div>
        `;
        
        setTimeout(() => {
            Utils.showModal(modalContent);
            Utils.showNotification(title, message, type, 0);
        }, 500);
    }
};

// Initialize game
document.addEventListener('DOMContentLoaded', () => {
    console.log('%c ACCESS DENIED! ', 'background: #00FF41; color: #000; font-size: 20px; font-weight: bold; padding: 10px;');
    console.log('%c Beyond the Firewall | CMPG215 ', 'background: #00D9FF; color: #000; font-size: 12px; padding: 5px;');
    
    Game.init();
});
