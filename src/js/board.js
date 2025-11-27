/* ============================================
   BOARD MANAGEMENT
   Grid creation, state management, rendering
   ============================================ */

class Board {
    constructor(gridId, isOpponent = false) {
        this.gridId = gridId;
        this.isOpponent = isOpponent;
        this.grid = Array(6).fill(null).map(() => Array(6).fill(null));
        this.servers = [];
        this.vulnerabilities = [];
        this.firewalls = [];
        this.honeypot = null;
        this.selectedCell = null;
        
        this.initializeGrid();
    }
    
    /**
     * Initialize the grid structure
     */
    initializeGrid() {
        const container = document.getElementById(this.gridId);
        container.innerHTML = '';
        
        // Corner cell
        const corner = document.createElement('div');
        corner.className = 'grid-label corner';
        container.appendChild(corner);
        
        // Column labels (1-6)
        for (let col = 1; col <= 6; col++) {
            const label = document.createElement('div');
            label.className = 'grid-label';
            label.textContent = col;
            container.appendChild(label);
        }
        
        // Rows with labels
        for (let row = 0; row < 6; row++) {
            // Row label (A-F)
            const label = document.createElement('div');
            label.className = 'grid-label';
            label.textContent = String.fromCharCode(65 + row);
            container.appendChild(label);
            
            // Grid cells
            for (let col = 0; col < 6; col++) {
                const cell = document.createElement('div');
                cell.className = 'grid-cell';
                cell.dataset.row = row;
                cell.dataset.col = col;
                cell.dataset.coord = Utils.indexToCoord(row, col);
                
                // Add click handler
                cell.addEventListener('click', () => this.handleCellClick(row, col));
                
                container.appendChild(cell);
            }
        }
    }
    
    /**
     * Handle cell click
     */
    handleCellClick(row, col) {
        if (this.isOpponent && Game.currentAction) {
            Game.executeAction(row, col);
        } else if (!this.isOpponent) {
            this.selectCell(row, col);
        }
    }
    
    /**
     * Select a cell
     */
    selectCell(row, col) {
        // Clear previous selection
        document.querySelectorAll(`#${this.gridId} .grid-cell.selected`)
            .forEach(cell => cell.classList.remove('selected'));
        
        this.selectedCell = { row, col };
        
        const cell = this.getCell(row, col);
        if (cell) {
            cell.classList.add('selected');
        }
    }
    
    /**
     * Get cell element
     */
    getCell(row, col) {
        return document.querySelector(`#${this.gridId} [data-row="${row}"][data-col="${col}"]`);
    }
    
    /**
     * Place server on grid
     */
    placeServer(type, positions, hasVulnerability = false) {
        const server = {
            id: Utils.generateId(),
            type: type,
            positions: positions,
            vulnerable: hasVulnerability,
            breached: Array(positions.length).fill(false),
            revealed: false
        };
        
        this.servers.push(server);
        
        // Mark grid cells
        positions.forEach(([row, col]) => {
            this.grid[row][col] = {
                type: 'server',
                serverId: server.id,
                serverType: type,
                vulnerable: hasVulnerability
            };
        });
        
        this.renderGrid();
        return server;
    }
    
    /**
     * Place firewall
     */
    placeFirewall(row, col) {
        const firewall = {
            id: Utils.generateId(),
            row: row,
            col: col,
            durability: 2
        };
        
        this.firewalls.push(firewall);
        this.grid[row][col] = {
            type: 'firewall',
            firewallId: firewall.id
        };
        
        this.renderGrid();
        return firewall;
    }
    
    /**
     * Place honeypot
     */
    placeHoneypot(row, col) {
        this.honeypot = {
            row: row,
            col: col,
            triggered: 0
        };
        
        this.grid[row][col] = {
            type: 'honeypot'
        };
        
        this.renderGrid();
    }
    
    /**
     * Scan a cell (returns information without revealing)
     */
    scan(row, col) {
        const cellData = this.grid[row][col];
        
        if (!cellData) {
            return { result: 'empty', message: 'No assets detected' };
        }
        
        if (cellData.type === 'server') {
            return { result: 'server', message: 'Server detected' };
        }
        
        if (cellData.type === 'firewall') {
            return { result: 'firewall', message: 'Firewall detected' };
        }
        
        if (cellData.type === 'honeypot') {
            return { result: 'unknown', message: 'Unknown signal detected' };
        }
        
        return { result: 'empty', message: 'No assets detected' };
    }
    
    /**
     * Probe a cell (reveals type)
     */
    probe(row, col) {
        const cellData = this.grid[row][col];
        
        if (!cellData) {
            return { result: 'miss', message: 'Probe failed - no target' };
        }
        
        if (cellData.type === 'firewall') {
            const firewall = this.firewalls.find(f => f.id === cellData.firewallId);
            if (firewall) {
                firewall.durability--;
                if (firewall.durability <= 0) {
                    this.removeFirewall(firewall.id);
                    return { result: 'firewall-destroyed', message: 'Firewall destroyed!' };
                }
                return { result: 'firewall-block', message: 'Attack blocked by firewall' };
            }
        }
        
        if (cellData.type === 'honeypot') {
            this.honeypot.triggered++;
            return { 
                result: 'honeypot', 
                message: 'HONEYPOT TRIGGERED!', 
                triggered: this.honeypot.triggered 
            };
        }
        
        if (cellData.type === 'server') {
            const server = this.servers.find(s => s.id === cellData.serverId);
            if (server) {
                server.revealed = true;
                return { 
                    result: 'hit', 
                    message: `Server hit: ${this.getServerTypeName(server.type)}`,
                    serverType: server.type,
                    serverId: server.id
                };
            }
        }
        
        return { result: 'miss', message: 'Probe failed' };
    }
    
    /**
     * Exploit a cell (attempt to breach)
     */
    exploit(row, col) {
        const cellData = this.grid[row][col];
        
        if (!cellData || cellData.type !== 'server') {
            return { result: 'fail', message: 'No server to exploit' };
        }
        
        const server = this.servers.find(s => s.id === cellData.serverId);
        if (!server) {
            return { result: 'fail', message: 'Server not found' };
        }
        
        if (!server.vulnerable) {
            return { result: 'hardened', message: 'Server is hardened - no vulnerabilities' };
        }
        
        // Find which segment was targeted
        const segmentIndex = server.positions.findIndex(([r, c]) => r === row && c === col);
        if (segmentIndex === -1) {
            return { result: 'fail', message: 'Invalid target' };
        }
        
        // Breach the segment
        server.breached[segmentIndex] = true;
        
        // Check if entire server is breached
        const fullyBreached = server.breached.every(b => b === true);
        
        return {
            result: 'success',
            message: fullyBreached ? 'SERVER FULLY COMPROMISED!' : 'Server segment breached',
            serverId: server.id,
            fullyBreached: fullyBreached
        };
    }
    
    /**
     * Remove firewall
     */
    removeFirewall(firewallId) {
        const firewall = this.firewalls.find(f => f.id === firewallId);
        if (firewall) {
            this.grid[firewall.row][firewall.col] = null;
            this.firewalls = this.firewalls.filter(f => f.id !== firewallId);
            this.renderGrid();
        }
    }
    
    /**
     * Get server type name
     */
    getServerTypeName(type) {
        const names = {
            'db': 'DATABASE',
            'web': 'WEB SERVER',
            'email': 'EMAIL SERVER',
            'infra': 'INFRASTRUCTURE'
        };
        return names[type] || 'UNKNOWN';
    }
    
    /**
     * Render the grid visually
     */
    renderGrid() {
        for (let row = 0; row < 6; row++) {
            for (let col = 0; col < 6; col++) {
                const cell = this.getCell(row, col);
                if (!cell) continue;
                
                // Clear existing classes
                cell.className = 'grid-cell';
                
                const cellData = this.grid[row][col];
                
                if (!this.isOpponent) {
                    // Player's own grid - show everything
                    if (cellData) {
                        if (cellData.type === 'server') {
                            cell.classList.add('has-server', `server-${cellData.serverType}`);
                            if (cellData.vulnerable) {
                                cell.classList.add('vulnerable');
                            }
                        } else if (cellData.type === 'firewall') {
                            cell.classList.add('has-firewall');
                        } else if (cellData.type === 'honeypot') {
                            cell.classList.add('has-honeypot');
                        }
                    }
                }
            }
        }
    }
    
    /**
     * Mark opponent cell as scanned
     */
    markScanned(row, col) {
        const cell = this.getCell(row, col);
        if (cell) {
            cell.classList.add('scanned');
        }
    }
    
    /**
     * Mark opponent cell as probed
     */
    markProbed(row, col, serverType = null) {
        const cell = this.getCell(row, col);
        if (cell) {
            cell.classList.add('probed');
            if (serverType) {
                cell.classList.add(`server-${serverType}`);
            }
        }
    }
    
    /**
     * Mark opponent cell as breached
     */
    markBreached(row, col) {
        const cell = this.getCell(row, col);
        if (cell) {
            cell.classList.add('breached');
        }
    }
    
    /**
     * Get breach count
     */
    getBreachCount() {
        return this.servers.filter(s => s.breached.every(b => b === true)).length;
    }
    
    /**
     * Check if game is won (3 servers breached)
     */
    checkDefeat() {
        const breachedCount = this.getBreachCount();
        return breachedCount >= 3;
    }
}
