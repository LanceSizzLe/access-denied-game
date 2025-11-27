# ACCESS DENIED! - Quick Start Guide

## 🎮 Getting Started

### Installation
1. Download the `access-denied-game-main` folder
2. No installation needed - it's a pure HTML/CSS/JS game
3. Works offline once downloaded

### Launch Game
**Option 1 - Direct Open:**
- Navigate to `access-denied-game-main/src/`
- Double-click `index.html`
- Game opens in your default browser

**Option 2 - Browser Open:**
- Open your web browser
- Press `Ctrl+O` (or `Cmd+O` on Mac)
- Navigate to and select `src/index.html`

**Option 3 - Local Server (Optional):**
```bash
cd access-denied-game-main/src
python -m http.server 8000
# Visit http://localhost:8000 in browser
```

## 🎯 Your First Game

### Turn 1 - Reconnaissance
1. **Click "SCAN"** button (costs 1 AP)
2. **Click any cell** on the Enemy Network (right side)
3. Watch the Activity Log for results
   - "Server detected!" = there's a server here ✓
   - "No server found" = empty cell

**Pro Tip:** Start by scanning corners and edges to find servers quickly!

### Turn 2 - Investigation
1. **Click "PROBE"** on a scanned cell with a server (costs 2 AP)
2. See the server type revealed:
   - 🗄️ Database Server
   - 🌐 Web Server
   - 📧 Email Server
   - ⚙️ Infrastructure Server
3. Check if it's vulnerable (⚠️ warning symbol)

**Pro Tip:** You MUST scan before you can probe!

### Turn 3 - Attack
1. **Click "EXPLOIT"** on a probed, vulnerable server (costs 3 AP)
2. If successful:
   - Server is breached! ⚡
   - You gain +2 Intel tokens
   - Breach counter increases (X/4)
3. If blocked:
   - Firewall protected! 🛡️
   - Try another target

**Pro Tip:** You can only exploit VULNERABLE servers. Look for the ⚠️ marker!

## 🎴 Using Tool Cards

### When to Use Cards
- **Running low on AP?** Use "Zero-Day Exploit" for free exploit
- **Need Intel?** Use "Social Engineering" for +2 Intel
- **Stuck?** Use "Deep Scan" to scan 3×3 area
- **Next turn boost?** Use "Encryption Key" for +2 AP

### How to Use
1. Click a card in your hand (bottom center)
2. Card effect activates immediately
3. Some cards require target selection
4. Card is discarded after use
5. Draw 1 new card at turn end

## 🎲 Game Strategy

### Early Game (Rounds 1-4)
- **Focus on SCANNING** to find all 4 servers
- Use 1-2 AP per turn for scans
- Save AP for probes when you find servers
- Play reconnaissance cards

### Mid Game (Rounds 5-8)
- **Start PROBING** located servers
- Look for vulnerable servers (⚠️)
- Avoid firewalls (🛡️)
- Build Intel through exploits

### Late Game (Rounds 9-12)
- **EXPLOIT** vulnerable servers
- Race to 3 breaches for victory
- Watch opponent's breach count
- Consider Intel victory (12 tokens)

## ⚠️ Threats to Watch For

### Firewalls (🛡️)
- **Block probes and exploits**
- Waste your action (but don't cost AP)
- Try different cells if blocked
- Some cards can disable firewalls

### Honeypots (🍯)
- **Hidden traps on servers**
- Trigger penalties when exploited
- Lose 1 Intel token
- Action fails
- Increases threat level

**How to detect:** Use "Honeypot Analyzer" card

### Threat Level
- **10-segment tracker** at bottom
- Increases with your actions
- 🟢 Green = Safe (0-3)
- 🟡 Yellow = Warning (4-6)
- 🔴 Red = Critical (7-10)
- High threat may trigger events

## 🏆 Victory Conditions

You can win in 4 ways:

### 1. Breach Victory (Easiest)
- Breach **3 of 4** enemy servers
- Most common win condition
- Fastest path to victory

### 2. Intel Victory
- Collect **12 Intel tokens**
- Earn +2 Intel per successful exploit
- Use "Social Engineering" card for bonus
- Alternative to breaching

### 3. Honeypot Victory
- Trigger opponent's honeypot **twice**
- Defensive victory
- Requires opponent to make mistakes

### 4. Survival Victory
- Survive to **Round 12**
- Have **fewer breaches** than opponent
- Defensive strategy

## 📊 Reading the Interface

### Status Bar (Top)
```
ROUND: 1          → Current round (max 12)
ACTION POINTS: 3  → AP remaining this turn
INTEL: 0          → Intel tokens collected
SERVERS: 0/4      → Servers you've breached
```

### Your Network (Left)
- **Shows YOUR defenses**
- See your servers, firewalls, honeypot
- Opponent is attacking here
- Watch for breaches (⚡ symbol)

### Enemy Network (Right)
- **Your attack target**
- Fog of war - hidden until scanned
- Click cells to perform actions
- Your primary focus

### Center Console
- **Action buttons** - Select scan/probe/exploit
- **Tool cards** - Your hand (max 5 cards)
- **Activity log** - All game events
- **Threat track** - Danger level

## 🎓 Educational Concepts

While playing, you're learning:

### Cyber Kill Chain
1. **Reconnaissance** (Scan) → Find targets
2. **Weaponization** (Probe) → Identify vulnerabilities
3. **Exploitation** (Exploit) → Compromise systems

### Defense Strategies
- **Firewalls** = Perimeter defense
- **Honeypots** = Deception tactics
- **Patching** = Vulnerability management
- **Segmentation** = Network isolation

### Risk Management
- **Action Points** = Resource allocation
- **Threat Level** = Risk assessment
- **Intel** = Intelligence gathering
- **Timing** = Operational security

## 🐛 Troubleshooting

### Game Won't Load
- Enable JavaScript in browser
- Try a different browser (Chrome, Firefox)
- Clear browser cache
- Check browser console (F12) for errors

### Buttons Not Working
- Wait for loading screen to finish
- Check if you have enough AP
- Make sure you've selected an action first
- Refresh page and restart

### Can't Click Cells
- Select an action button first
- Make sure you're clicking Enemy Network (right side)
- Check if cell is highlighted (valid target)
- You can't click Your Network cells

### Cards Won't Play
- Check if you have enough AP
- Some cards require targets
- Hand might be full (max 5)
- Wait for your turn

## 🎮 Keyboard Shortcuts

Currently mouse-only, but you can:
- **F12** - Open browser DevTools
- **F5** - Refresh/restart game
- **Ctrl+0** - Reset zoom level

## 📱 Mobile Support

The game is designed for desktop but can work on tablets:
- Landscape orientation recommended
- Minimum screen width: 1024px
- Touch targets may be small
- Best experience on desktop

## 🎨 Customization

Want to modify the game? Edit these files:
- `css/main.css` - Colors and fonts
- `js/game.js` - Game rules and logic
- `js/cards.js` - Add/modify cards
- `js/board.js` - Change board size

## 💡 Pro Tips

1. **Scan in patterns** - Don't scan randomly
2. **Probe only servers** - Don't waste AP on empty cells
3. **Watch for vulnerabilities** - Only exploit vulnerable servers
4. **Save cards** - Use them strategically
5. **Track breaches** - Race to 3 before opponent
6. **Manage AP** - Don't end turn with leftover AP
7. **Read the log** - It tells you everything

## 🏁 Win Your First Game!

**Simple Strategy:**
1. Scan 3 cells (3 AP) - End turn
2. Scan 3 more cells (3 AP) - End turn
3. Probe a found server (2 AP) - Scan 1 more - End turn
4. Exploit if vulnerable (3 AP) - End turn
5. Repeat until 3 breaches - **YOU WIN!**

## 📚 Need More Help?

- Click **HELP** button in game
- Click **RULES** button for full rules
- Check the Activity Log for hints
- Read `JAVASCRIPT_IMPLEMENTATION.md` for technical details
- Review the full `README.md`

## 🎉 Have Fun!

ACCESS DENIED! is designed to be:
- **Educational** - Learn real cybersecurity concepts
- **Strategic** - Multiple paths to victory
- **Engaging** - Quick 20-30 minute games
- **Replayable** - Random board setup each time

**Remember:** You're learning valuable cybersecurity skills while playing!

---

**Ready to play?** Open `src/index.html` and start hacking! 🚀
