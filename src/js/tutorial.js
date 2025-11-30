/* ============================================
   TUTORIAL SYSTEM
   Interactive step-by-step guided tutorial
   ============================================ */

const Tutorial = {
    active: false,
    currentStep: 0,
    totalSteps: 15,
    guideCharacter: 'CIPHER',
    
    steps: [
        // STEP 0: Welcome
        {
            title: 'WELCOME TO ACCESS DENIED!',
            message: `Hello, I'm <strong>CIPHER</strong>, your ethical hacking instructor. I'll guide you through network security fundamentals using this tactical simulation.
            
            <div class="tutorial-box">
                <strong>🎯 MISSION OBJECTIVE:</strong><br>
                You are a <em>penetration tester</em> (ethical hacker) hired to assess network security. Your goal is to identify and exploit vulnerabilities in a simulated corporate network before malicious actors can.
            </div>
            
            <div class="cybok-note">
                📚 <strong>CyBOK Context:</strong> This game teaches concepts from the <em>Network Security</em> and <em>Malware & Attack Technologies</em> knowledge areas of the Cyber Security Body of Knowledge (CyBOK).
            </div>`,
            highlight: null,
            action: null,
            theory: 'Penetration testing (pen testing) is a simulated cyberattack against a system to check for exploitable vulnerabilities. Organizations hire ethical hackers to find weaknesses before criminals do.'
        },
        
        // STEP 1: Understanding the Battlefield
        {
            title: 'THE NETWORK BATTLEFIELD',
            message: `Let's examine your workspace. You see two 6×6 grids representing network topologies.
            
            <div class="tutorial-box">
                <strong>LEFT GRID:</strong> <span style="color: var(--color-matrix-green);">YOUR NETWORK</span><br>
                This is the network you're defending. You can see all your servers, firewalls, and honeypots.
                
                <strong>RIGHT GRID:</strong> <span style="color: var(--color-warning-red);">ENEMY NETWORK</span><br>
                This is your target. It's initially hidden—you must use reconnaissance to map it.
            </div>
            
            <div class="cybok-note">
                📚 <strong>Network Topology:</strong> The arrangement of nodes (servers, devices) in a network. Understanding topology is crucial for both attack and defense strategies (CyBOK: Network Security).
            </div>`,
            highlight: ['player-board', 'opponent-board'],
            action: null,
            theory: 'In real penetration testing, attackers rarely have complete visibility. They must use reconnaissance techniques like port scanning and service enumeration to map the target network—exactly what you\'ll do in this game.'
        },
        
        // STEP 2: Game Resources
        {
            title: 'RESOURCES: ACTION POINTS & INTELLIGENCE',
            message: `Notice the status bar at the top. You have two critical resources:
            
            <div class="tutorial-box">
                <strong>⚡ ACTION POINTS (AP):</strong><br>
                You currently have <span style="color: var(--color-caution-yellow);">3 AP</span>. You gain +1 AP each turn (max 6).
                Every action costs AP:
                • SCAN = 1 AP
                • PROBE = 2 AP  
                • EXPLOIT = 3 AP
                
                <strong>🔍 INTELLIGENCE:</strong><br>
                Gained from successful reconnaissance. At 6+ Intel, you draw Tool Cards that provide tactical advantages.
            </div>
            
            <div class="cybok-note">
                📚 <strong>Resource Management:</strong> Real attackers must manage time, computational resources, and risk. AP simulates the cost-benefit analysis of each action—probing is more informative but costs more resources.
            </div>`,
            highlight: ['current-ap', 'intel-count'],
            action: null,
            theory: 'In cybersecurity, every action has a cost. Noisy scans might be detected by IDS (Intrusion Detection Systems). Slow, careful reconnaissance avoids detection but takes longer. This resource system simulates that trade-off.'
        },
        
        // STEP 3: Understanding Servers
        {
            title: 'SERVER ASSETS - YOUR TARGETS',
            message: `Look at <span style="color: var(--color-matrix-green);">YOUR NETWORK</span> (left grid). You'll see four types of servers:
            
            <div class="tutorial-box">
                <strong style="color: #0066CC;">🗄️ DATABASE (3 segments):</strong> Stores critical data. Harder to fully breach.<br>
                <strong style="color: #FFD700;">🌐 WEB SERVER (2 segments):</strong> Public-facing. Common attack vector.<br>
                <strong style="color: #CC0000;">📧 EMAIL SERVER (2 segments):</strong> Handles communications. Often targeted for phishing.<br>
                <strong style="color: #00AA00;">⚙️ INFRASTRUCTURE (2 segments):</strong> DNS, routing, critical services.
            </div>
            
            Notice the <strong>🔓 padlock icons</strong>? Those mark <em>vulnerable</em> servers that can be exploited.
            
            <div class="cybok-note">
                📚 <strong>Attack Surface:</strong> These servers represent different entry points into a network. In real scenarios, different services have different vulnerability profiles (CyBOK: Malware & Attack Technologies).
            </div>`,
            highlight: ['player-grid'],
            action: null,
            theory: 'Each server type represents real infrastructure. Web servers are often exposed to the internet and face constant attacks. Email servers are phishing targets. Databases hold valuable data. Infrastructure services are high-value targets because compromising them can take down entire networks.'
        },
        
        // STEP 4: Defensive Assets - Firewalls
        {
            title: 'DEFENSE LAYER 1: FIREWALLS',
            message: `Your network has <strong>🛡️ FIREWALLS</strong> protecting critical assets.
            
            <div class="tutorial-box">
                <strong>How Firewalls Work:</strong><br>
                • Block incoming attacks<br>
                • Have 2 durability points<br>
                • After 2 hits, they're destroyed<br>
                • Must be eliminated before reaching protected servers
            </div>
            
            <div class="cybok-note">
                📚 <strong>Firewall Technology:</strong> Firewalls filter network traffic based on rules. Packet-filtering firewalls (simulated here) can be bypassed or overwhelmed. Real firewalls use deep packet inspection, but all have resource limits (CyBOK: Network Security - Access Control).
            </div>`,
            highlight: ['player-grid'],
            action: null,
            theory: 'Firewalls are the first line of defense. In this game, they represent stateful firewalls that track connection states. The durability mechanic simulates how persistent attacks can eventually overwhelm defenses, reflecting real DDoS (Distributed Denial of Service) scenarios.'
        },
        
        // STEP 5: Defensive Assets - Honeypots
        {
            title: 'DEFENSE LAYER 2: HONEYPOTS',
            message: `Notice the <strong>🎭 HONEYPOT</strong> on your grid? This is a deception defense.
            
            <div class="tutorial-box">
                <strong>Honeypot Strategy:</strong><br>
                • Looks like a real server<br>
                • When an attacker PROBEs it, they're detected<br>
                • Triggering a honeypot causes you to <em>lose your next turn</em><br>
                • If triggered twice, the defender wins!
            </div>
            
            <div class="cybok-note">
                📚 <strong>Deception Technology:</strong> Honeypots are decoy systems designed to lure attackers and waste their resources while alerting defenders. They're a key component of defense-in-depth strategy (CyBOK: Security Operations & Incident Management).
            </div>`,
            highlight: ['player-grid'],
            action: null,
            theory: 'Real honeypots range from simple fake services to entire fake networks (honeynets). Security researchers use them to study attack techniques. Companies deploy them to detect reconnaissance activity and delay attackers while incident response teams mobilize.'
        },
        
        // STEP 6: Action 1 - SCAN
        {
            title: 'RECONNAISSANCE: SCAN ACTION',
            message: `Your first tool is <strong>📡 SCAN</strong>. Let's practice!
            
            <div class="tutorial-box">
                <strong>SCAN (1 AP):</strong><br>
                • Detects if something exists at target coordinates<br>
                • Doesn't reveal what it is<br>
                • Low risk, low information<br>
                • Successful scans grant +1 Intelligence
            </div>
            
            <strong>👉 NOW YOU TRY:</strong><br>
            1. Click the <span style="color: var(--color-cyber-cyan);">SCAN</span> button below<br>
            2. Then click any cell on the <span style="color: var(--color-warning-red);">ENEMY NETWORK</span> (right grid)
            
            <div class="cybok-note">
                📚 <strong>Port Scanning:</strong> SCAN simulates tools like Nmap that detect open ports and services. It's the first phase of the Cyber Kill Chain—Reconnaissance (CyBOK: Malware & Attack Technologies).
            </div>`,
            highlight: ['scan-btn', 'opponent-grid'],
            action: 'scan',
            requiredAction: 'scan',
            theory: 'Port scanning is legal when authorized (like in pen testing) but illegal otherwise. Tools like Nmap send packets to target ports and analyze responses. TCP SYN scans are stealthy; TCP Connect scans are noisier but more reliable.'
        },
        
        // STEP 7: Action 2 - PROBE
        {
            title: 'ACTIVE RECONNAISSANCE: PROBE',
            message: `Great! Now let's use <strong>🔍 PROBE</strong>, a more aggressive technique.
            
            <div class="tutorial-box">
                <strong>PROBE (2 AP):</strong><br>
                • Reveals exactly what's at the target<br>
                • Shows server type if present<br>
                • ⚠️ Can trigger honeypots!<br>
                • More information, higher risk
            </div>
            
            <strong>👉 NOW YOU TRY:</strong><br>
            1. Click the <span style="color: var(--color-caution-yellow);">PROBE</span> button<br>
            2. Click a different cell on the <span style="color: var(--color-warning-red);">ENEMY NETWORK</span><br>
            
            Try to avoid the honeypot at <strong>B4</strong> (we'll trigger it later for demonstration)!
            
            <div class="cybok-note">
                📚 <strong>Service Enumeration:</strong> PROBE simulates banner grabbing and service fingerprinting. Tools like Nessus or OpenVAS identify specific services and versions, revealing potential vulnerabilities (CyBOK: Security Operations).
            </div>`,
            highlight: ['probe-btn', 'opponent-grid'],
            action: 'probe',
            requiredAction: 'probe',
            theory: 'Service enumeration reveals software versions, which attackers cross-reference with CVE (Common Vulnerabilities and Exposures) databases. For example, if you discover "Apache 2.2.8," you can search for known exploits. This is why keeping software updated is critical.'
        },
        
        // STEP 8: Action 3 - EXPLOIT
        {
            title: 'ACTIVE ATTACK: EXPLOIT',
            message: `The most powerful action is <strong>⚡ EXPLOIT</strong>.
            
            <div class="tutorial-box">
                <strong>EXPLOIT (3 AP):</strong><br>
                • Attempts to breach a server<br>
                • Only works on <em>vulnerable</em> (🔓) servers<br>
                • Multi-segment servers need multiple exploits<br>
                • Most expensive but necessary for victory
            </div>
            
            <strong>Strategy Tip:</strong> You must PROBE first to identify server locations, then EXPLOIT vulnerable ones.
            
            <div class="cybok-note">
                📚 <strong>Vulnerability Exploitation:</strong> This represents using exploits (like Metasploit modules) against identified vulnerabilities. The CVE system catalogs these. Patching vulnerabilities is the primary defense (CyBOK: Software Security).
            </div>`,
            highlight: ['exploit-btn'],
            action: null,
            theory: 'Exploits leverage software vulnerabilities to gain unauthorized access. Famous examples include EternalBlue (used in WannaCry ransomware) and Heartbleed (OpenSSL bug). Responsible disclosure means reporting vulnerabilities to vendors before publicizing them.'
        },
        
        // STEP 9: Tool Cards Introduction
        {
            title: 'ADVANCED TACTICS: TOOL CARDS',
            message: `When you reach 6+ Intelligence, you draw <strong>Tool Cards</strong>—special abilities that bend the rules.
            
            <div class="tutorial-box">
                <strong>Available Tool Cards:</strong><br>
                
                <strong>📡 PORT SCANNER:</strong> Gain +1 SCAN this turn (Costs 0 AP)<br>
                <strong>⚡ EXPLOIT KIT:</strong> Convert discovered vulnerability to BREACH without spending AP<br>
                <strong>🔧 FIREWALL BYPASS:</strong> Ignore 1 firewall this turn<br>
                <strong>🔍 HONEYPOT DETECTOR:</strong> Check if target contains honeypot before probing
            </div>
            
            <div class="cybok-note">
                📚 <strong>Attack Tools & Frameworks:</strong> These cards represent real tools like Metasploit (exploit kit), Nmap (port scanner), and custom scripts. Professional pen testers build toolkits for different scenarios (CyBOK: Malware & Attack Technologies).
            </div>`,
            highlight: ['tool-cards-hand'],
            action: null,
            theory: 'The cybersecurity industry has frameworks like MITRE ATT&CK that categorize attacker techniques and tools. Tool cards simulate how skilled attackers use automation, custom exploits, and specialized equipment to gain advantages over defenders.'
        },
        
        // STEP 10: Victory Conditions
        {
            title: 'VICTORY CONDITIONS',
            message: `There are multiple paths to victory in ACCESS DENIED!
            
            <div class="tutorial-box">
                <strong>🎯 OFFENSIVE VICTORY:</strong> Breach 3 of 4 enemy servers<br>
                <em>Simulates: Complete network compromise</em>
                
                <strong>🔍 INTELLIGENCE VICTORY:</strong> Accumulate 12 Intelligence Tokens<br>
                <em>Simulates: Gathering enough data for a comprehensive security report</em>
                
                <strong>🎭 DEFENSIVE VICTORY:</strong> Enemy triggers your honeypot twice<br>
                <em>Simulates: Successfully detecting and stopping an intrusion</em>
                
                <strong>⏰ ATTRITION VICTORY:</strong> Survive 12 rounds with fewer breaches<br>
                <em>Simulates: Incident containment and resilience</em>
            </div>
            
            <div class="cybok-note">
                📚 <strong>Success Metrics:</strong> Real penetration tests have different objectives: some prove network compromise is possible, others measure detection capabilities or response times (CyBOK: Security Operations).
            </div>`,
            highlight: ['breach-count', 'intel-count'],
            action: null,
            theory: 'In real security, success isn\'t binary. A pen test might successfully breach a network but get detected quickly—that\'s valuable information. Similarly, defenders who detect attacks early (honeypot victories) demonstrate strong monitoring capabilities.'
        },
        
        // STEP 11: Threat Escalation Track
        {
            title: 'TIME PRESSURE: THREAT ESCALATION',
            message: `Notice the <strong>⚠ THREAT ESCALATION</strong> track at the bottom?
            
            <div class="tutorial-box">
                The game lasts <strong>12 rounds maximum</strong>. Each round represents:
                
                • Time for defenders to detect you<br>
                • Increased risk of discovery<br>
                • Security team mobilization<br>
                • Pressure to complete your mission
            </div>
            
            If you don't achieve victory by Round 12, the side with <em>fewer breaches</em> wins (defenders have the advantage in prolonged engagements).
            
            <div class="cybok-note">
                📚 <strong>Incident Response Timeline:</strong> Real security teams have detection and response SLAs (Service Level Agreements). Attackers race against the clock—the longer they're in a system, the higher the chance of detection (CyBOK: Incident Management).
            </div>`,
            highlight: ['threat-track'],
            action: null,
            theory: 'The concept of "dwell time" (how long attackers remain undetected) is critical in cybersecurity. Studies show average dwell time varies by industry but can be months. Good security teams aim to detect and respond within hours or days.'
        },
        
        // STEP 12: Defense in Depth
        {
            title: 'DEFENSIVE STRATEGY: DEFENSE-IN-DEPTH',
            message: `Your network (and the enemy's) uses layered security:
            
            <div class="tutorial-box">
                <strong>Layer 1:</strong> 🛡️ Firewalls (perimeter defense)<br>
                <strong>Layer 2:</strong> 🎭 Honeypots (deception & detection)<br>
                <strong>Layer 3:</strong> 🔒 Hardened servers (no vulnerabilities)<br>
                <strong>Layer 4:</strong> 🔓 Vulnerable servers (require patching)
            </div>
            
            This is called <strong>Defense-in-Depth</strong>—multiple security layers so that if one fails, others still protect critical assets.
            
            <div class="cybok-note">
                📚 <strong>Layered Security:</strong> No single security control is perfect. Defense-in-depth assumes attackers will breach outer layers, so you need security at network, host, application, and data levels (CyBOK: Security Architecture).
            </div>`,
            highlight: ['player-grid'],
            action: null,
            theory: 'The Swiss Cheese Model of security says each layer has holes (vulnerabilities), but when layered, holes rarely align. Attackers must defeat multiple controls, increasing difficulty and chance of detection. This is why removing just one defense (like disabling firewalls) significantly increases risk.'
        },
        
        // STEP 13: Ethical Hacking Principles
        {
            title: 'ETHICAL HACKING PRINCIPLES',
            message: `As CIPHER, I must emphasize: <strong>ethical hacking has strict rules</strong>.
            
            <div class="tutorial-box">
                ✅ <strong>DO:</strong><br>
                • Get written authorization before testing<br>
                • Document all findings<br>
                • Report vulnerabilities responsibly<br>
                • Respect scope and boundaries<br>
                • Help organizations improve security
                
                ❌ <strong>DON'T:</strong><br>
                • Test systems without permission<br>
                • Cause unnecessary damage<br>
                • Steal or leak data<br>
                • Go beyond authorized scope<br>
                • Use findings maliciously
            </div>
            
            <div class="cybok-note">
                📚 <strong>Professional Ethics:</strong> Certifications like CEH (Certified Ethical Hacker) and OSCP (Offensive Security Certified Professional) include ethics training. Violating these principles can result in criminal charges under laws like CFAA (Computer Fraud and Abuse Act).
            </div>`,
            highlight: null,
            action: null,
            theory: 'Many skilled hackers have faced legal trouble for unauthorized testing. Aaron Swartz, weev, and others highlight the importance of authorization. Even security researchers must be careful—some vulnerability disclosure has led to lawsuits despite good intentions.'
        },
        
        // STEP 14: Practical Application
        {
            title: 'REAL-WORLD APPLICATION',
            message: `Everything you're learning applies to real cybersecurity careers:
            
            <div class="tutorial-box">
                <strong>🎯 Penetration Tester:</strong> Authorized hacking to find vulnerabilities<br>
                <strong>🛡️ Security Analyst:</strong> Monitoring for threats, using honeypots<br>
                <strong>🔍 Threat Hunter:</strong> Proactive searching for hidden attackers<br>
                <strong>📊 Security Architect:</strong> Designing defense-in-depth systems<br>
                <strong>🚨 Incident Responder:</strong> Reacting to active breaches
            </div>
            
            <div class="cybok-note">
                📚 <strong>CyBOK Alignment:</strong> This game covers knowledge areas including Network Security, Malware & Attack Technologies, Security Operations & Incident Management, and Software Security—core domains for cybersecurity professionals.
            </div>`,
            highlight: null,
            action: null,
            theory: 'The cybersecurity job market is growing rapidly. Skills you practice here—understanding attack vectors, defensive architecture, risk assessment—are directly applicable. Many professionals start with certifications (Security+, CEH) and progress to specialized roles (Red Team, Blue Team, Purple Team).'
        },
        
        // STEP 15: Tutorial Complete
        {
            title: 'TUTORIAL COMPLETE - MISSION BRIEFING',
            message: `Excellent work! You're ready for a real engagement.
            
            <div class="tutorial-box">
                <strong>YOUR MISSION:</strong><br>
                You've been hired to test the security of a corporate network. Your client wants to know:
                
                • Can you breach their defenses?<br>
                • How long does it take?<br>
                • What vulnerabilities exist?<br>
                • Are their detection systems effective?
                
                <strong>Remember:</strong> You're the ethical hacker. Your findings will help them strengthen security and protect against real threats.
            </div>
            
            <div style="text-align: center; margin-top: 20px;">
                <strong style="color: var(--color-matrix-green); font-size: 18px;">Good luck, and happy hacking!</strong><br>
                <em style="color: var(--color-cyber-cyan);">- CIPHER</em>
            </div>`,
            highlight: null,
            action: 'complete',
            theory: 'Now you understand the fundamentals. Real penetration testing involves deeper technical skills, but the strategic thinking—resource management, risk assessment, methodical reconnaissance—is exactly what you\'ll practice in this game. Welcome to the world of ethical hacking!'
        }
    ],
    
    /**
     * Start tutorial
     */
    start: function() {
        this.active = true;
        this.currentStep = 0;
        
        // Hide main game temporarily
        document.getElementById('game-container').style.display = 'none';
        
        // Show tutorial overlay
        this.showTutorialOverlay();
        this.displayStep(0);
        
        Utils.addLog('> Tutorial started', 'system');
    },
    
    /**
     * Show tutorial overlay
     */
    showTutorialOverlay: function() {
        const overlay = document.createElement('div');
        overlay.id = 'tutorial-overlay';
        overlay.className = 'tutorial-overlay';
        
        overlay.innerHTML = `
            <div class="tutorial-container">
                <div class="tutorial-header">
                    <div class="tutorial-progress">
                        <div class="progress-bar">
                            <div class="progress-fill" id="tutorial-progress-fill"></div>
                        </div>
                        <div class="progress-text">
                            <span id="tutorial-step-counter">Step 1 of ${this.totalSteps}</span>
                        </div>
                    </div>
                    <button class="tutorial-skip" id="tutorial-skip-btn">SKIP TUTORIAL</button>
                </div>
                
                <div class="tutorial-content">
                    <div class="tutorial-character">
                        <div class="character-avatar">
                            <div class="avatar-icon">🕵️</div>
                            <div class="avatar-name">${this.guideCharacter}</div>
                            <div class="avatar-title">Ethical Hacker</div>
                        </div>
                    </div>
                    
                    <div class="tutorial-message">
                        <h2 id="tutorial-title" class="tutorial-title"></h2>
                        <div id="tutorial-text" class="tutorial-text"></div>
                        <div id="tutorial-theory" class="tutorial-theory hidden"></div>
                    </div>
                </div>
                
                <div class="tutorial-footer">
                    <button class="tutorial-btn" id="tutorial-prev-btn">← PREVIOUS</button>
                    <button class="tutorial-btn toggle-theory-btn" id="toggle-theory-btn">📚 SHOW THEORY</button>
                    <button class="tutorial-btn tutorial-btn-primary" id="tutorial-next-btn">NEXT →</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(overlay);
        
        // Event listeners
        document.getElementById('tutorial-next-btn').addEventListener('click', () => this.nextStep());
        document.getElementById('tutorial-prev-btn').addEventListener('click', () => this.prevStep());
        document.getElementById('tutorial-skip-btn').addEventListener('click', () => this.skip());
        document.getElementById('toggle-theory-btn').addEventListener('click', () => this.toggleTheory());
    },
    
    /**
     * Display current step
     */
    displayStep: function(stepIndex) {
        const step = this.steps[stepIndex];
        
        // Update progress
        const progress = ((stepIndex + 1) / this.totalSteps) * 100;
        document.getElementById('tutorial-progress-fill').style.width = progress + '%';
        document.getElementById('tutorial-step-counter').textContent = `Step ${stepIndex + 1} of ${this.totalSteps}`;
        
        // Update content
        document.getElementById('tutorial-title').innerHTML = step.title;
        document.getElementById('tutorial-text').innerHTML = step.message;
        document.getElementById('tutorial-theory').innerHTML = '<strong>💡 Deep Dive:</strong><br>' + step.theory;
        
        // Update buttons
        document.getElementById('tutorial-prev-btn').disabled = (stepIndex === 0);
        const nextBtn = document.getElementById('tutorial-next-btn');
        
        if (stepIndex === this.totalSteps - 1) {
            nextBtn.textContent = 'START GAME →';
            nextBtn.classList.add('tutorial-btn-complete');
        } else {
            nextBtn.textContent = 'NEXT →';
            nextBtn.classList.remove('tutorial-btn-complete');
        }
        
        // Handle highlighting
        this.removeHighlights();
        if (step.highlight) {
            this.addHighlights(step.highlight);
        }
        
        // Handle required actions
        if (step.requiredAction) {
            nextBtn.disabled = true;
            nextBtn.textContent = 'Complete the action above';
            this.waitForAction(step.requiredAction);
        } else {
            nextBtn.disabled = false;
        }
    },
    
    /**
     * Next step
     */
    nextStep: function() {
        if (this.currentStep < this.totalSteps - 1) {
            this.currentStep++;
            this.displayStep(this.currentStep);
        } else {
            this.complete();
        }
    },
    
    /**
     * Previous step
     */
    prevStep: function() {
        if (this.currentStep > 0) {
            this.currentStep--;
            this.displayStep(this.currentStep);
        }
    },
    
    /**
     * Toggle theory visibility
     */
    toggleTheory: function() {
        const theoryDiv = document.getElementById('tutorial-theory');
        const btn = document.getElementById('toggle-theory-btn');
        
        if (theoryDiv.classList.contains('hidden')) {
            theoryDiv.classList.remove('hidden');
            btn.textContent = '📚 HIDE THEORY';
        } else {
            theoryDiv.classList.add('hidden');
            btn.textContent = '📚 SHOW THEORY';
        }
    },
    
    /**
     * Add highlights to elements
     */
    addHighlights: function(elementIds) {
        // First, show the game container if needed
        document.getElementById('game-container').style.display = 'flex';
        document.getElementById('game-container').style.opacity = '0.3';
        document.getElementById('game-container').style.pointerEvents = 'none';
        
        elementIds.forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                element.classList.add('tutorial-highlight');
                element.style.position = 'relative';
                element.style.zIndex = '9999';
                element.style.opacity = '1';
                
                // If it's an action button, enable it
                if (id.includes('btn')) {
                    element.style.pointerEvents = 'auto';
                }
            }
        });
    },
    
    /**
     * Remove all highlights
     */
    removeHighlights: function() {
        document.querySelectorAll('.tutorial-highlight').forEach(el => {
            el.classList.remove('tutorial-highlight');
            el.style.zIndex = '';
            el.style.pointerEvents = '';
        });
        
        document.getElementById('game-container').style.opacity = '';
        document.getElementById('game-container').style.pointerEvents = '';
    },
    
    /**
     * Wait for user to perform action
     */
    waitForAction: function(actionType) {
        // This will be triggered by game.js when the action is completed
        console.log('Waiting for action:', actionType);
        
        // Enable the game interaction
        document.getElementById('game-container').style.pointerEvents = 'auto';
        document.getElementById('opponent-grid').style.pointerEvents = 'auto';
    },
    
    /**
     * Action completed (called from game.js)
     */
    actionCompleted: function(actionType) {
        const step = this.steps[this.currentStep];
        
        if (step.requiredAction === actionType) {
            const nextBtn = document.getElementById('tutorial-next-btn');
            nextBtn.disabled = false;
            nextBtn.textContent = 'NEXT →';
            
            Utils.showNotification('GREAT JOB!', 'Action completed successfully!', 'success', 2000);
        }
    },
    
    /**
     * Skip tutorial
     */
    skip: function() {
        if (confirm('Skip the tutorial? You can access it again from the Help menu.')) {
            this.complete();
        }
    },
    
    /**
     * Complete tutorial
     */
    complete: function() {
        this.active = false;
        
        // Remove overlay
        const overlay = document.getElementById('tutorial-overlay');
        if (overlay) {
            overlay.remove();
        }
        
        // Restore game
        this.removeHighlights();
        document.getElementById('game-container').style.display = '';
        document.getElementById('game-container').style.opacity = '';
        document.getElementById('game-container').style.pointerEvents = '';
        
        Utils.addLog('> Tutorial completed', 'system');
        Utils.showNotification('TUTORIAL COMPLETE', 'Good luck with your penetration test!', 'success', 4000);
    }
};
