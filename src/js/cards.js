/* ============================================
   TOOL CARDS SYSTEM
   Card management, deck, hand, playing cards
   ============================================ */

const CardTypes = {
    PORT_SCANNER: {
        id: 'port-scanner',
        name: 'PORT SCANNER',
        type: 'RECON',
        icon: '📡',
        effect: 'Gain +1 SCAN this turn (Costs 0 AP)',
        timing: 'Play during Planning Phase',
        flavor: 'Map the terrain before the first strike.',
        count: 6
    },
    EXPLOIT_KIT: {
        id: 'exploit-kit',
        name: 'EXPLOIT KIT',
        type: 'ATTACK',
        icon: '⚡',
        effect: 'Convert 1 discovered vulnerability to BREACH without spending AP',
        timing: 'Play during Planning Phase',
        flavor: 'Strike fast when weakness reveals itself.',
        count: 4
    },
    FIREWALL_BYPASS: {
        id: 'firewall-bypass',
        name: 'FIREWALL BYPASS',
        type: 'EVASION',
        icon: '🔧',
        effect: 'Ignore 1 FIREWALL this turn',
        timing: 'Play during Planning or Reaction',
        flavor: 'Every wall has a door—find it or make one.',
        count: 4
    },
    HONEYPOT_DETECTOR: {
        id: 'honeypot-detector',
        name: 'HONEYPOT DETECTOR',
        type: 'ANALYSIS',
        icon: '🔍',
        effect: 'Before PROBING, ask if target contains HONEYPOT (Defender must answer truthfully)',
        timing: 'Play before Probe',
        flavor: 'Trust nothing. Verify everything.',
        count: 4
    }
};

class CardManager {
    constructor() {
        this.deck = [];
        this.hand = [];
        this.maxHandSize = 4;
        this.initializeDeck();
    }
    
    /**
     * Initialize the deck with all cards
     */
    initializeDeck() {
        this.deck = [];
        
        Object.values(CardTypes).forEach(cardType => {
            for (let i = 0; i < cardType.count; i++) {
                this.deck.push({
                    ...cardType,
                    instanceId: Utils.generateId()
                });
            }
        });
        
        this.shuffleDeck();
    }
    
    /**
     * Shuffle the deck
     */
    shuffleDeck() {
        this.deck = Utils.shuffle(this.deck);
    }
    
    /**
     * Draw cards from deck
     */
    drawCards(count = 1) {
        const drawnCards = [];
        
        for (let i = 0; i < count; i++) {
            if (this.deck.length === 0) {
                Utils.addLog('No more cards in deck', 'system');
                break;
            }
            
            if (this.hand.length >= this.maxHandSize) {
                Utils.addLog('Hand is full - cannot draw', 'warning');
                break;
            }
            
            const card = this.deck.pop();
            this.hand.push(card);
            drawnCards.push(card);
        }
        
        this.renderHand();
        return drawnCards;
    }
    
    /**
     * Play a card
     */
    playCard(instanceId) {
        const cardIndex = this.hand.findIndex(c => c.instanceId === instanceId);
        if (cardIndex === -1) {
            return null;
        }
        
        const card = this.hand[cardIndex];
        this.hand.splice(cardIndex, 1);
        
        this.renderHand();
        return card;
    }
    
    /**
     * Render hand in UI
     */
    renderHand() {
        const handContainer = document.getElementById('tool-cards-hand');
        handContainer.innerHTML = '';
        
        if (this.hand.length === 0) {
            handContainer.classList.add('empty');
            handContainer.innerHTML = '<div class="empty-hand-message">NO TOOL CARDS</div>';
            return;
        }
        
        handContainer.classList.remove('empty');
        
        this.hand.forEach(card => {
            const cardElement = this.createCardElement(card);
            handContainer.appendChild(cardElement);
        });
    }
    
    /**
     * Create card HTML element
     */
    createCardElement(card) {
        const cardDiv = document.createElement('div');
        cardDiv.className = `tool-card ${card.id}`;
        cardDiv.dataset.instanceId = card.instanceId;
        
        cardDiv.innerHTML = `
            <div class="card-header">
                <div class="card-type">[${card.type}]</div>
                <div class="card-title">${card.name}</div>
            </div>
            <div class="card-icon">${card.icon}</div>
            <div class="card-content">
                <div class="card-effect">${card.effect}</div>
                <div class="card-timing">${card.timing}</div>
            </div>
            <div class="card-footer">
                <div class="card-flavor">"${card.flavor}"</div>
            </div>
        `;
        
        // Add click handler
        cardDiv.addEventListener('click', () => {
            this.handleCardClick(card);
        });
        
        // Animate card draw
        setTimeout(() => {
            cardDiv.classList.add('just-drawn');
        }, 50);
        
        return cardDiv;
    }
    
    /**
     * Handle card click
     */
    handleCardClick(card) {
        // Implementation depends on card type
        Utils.showNotification(
            card.name,
            `Selected: ${card.effect}`,
            'info'
        );
        
        // For now, just highlight the card
        document.querySelectorAll('.tool-card').forEach(c => c.classList.remove('selected'));
        document.querySelector(`[data-instance-id="${card.instanceId}"]`).classList.add('selected');
    }
    
    /**
     * Get card by instance ID
     */
    getCard(instanceId) {
        return this.hand.find(c => c.instanceId === instanceId);
    }
}
