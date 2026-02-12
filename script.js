console.log('olá mundo');
const html = document.querySelector('html')
const menu_mobile = document.getElementById('menu_mobile');


function toggleMenu(){    
    if (menu_mobile.classList.contains('active')) {
        console.log('Menu está sendo fechado.');
        menu_mobile.classList.remove('active'); 
    } else {
        console.log('Menu está sendo aberto.');
        menu_mobile.classList.add('active'); 
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.portfolio_header button');
    const cards = document.querySelectorAll('.portfolio_card');

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');

            cards.forEach(card => {
                if (filter === 'all' || card.classList.contains(filter)) {
                    card.classList.remove('hide');
                } else {
                    card.classList.add('hide');
                }
            });

            buttons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
        });
    });
});

// ================================
// Cookie Banner Management
// ================================

class CookieManager {
    constructor() {
        this.storageKey = 'cookieConsent';
        this.banner = document.getElementById('cookie-banner');
        this.modal = document.getElementById('cookie-modal');
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.checkUserConsent();
    }

    setupEventListeners() {
        // Banner buttons
        document.getElementById('cookie-accept').addEventListener('click', () => this.acceptAll());
        document.getElementById('cookie-reject').addEventListener('click', () => this.rejectAll());
        document.getElementById('cookie-settings').addEventListener('click', () => this.openModal());
        
        // Modal buttons
        document.getElementById('cookie-modal-close').addEventListener('click', () => this.closeModal());
        document.getElementById('cookie-save').addEventListener('click', () => this.savePreferences());
        
        // Close modal when clicking outside
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.closeModal();
            }
        });
    }

    checkUserConsent() {
        const consent = localStorage.getItem(this.storageKey);
        if (consent) {
            this.hideBanner();
            console.log('Preferências de cookie carregadas:', JSON.parse(consent));
        }
    }

    acceptAll() {
        const preferences = {
            essentials: true,
            analytics: true,
            marketing: true,
            timestamp: new Date().toISOString()
        };
        this.saveConsent(preferences);
        this.hideBanner();
    }

    rejectAll() {
        const preferences = {
            essentials: true,
            analytics: false,
            marketing: false,
            timestamp: new Date().toISOString()
        };
        this.saveConsent(preferences);
        this.hideBanner();
    }

    openModal() {
        // Load current preferences
        const consent = JSON.parse(localStorage.getItem(this.storageKey)) || {
            essentials: true,
            analytics: false,
            marketing: false
        };
        
        document.getElementById('cookie-essentials').checked = consent.essentials;
        document.getElementById('cookie-analytics').checked = consent.analytics;
        document.getElementById('cookie-marketing').checked = consent.marketing;
        
        this.modal.classList.remove('hidden');
    }

    closeModal() {
        this.modal.classList.add('hidden');
    }

    savePreferences() {
        const preferences = {
            essentials: document.getElementById('cookie-essentials').checked,
            analytics: document.getElementById('cookie-analytics').checked,
            marketing: document.getElementById('cookie-marketing').checked,
            timestamp: new Date().toISOString()
        };
        this.saveConsent(preferences);
        this.closeModal();
        this.hideBanner();
    }

    saveConsent(preferences) {
        localStorage.setItem(this.storageKey, JSON.stringify(preferences));
        console.log('Preferências de cookie salvas:', preferences);
        
        // Track which cookies are enabled
        if (preferences.analytics) {
            console.log('Analytics habilitado');
        }
        if (preferences.marketing) {
            console.log('Marketing habilitado');
        }
    }

    hideBanner() {
        this.banner.classList.add('hidden');
    }

    showBanner() {
        this.banner.classList.remove('hidden');
    }

    resetConsent() {
        localStorage.removeItem(this.storageKey);
        this.showBanner();
        console.log('Cookies resetados');
    }
}

// Initialize cookie manager when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    window.cookieManager = new CookieManager();
});