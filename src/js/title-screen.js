/* ============================================
   TITLE SCREEN MANAGEMENT
   ============================================ */

const TitleScreen = {
    
    /**
     * Show title screen
     */
    show: function() {
        const titleScreen = this.createTitleScreen();
        document.body.insertBefore(titleScreen, document.body.firstChild);
        
        // Add matrix rain effect (optional)
        this.addMatrixRain();
        
        console.log('Title screen displayed');
    },
    
    /**
     * Create title screen HTML
     */
    createTitleScreen: function() {
        const screen = document.createElement('div');
        screen.id = 'title-screen';
        screen.className = 'title-screen';
        
        screen.innerHTML = `
            <div class="matrix-bg" id="matrix-bg"></div>
            
            <div class="title-container">
                <h1 class="title-main glitch-text" data-text="ACCESS DENIED!">ACCESS DENIED!</h1>
                <div class="title-subtitle">Beyond the Firewall</div>
                <div class="title-tagline">"Every network has vulnerabilities. Can you find them first?"</div>
                
                <div class="title-menu">
                    <button class="title-menu-btn btn-start" id="title-start-btn">
                        <span>▶ START GAME</span>
                    </button>
                    
                    <button class="title-menu-btn btn-tutorial" id="title-tutorial-btn">
                        <span>🎓 TUTORIAL</span>
                    </button>
                    
                    <button class="title-menu-btn btn-credits" id="title-credits-btn">
                        <span>ℹ️ ABOUT / CREDITS</span>
                    </button>
                </div>
                
                <div class="title-info-box">
                    <h3>📚 EDUCATIONAL CYBERSECURITY GAME</h3>
                    <p>Learn network security concepts through tactical gameplay aligned with the Cyber Security Body of Knowledge (CyBOK).</p>
                    <ul>
                        <li>Practice ethical hacking techniques</li>
                        <li>Understand defense-in-depth strategies</li>
                        <li>Master vulnerability assessment</li>
                        <li>Learn incident response fundamentals</li>
                    </ul>
                </div>
            </div>
            
            <div class="title-footer">
                CMPG215 | NORTH-WEST UNIVERSITY | CyBOK ALIGNED | FOR EDUCATIONAL USE ONLY
            </div>
        `;
        
        // Add event listeners
        setTimeout(() => {
            document.getElementById('title-start-btn').addEventListener('click', () => this.startGame());
            document.getElementById('title-tutorial-btn').addEventListener('click', () => this.startTutorial());
            document.getElementById('title-credits-btn').addEventListener('click', () => this.showCredits());
        }, 100);
        
        return screen;
    },
    
    /**
     * Start main game
     */
    startGame: function() {
        console.log('Starting game...');
        
        const titleScreen = document.getElementById('title-screen');
        titleScreen.style.animation = 'fadeOut 0.5s ease';
        
        setTimeout(() => {
            titleScreen.remove();
            // Game will auto-start from the existing init in game.js
        }, 500);
    },
    
    /**
     * Start tutorial
     */
    startTutorial: function() {
        console.log('Starting tutorial...');
        
        const titleScreen = document.getElementById('title-screen');
        titleScreen.style.animation = 'fadeOut 0.5s ease';
        
        setTimeout(() => {
            titleScreen.remove();
            
            // Initialize game first (hidden)
            const loadingScreen = document.getElementById('loading-screen');
            const gameContainer = document.getElementById('game-container');
            
            loadingScreen.classList.add('hidden');
            gameContainer.classList.remove('hidden');
            
            // Initialize game systems
            Game.playerBoard = new Board('player-grid', false);
            Game.opponentBoard = new Board('opponent-grid', true);
            Game.cardManager = new CardManager();
            Game.setupGame();
            UI.init();
            
            // Start tutorial
            Tutorial.start();
        }, 500);
    },
    
    /**
     * Show credits modal
     */
    showCredits: function() {
        const content = `
            <h2>ABOUT ACCESS DENIED!</h2>
            
            <div style="text-align: center; margin: 20px 0;">
                <div style="font-size: 48px; margin-bottom: 10px;">🎮</div>
                <div style="font-size: 18px; color: var(--color-matrix-green); font-weight: 700;">ACCESS DENIED!</div>
                <div style="font-size: 12px; color: var(--color-cyber-cyan); margin-top: 5px;">Beyond the Firewall</div>
            </div>
            
            <h3>GAME DESIGN</h3>
            <p>A tactical cybersecurity simulation game designed for educational purposes, teaching network security concepts through strategic gameplay.</p>
            
            <h3>EDUCATIONAL FRAMEWORK</h3>
            <p><strong>CyBOK Alignment:</strong> This game covers knowledge areas from the Cyber Security Body of Knowledge including:</p>
            <ul style="text-align: left; line-height: 1.8;">
                <li>Network Security</li>
                <li>Malware & Attack Technologies</li>
                <li>Security Operations & Incident Management</li>
                <li>Software Security</li>
                <li>Human Factors in Security</li>
            </ul>
            
            <h3>LEARNING OBJECTIVES</h3>
            <ul style="text-align: left; line-height: 1.8;">
                <li>Understand attack methodologies (reconnaissance, exploitation)</li>
                <li>Learn defensive strategies (firewalls, honeypots, hardening)</li>
                <li>Practice resource management and risk assessment</li>
                <li>Develop strategic thinking in cybersecurity contexts</li>
                <li>Appreciate ethical considerations in penetration testing</li>
            </ul>
            
            <h3>COURSE INFORMATION</h3>
            <p><strong>Course:</strong> CMPG215 - Cybersecurity Fundamentals<br>
            <strong>Institution:</strong> North-West University<br>
            <strong>Framework:</strong> CyBOK (Cyber Security Body of Knowledge)</p>
            
            <h3>TECHNICAL DETAILS</h3>
            <p><strong>Version:</strong> 1.0.0<br>
            <strong>Engine:</strong> Vanilla JavaScript + CSS Grid<br>
            <strong>License:</strong> Educational Use Only</p>
            
            <div style="margin-top: 30px; padding: 15px; border: 2px solid var(--color-caution-yellow); background: rgba(255, 255, 0, 0.05);">
                <strong style="color: var(--color-caution-yellow);">⚠️ DISCLAIMER:</strong><br>
                This is an educational simulation. All hacking techniques shown should only be used in authorized penetration testing scenarios with explicit permission. Unauthorized access to computer systems is illegal.
            </div>
            
            <div style="margin-top: 20px; text-align: center; color: var(--color-cyber-cyan); font-size: 12px;">
                <strong>Developed for CMPG215 Students</strong><br>
                North-West University | 2024
            </div>
        `;
        
        Utils.showModal(content);
    },
    
    /**
     * Add matrix rain effect
     */
    addMatrixRain: function() {
        const container = document.getElementById('matrix-bg');
        if (!container) return;
        
        const characters = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
        const columnCount = Math.floor(window.innerWidth / 20);
        
        for (let i = 0; i < columnCount; i++) {
            const column = document.createElement('div');
            column.className = 'matrix-column';
            column.style.left = (i * 20) + 'px';
            column.style.animationDuration = (Math.random() * 3 + 2) + 's';
            column.style.animationDelay = (Math.random() * 2) + 's';
            
            // Generate random characters
            let text = '';
            const length = Math.floor(Math.random() * 20) + 10;
            for (let j = 0; j < length; j++) {
                text += characters.charAt(Math.floor(Math.random() * characters.length)) + '<br>';
            }
            column.innerHTML = text;
            
            container.appendChild(column);
        }
    },
    
    /**
     * Hide title screen
     */
    hide: function() {
        const titleScreen = document.getElementById('title-screen');
        if (titleScreen) {
            titleScreen.style.animation = 'fadeOut 0.5s ease';
            setTimeout(() => titleScreen.remove(), 500);
        }
    }
};
