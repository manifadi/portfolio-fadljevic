class LanguageManager {
    constructor() {
        this.currentLang = 'en';
        this.translations = null;
        this.init();
    }

    async init() {
        try {
            // Lade die Übersetzungen
            const response = await fetch('translations.json');
            this.translations = await response.json();
            
            // Initialisiere den Language Toggle
            this.setupLanguageToggle();
            
            // Setze die initiale Sprache
            this.setLanguage(this.currentLang);
        } catch (error) {
            console.error('Error loading translations:', error);
        }
    }

    setupLanguageToggle() {
        const langToggle = document.querySelector('.language-toggle');
        if (langToggle) {
            langToggle.addEventListener('click', () => {
                const newLang = this.currentLang === 'en' ? 'de' : 'en';
                this.setLanguage(newLang);
            });
        }
    }

    setLanguage(lang) {
        this.currentLang = lang;
        
        // Update UI elements
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const keys = element.getAttribute('data-i18n').split('.');
            let value = this.translations[lang];
            
            for (const key of keys) {
                if (value) value = value[key];
            }
            
            if (value) {
                if (element.tagName === 'INPUT' && element.type === 'placeholder') {
                    element.placeholder = value;
                } else {
                    element.textContent = value;
                }
            }
        });

        // Update language toggle button
        const currentLangSpan = document.querySelector('.current-lang');
        const otherLangSpan = document.querySelector('.other-lang');
        if (currentLangSpan && otherLangSpan) {
            currentLangSpan.textContent = lang.toUpperCase();
            otherLangSpan.textContent = (lang === 'en' ? 'DE' : 'EN');
        }

        // Speichere die Sprachauswahl
        localStorage.setItem('preferred-language', lang);
    }
}

// Initialisiere den LanguageManager wenn das DOM geladen ist
document.addEventListener('DOMContentLoaded', () => {
    window.languageManager = new LanguageManager();
});