/* ============================================
   MAIN GAME CONTROLLER - FIXED WITH TITLE SCREEN
   ============================================ */

const Game = {
    playerBoard: null,
    opponentBoard: null,
    cardManager: null,
    
    currentRound: 1,
    currentPlayer: 'player',
    currentAction: null,
    selectedCell: null,
    skipNextTurn: false,
    
    actionPoints: 3,
    maxActionPoints: 6,
    intelligence: 0,
    
    gameActive: false,
    winner: null,
    
    init: async function() {
        console.log('🎮 Initializing ACCESS DENIED!...');
        
        const loadingScreen = document.getElementById('loading-screen');
        const gameContainer = document.getElementById('game-container');
        
        await Utils.sleep(2000);
        
        loadingScreen.style.animation = 'fadeOut 0.5s ease';
        setTimeout(function() {
            loadingScreen.classList.add('hidden');
            gameContainer.classList.remove('hidden');
        }, 500);
        
        this.playerBoard = new Board('player-grid', false);
        this.opponentBoard = new Board('opponent-grid', true);
        this.cardManager = new CardManager();
        
        this.setupGame();
        UI.init();
        
        this.gameActive = true;
        this.startTurn();
        
        Utils.addLog('> SYSTEM INITIALIZED', 'system');
        Utils.addLog('> GAME START', 'system');
        Utils.showNotification('GAME START', 'Select action, then click enemy grid!', 'success', 5000);
    },
    
    setupGame: function() {
        this.setupPlayerNetwork();
        this.setupOpponentNetwork();
        this.cardManager.drawCards(2);
        UI.updateThreatTrack(this.currentRound);
        this.updateUI();
    },
    
    setupPlayerNetwork: function() {
        this.playerBoard.placeServer('db', [[1, 1], [1, 2], [2, 1]], true);
        this.playerBoard.placeServer('web', [[0, 4], [0, 5]], false);
        this.playerBoard.placeServer('email', [[3, 3], [4, 3]], true);
        this.playerBoard.placeServer('infra', [[5, 0], [5, 1]], true);
        
        this.playerBoard.placeFirewall(1, 0);
        this.playerBoard.placeFirewall(2, 2);
        this.playerBoard.placeFirewall(0, 3);
        this.playerBoard.placeFirewall(4, 2);
        
        this.playerBoard.placeHoneypot(2, 4);
        
        Utils.addLog('> Player network configured', 'system');
    },
    
    setupOpponentNetwork: function() {
        this.opponentBoard.placeServer('db', [[0, 0], [0, 1], [0, 2]], true);
        this.opponentBoard.placeServer('web', [[2, 5], [3, 5]], true);
        this.opponentBoard.placeServer('email', [[4, 1], [4, 2]], false);
        this.opponentBoard.placeServer('infra', [[3, 3], [4, 3]], true);
        
        this.opponentBoard.placeFirewall(1, 1);
        this.opponentBoard.placeFirewall(2, 4);
        this.opponentBoard.placeFirewall(3, 2);
        this.opponentBoard.placeFirewall(5, 3);
        
        this.opponentBoard.placeHoneypot(1, 3);
        
        Utils.addLog('> Opponent network configured', 'system');
    },
    
    startTurn: function() {
        if (!this.gameActive) return;
        
        if (this.skipNextTurn) {
            Utils.addLog('⚠ TURN SKIPPED - Honeypot penalty', 'error');
            Utils.showNotification('TURN SKIPPED', 'Honeypot penalty!', 'error', 3000);
            this.skipNextTurn = false;
            const self = this;
            setTimeout(function() { self.endTurn(); }, 2000);
            return;
        }
        
        this.actionPoints = Math.min(this.actionPoints + 1, this.maxActionPoints);
        
        if (this.intelligence >= 6 && this.cardManager.hand.length < this.cardManager.maxHandSize) {
            const drawn = this.cardManager.drawCards(1);
            if (drawn.length > 0) {
                Utils.addLog('> Drew card: ' + drawn[0].name, 'success');
            }
        }
        
        this.updateUI();
        
        Utils.addLog('═══ ROUND ' + this.currentRound + ' START ═══', 'system');
        Utils.addLog('> AP: ' + this.actionPoints + ' | Intel: ' + this.intelligence, 'system');
    },
    
    selectAction: function(action) {
        const costs = { scan: 1, probe: 2, exploit: 3 };
        const cost = costs[action];
        
        if (this.actionPoints < cost) {
            Utils.showNotification('INSUFFICIENT AP', 'Need ' + cost + ' AP', 'error');
            return;
        }
        
        this.currentAction = action;
        UI.updateActionButtons(this.actionPoints, action);
        
        Utils.addLog('> Action selected: ' + action.toUpperCase(), 'action');
        Utils.showNotification('ACTION SELECTED', 'Click enemy grid to ' + action.toUpperCase(), 'info', 4000);
        
        const enemyBoard = document.getElementById('opponent-board');
        enemyBoard.style.boxShadow = '0 0 30px rgba(255, 255, 0, 0.6)';
        
        console.log('Action selected: ' + action);
    },
    
    executeAction: async function(row, col) {
        if (!this.currentAction) {
            Utils.showNotification('NO ACTION', 'Select action first!', 'warning');
            return;
        }
        
        const costs = { scan: 1, probe: 2, exploit: 3 };
        const cost = costs[this.currentAction];
        
        this.actionPoints -= cost;
        Utils.addLog('> Spent ' + cost + ' AP', 'action');
        
        const enemyBoard = document.getElementById('opponent-board');
        enemyBoard.style.boxShadow = '';
        
        let result;
        const actionType = this.currentAction;
        
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
        
        this.currentAction = null;
        UI.updateActionButtons(this.actionPoints, null);
        this.updateUI();
        this.checkVictoryConditions();
        
        // Notify tutorial if active
        if (typeof Tutorial !== 'undefined' && Tutorial.active) {
            Tutorial.actionCompleted(actionType);
        }
    },
    
    endTurn: function() {
        if (this.actionPoints > 0) {
            if (!confirm(this.actionPoints + ' AP remaining. End turn?')) {
                return;
            }
        }
        
        Utils.addLog('═══ ROUND ' + this.currentRound + ' END ═══', 'system');
        
        this.currentAction = null;
        UI.updateActionButtons(this.actionPoints, null);
        
        this.currentRound++;
        
        if (this.currentRound > 12) {
            this.endGameAttrition();
            return;
        }
        
        UI.updateThreatTrack(this.currentRound);
        
        const self = this;
        setTimeout(function() {
            self.startTurn();
        }, 1000);
    },
    
    updateUI: function() {
        document.getElementById('current-round').textContent = this.currentRound;
        document.getElementById('current-ap').textContent = this.actionPoints;
        document.getElementById('intel-count').textContent = this.intelligence;
        
        const breachedCount = this.opponentBoard.getBreachCount();
        document.getElementById('breach-count').textContent = breachedCount + '/4';
        
        UI.updateActionButtons(this.actionPoints, this.currentAction);
    },
    
    checkVictoryConditions: function() {
        const breachedCount = this.opponentBoard.getBreachCount();
        if (breachedCount >= 3) {
            this.endGame('attacker');
            return;
        }
        
        if (this.intelligence >= 12) {
            this.endGame('intelligence');
            return;
        }
    },
    
    endGameAttrition: function() {
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
    
    endGame: function(reason) {
        this.gameActive = false;
        
        let title = '';
        let message = '';
        
        if (reason === 'attacker') {
            title = 'VICTORY!';
            message = 'You breached 3 enemy servers!';
        } else if (reason === 'intelligence') {
            title = 'VICTORY!';
            message = 'You gathered 12 Intelligence!';
        } else if (reason === 'defender') {
            title = 'VICTORY!';
            message = 'Enemy triggered honeypot twice!';
        } else if (reason === 'attrition-player') {
            title = 'VICTORY!';
            message = 'Survived with fewer breaches!';
        } else if (reason === 'attrition-opponent') {
            title = 'DEFEAT';
            message = 'Network suffered more breaches';
        } else {
            title = 'STALEMATE';
            message = 'Equal breaches after 12 rounds';
        }
        
        Utils.addLog('═══ ' + title + ' ═══', 'system');
        
        const modalContent = '<h2>' + title + '</h2>' +
            '<p style="font-size: 16px; margin: 20px 0;">' + message + '</p>' +
            '<h3>FINAL STATISTICS</h3>' +
            '<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin: 20px 0;">' +
            '<div><strong>Rounds:</strong> ' + this.currentRound + '</div>' +
            '<div><strong>Intel:</strong> ' + this.intelligence + '</div>' +
            '<div><strong>Enemy Breaches:</strong> ' + this.opponentBoard.getBreachCount() + '/4</div>' +
            '<div><strong>Your Breaches:</strong> ' + this.playerBoard.getBreachCount() + '/4</div>' +
            '</div>' +
            '<h3>CONCEPTS PRACTICED</h3>' +
            '<ul style="text-align: left; line-height: 1.8;">' +
            '<li>Network Reconnaissance</li>' +
            '<li>Vulnerability Discovery</li>' +
            '<li>Exploit Execution</li>' +
            '<li>Defense-in-Depth</li>' +
            '</ul>' +
            '<div style="margin-top: 30px; text-align: center;">' +
            '<button onclick="location.reload()" style="padding: 15px 40px; background: var(--color-matrix-green); color: var(--color-black); border: none; cursor: pointer; font-family: var(--font-mono); font-weight: 700; font-size: 16px;">PLAY AGAIN</button>' +
            '</div>';
        
        setTimeout(function() {
            Utils.showModal(modalContent);
        }, 500);
    }
};

// Initialize game when page loads
document.addEventListener('DOMContentLoaded', function() {
    console.log('%c ACCESS DENIED! ', 'background: #00FF41; color: #000; font-size: 20px; font-weight: bold; padding: 10px;');
    console.log('%c Beyond the Firewall | CMPG215 ', 'background: #00D9FF; color: #000; font-size: 12px; padding: 5px;');
    
    // Check if TitleScreen exists (tutorial/title screen files loaded)
    if (typeof TitleScreen !== 'undefined') {
        // Show title screen
        TitleScreen.show();
    } else {
        // Fallback: start game directly (for testing without title screen)
        Game.init();
    }
});
