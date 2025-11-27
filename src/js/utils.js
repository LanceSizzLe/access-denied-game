/* ============================================
   UTILITY FUNCTIONS
   Helper functions used throughout the game
   ============================================ */

const Utils = {
    
    /**
     * Generate unique ID
     */
    generateId() {
        return `id_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    },
    
    /**
     * Get current timestamp for logs
     */
    getTimestamp() {
        const now = new Date();
        return `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;
    },
    
    /**
     * Delay/sleep function
     */
    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    },
    
    /**
     * Show notification
     */
    showNotification(title, message, type = 'info', duration = 3000) {
        const container = document.getElementById('notification-container');
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        
        notification.innerHTML = `
            <div class="notification-title">${title}</div>
            <div class="notification-message">${message}</div>
            <button class="notification-close">×</button>
        `;
        
        container.appendChild(notification);
        
        // Close button
        notification.querySelector('.notification-close').addEventListener('click', () => {
            notification.style.animation = 'fadeOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        });
        
        // Auto-remove
        if (duration > 0) {
            setTimeout(() => {
                if (notification.parentElement) {
                    notification.style.animation = 'fadeOut 0.3s ease';
                    setTimeout(() => notification.remove(), 300);
                }
            }, duration);
        }
        
        return notification;
    },
    
    /**
     * Show modal
     */
    showModal(content, onClose = null) {
        const overlay = document.getElementById('modal-overlay');
        const modalContent = document.getElementById('modal-content');
        
        modalContent.innerHTML = `
            <button class="modal-close">×</button>
            ${content}
        `;
        
        overlay.classList.remove('hidden');
        
        const closeBtn = modalContent.querySelector('.modal-close');
        const closeModal = () => {
            overlay.classList.add('hidden');
            if (onClose) onClose();
        };
        
        closeBtn.addEventListener('click', closeModal);
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) closeModal();
        });
    },
    
    /**
     * Coordinate conversion (e.g., "A1" to [0,0])
     */
    coordToIndex(coord) {
        const row = coord.charCodeAt(0) - 65; // A=0, B=1, etc.
        const col = parseInt(coord.substring(1)) - 1; // 1=0, 2=1, etc.
        return [row, col];
    },
    
    /**
     * Index to coordinate (e.g., [0,0] to "A1")
     */
    indexToCoord(row, col) {
        return `${String.fromCharCode(65 + row)}${col + 1}`;
    },
    
    /**
     * Random integer between min and max (inclusive)
     */
    randomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    
    /**
     * Shuffle array (Fisher-Yates)
     */
    shuffle(array) {
        const arr = [...array];
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    },
    
    /**
     * Log to activity log
     */
    addLog(message, type = 'system') {
        const logContent = document.getElementById('activity-log');
        const entry = document.createElement('div');
        entry.className = `log-entry ${type}`;
        entry.setAttribute('data-time', this.getTimestamp());
        entry.textContent = message;
        
        logContent.appendChild(entry);
        
        // Auto-scroll to bottom
        logContent.scrollTop = logContent.scrollHeight;
        
        // Limit log entries (keep last 50)
        const entries = logContent.querySelectorAll('.log-entry');
        if (entries.length > 50) {
            entries[0].remove();
        }
    },
    
    /**
     * Play sound effect (placeholder for future)
     */
    playSound(soundName) {
        // TODO: Implement sound effects
        console.log(`🔊 Sound: ${soundName}`);
    }
};
