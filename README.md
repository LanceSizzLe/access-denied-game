# ACCESS DENIED! Beyond the Firewall

A cybersecurity educational board game brought to digital life.

## 🎮 About

ACCESS DENIED! is a competitive, head-to-head grid-based strategy game where players become rival cybersecurity tacticians. Players build, defend, and exploit hidden digital infrastructures using tactical components representing servers, vulnerabilities, firewalls, and decoy traps.

This web-based prototype demonstrates core game mechanics in a browser-playable format with a distinctive early-2000s cyber-punk aesthetic.

## 🎯 Educational Purpose

Designed for **CMPG215: Cyber Security Fundamentals** at North-West University, this game teaches:
- Network topology and segmentation
- Vulnerability management
- Defense-in-depth strategies
- Reconnaissance vs. exploitation
- Operational security principles

Aligned with CyBOK (Cyber Security Body of Knowledge) framework.

## ✨ Key Features

- **Scan-Probe-Exploit** action sequence mirroring real cyber kill chains
- **Action Point economy** teaching resource management
- **Hidden information gameplay** modeling fog-of-war in cybersecurity
- **Multiple victory conditions** encouraging diverse strategies
- **Tool Card system** representing specialized cyber capabilities
- **Punk poster aesthetic** inspired by early 2000s hacker culture

## 🚀 Quick Start

### Play Online
Visit: [https://yourusername.github.io/access-denied-game/](https://yourusername.github.io/access-denied-game/)

### Run Locally
```bash
git clone https://github.com/yourusername/access-denied-game.git
cd access-denied-game
# Simply open src/index.html in your browser
# No build process required for basic prototype
```

## 🎨 Visual Style

Early 2000s cyber-brutalist aesthetic featuring:
- Matrix-inspired neon green (#00FF41)
- High-contrast black backgrounds
- Bold geometric patterns
- Terminal/command-line typography
- Hacker culture iconography

See [Visual Style Guide](docs/visual-style-guide.md) for complete specifications.

## 📚 Documentation

- [Game Design Document v2.0](docs/game-design-document-v2.md) - Complete game rules and mechanics
- [Visual Style Guide](docs/visual-style-guide.md) - Design specifications and aesthetic guidelines
- [Component Specifications](docs/component-specifications.md) - Physical and digital component details
- [Development Roadmap](docs/development-roadmap.md) - Planned features and milestones

## 🛠️ Technology Stack

- **Frontend**: Pure HTML5, CSS3, Vanilla JavaScript (no frameworks for simplicity)
- **Styling**: CSS Grid, Flexbox, CSS Custom Properties
- **Fonts**: Google Fonts (Roboto Mono, Courier Prime)
- **Hosting**: GitHub Pages
- **Version Control**: Git

## 🎲 Game Mechanics Overview

### Core Actions
- **SCAN (1 AP)**: Reconnaissance to detect server presence
- **PROBE (2 AP)**: Active intrusion revealing server type
- **EXPLOIT (3 AP)**: Attack vulnerable servers for compromise

### Victory Conditions
- Compromise 3 of 4 enemy servers
- Accumulate 12 Intelligence Tokens
- Trigger opponent's honeypot twice
- Survive to Round 12 with fewer compromises

### Components
- 4 Server types (Database, Web, Email, Infrastructure)
- 4 Vulnerability markers per player
- 4 Firewalls per player
- 1 Honeypot per player
- Tool Card deck (18 cards)

## 👥 Development Team

- **Michael De Jager** - Cybersecurity Content Expert
- **Lance Bunt** - Project Lead & Design
- **Klasie Botha** - Technical Implementation Expert

**Institution**: North-West University, School of Computer Science and Information Systems

## 📖 Research Context

This game is part of ongoing research into:
- Embodied cognition in cybersecurity education
- Game-based learning for technical subjects
- Culturally responsive pedagogy in South African context
- Serious game design principles

## 🤝 Contributing

This is an educational research project. If you're interested in contributing or adapting this for your own educational context, please reach out via Issues or email.

### Potential Contributions
- Playtesting feedback
- Bug reports
- Visual design improvements
- Additional scenario designs
- Translations/localizations

## 📜 License

MIT License - See LICENSE file for details

Copyright © 2025 North-West University

## 🔗 Links

- [Play the Game](https://yourusername.github.io/access-denied-game/)
- [Report Issues](https://github.com/yourusername/access-denied-game/issues)
- [CyBOK Framework](https://www.cybok.org/)
- [North-West University](https://www.nwu.ac.za/)

## 📧 Contact

For academic inquiries: lance.bunt@nwu.ac.za

---

**ACCESS DENIED!** - Teaching cybersecurity through strategic play.
```

---

## 📄 FILE 2: .gitignore
```
# OS generated files
.DS_Store
.DS_Store?
._*
.Spotlight-V100
.Trashes
ehthumbs.db
Thumbs.db

# IDE files
.vscode/
.idea/
*.swp
*.swo
*~

# Logs
*.log
npm-debug.log*

# Dependencies
node_modules/

# Build outputs
dist/
build/

# Temporary files
tmp/
temp/
*.tmp

# Environment variables
.env
.env.local

# Test coverage
coverage/

# Personal notes (not for repo)
NOTES.md
TODO.md
```

---

## 📄 FILE 3: LICENSE
```
MIT License

Copyright (c) 2025 Michael De Jager, Lance Bunt, Klasie Botha - North-West University

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

---

EDUCATIONAL USE NOTICE:
This game is designed for educational purposes in cybersecurity education.
While the code is open source, please attribute the original authors and
North-West University if you adapt this for your own educational context.
