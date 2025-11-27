# ACCESS DENIED! Folder Structure

Complete directory organization for the project.
```
access-denied-game/
│
├── README.md                          # Main project documentation
├── LICENSE                            # MIT License
├── .gitignore                         # Git ignore rules
├── CONTRIBUTING.md                    # Contribution guidelines
│
├── docs/                              # Documentation
│   ├── game-design-document-v2.md     # Complete GDD
│   ├── visual-style-guide.md          # Design specifications
│   ├── component-specifications.md    # Component details
│   ├── development-roadmap.md         # Development plan
│   └── FOLDER_STRUCTURE.md            # This file
│
├── assets/                            # Static assets
│   ├── fonts/                         # Web fonts
│   │   ├── CourierPrime-Bold.woff2
│   │   ├── RobotoMono-Bold.woff2
│   │   └── fonts-license.txt
│   │
│   ├── images/                        # Images and graphics
│   │   ├── icons/                     # Game icons
│   │   │   ├── server-db.svg
│   │   │   ├── server-web.svg
│   │   │   ├── server-email.svg
│   │   │   ├── server-infra.svg
│   │   │   ├── firewall.svg
│   │   │   ├── honeypot.svg
│   │   │   └── vulnerability.svg
│   │   │
│   │   ├── patterns/                  # Background patterns
│   │   │   ├── circuit-board.svg
│   │   │   ├── binary-rain.svg
│   │   │   ├── grid-pattern.svg
│   │   │   └── scan-lines.svg
│   │   │
│   │   ├── cards/                     # Tool card images
│   │   │   ├── port-scanner.png
│   │   │   ├── exploit-kit.png
│   │   │   ├── firewall-bypass.png
│   │   │   └── honeypot-detector.png
│   │   │
│   │   └── logo/                      # Branding
│   │       ├── logo.svg
│   │       └── logo-small.png
│   │
│   ├── audio/                         # Sound effects (future)
│   │   └── .gitkeep
│   │
│   └── styles/                        # Shared CSS modules
│       ├── colors.css                 # Color system
│       ├── typography.css             # Font system
│       ├── animations.css             # Keyframe animations
│       └── patterns.css               # Repeating patterns
│
├── src/                               # Source code
│   ├── index.html                     # Main entry point
│   │
│   ├── css/                           # Stylesheets
│   │   ├── main.css                   # Global styles
│   │   ├── game-board.css             # Grid and board styles
│   │   ├── cards.css                  # Tool card styles
│   │   ├── components.css             # UI components
│   │   ├── animations.css             # Animation styles
│   │   └── responsive.css             # Mobile responsiveness
│   │
│   ├── js/                            # JavaScript modules
│   │   ├── game.js                    # Main game controller
│   │   ├── board.js                   # Board state management
│   │   ├── cards.js                   # Tool card system
│   │   ├── actions.js                 # Scan/Probe/Exploit logic
│   │   ├── ui.js                      # UI interactions
│   │   ├── audio.js                   # Sound management
│   │   ├── ai.js                      # AI opponent (future)
│   │   └── utils.js                   # Utility functions
│   │
│   └── components/                    # HTML component templates
│       ├── grid.html                  # Game board template
│       ├── card-templates.html        # Tool card templates
│       ├── reference-card.html        # Reference card
│       └── modal-templates.html       # Modal dialogs
│
├── prototype/                         # Iterative prototypes
│   ├── v1-basic-grid/                 # First grid prototype
│   │   ├── index.html
│   │   └── style.css
│   │
│   ├── v2-card-system/                # Card system prototype
│   │   ├── index.html
│   │   ├── style.css
│   │   └── cards.js
│   │
│   └── v3-full-game/                  # Full mechanics prototype
│       ├── index.html
│       ├── style.css
│       └── game.js
│
├── tests/                             # Testing (future)
│   ├── unit/                          # Unit tests
│   └── integration/                   # Integration tests
│
├── examples/                          # Example scenarios
│   ├── tutorial-game.html             # Guided tutorial
│   ├── scenario-01.html               # Practice scenario 1
│   └── scenario-02.html               # Practice scenario 2
│
└── package.json                       # npm configuration (if needed)
```
