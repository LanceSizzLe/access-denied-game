/* ============================================
   GAME ACTIONS
   Scan, Probe, Exploit logic
   ============================================ */

const Actions = {
    
    /**
     * Execute SCAN action
     */
    async executeScan(opponentBoard, row, col) {
        Utils.addLog(`> SCANNING ${Utils.indexToCoord(row, col)}...`, 'scan');
        await Utils.sleep(500);
        
        const result = opponentBoard.scan(row, col);
        
        opponentBoard.markScanned(row, col);
        
        if (result.result === 'server') {
            Utils.addLog(`✓ ${result.message}`, 'success');
            Game.intelligence++;
            Game.updateUI();
            Utils.showNotification('SCAN SUCCESSFUL', result.message, 'success');
        } else if (result.result === 'firewall') {
            Utils.addLog(`! ${result.message}`, 'warning');
            Utils.showNotification('FIREWALL DETECTED', result.message, 'warning');
        } else if (result.result === 'unknown') {
            Utils.addLog(`? ${result.message}`, 'warning');
            Utils.showNotification('UNKNOWN SIGNAL', result.message, 'warning');
        } else {
            Utils.addLog(`○ ${result.message}`, 'scan');
        }
        
        Utils.playSound('scan');
        return result;
    },
    
    /**
     * Execute PROBE action
     */
    async executeProbe(opponentBoard, row, col) {
        Utils.addLog(`> PROBING ${Utils.indexToCoord(row, col)}...`, 'probe');
        await Utils.sleep(700);
        
        const result = opponentBoard.probe(row, col);
        
        if (result.result === 'hit') {
            opponentBoard.markProbed(row, col, result.serverType);
            Utils.addLog(`✓ ${result.message}`, 'success');
            Utils.showNotification('SERVER LOCATED', result.message, 'success');
            Utils.playSound('probe-hit');
        } else if (result.result === 'honeypot') {
            Utils.addLog(`⚠ ${result.message}`, 'error');
            Utils.showNotification('HONEYPOT!', result.message, 'error', 4000);
            Utils.playSound('honeypot');
            
            // Check for defensive victory
            if (result.triggered >= 2) {
                Game.endGame('defender');
                return result;
            }
            
            // Lose next turn
            Game.skipNextTurn = true;
        } else if (result.result === 'firewall-block') {
            Utils.addLog(`▓ ${result.message}`, 'warning');
            Utils.showNotification('BLOCKED', result.message, 'warning');
            Utils.playSound('firewall-block');
        } else if (result.result === 'firewall-destroyed') {
            Utils.addLog(`✓ ${result.message}`, 'success');
            Utils.showNotification('FIREWALL DOWN', result.message, 'success');
            Utils.playSound('firewall-destroyed');
        } else {
            Utils.addLog(`✕ ${result.message}`, 'probe');
        }
        
        return result;
    },
    
    /**
     * Execute EXPLOIT action
     */
    async executeExploit(opponentBoard, row, col) {
        Utils.addLog(`> EXPLOITING ${Utils.indexToCoord(row, col)}...`, 'exploit');
        await Utils.sleep(1000);
        
        const result = opponentBoard.exploit(row, col);
        
        if (result.result === 'success') {
            opponentBoard.markBreached(row, col);
            Utils.addLog(`✓ ${result.message}`, 'success');
            Utils.showNotification('BREACH SUCCESSFUL', result.message, 'success');
            Utils.playSound('breach');
            
            // Update breach count
            Game.updateUI();
            
            // Check victory
            if (result.fullyBreached) {
                const breachedCount = opponentBoard.getBreachCount();
                if (breachedCount >= 3) {
                    Game.endGame('attacker');
                }
            }
        } else if (result.result === 'hardened') {
            Utils.addLog(`✕ ${result.message}`, 'error');
            Utils.showNotification('EXPLOIT FAILED', result.message, 'error');
            Utils.playSound('exploit-fail');
        } else {
            Utils.addLog(`✕ ${result.message}`, 'error');
        }
        
        return result;
    }
};
