class PortfolioFilter {
    constructor() {
        this.filterButtons = document.querySelectorAll('.filter-btn');
        this.portfolioContents = document.querySelectorAll('.portfolio-content');
        
        // Initiale Styles setzen
        this.portfolioContents.forEach(content => {
            if (!content.classList.contains('active')) {
                content.style.display = 'none';
                content.style.opacity = '0';
            }
        });
        
        // Statt this.init() direkt hier die Initialisierung
        this.initializeEventListeners();
    }

    // Neue Methode für Event Listener
    initializeEventListeners() {
        this.filterButtons.forEach(btn => {
            btn.addEventListener('click', () => this.handleFilter(btn));
        });
    }

    // Füge die fehlende handleFilter Methode hinzu
    handleFilter(clickedBtn) {
        this.filterButtons.forEach(btn => btn.classList.remove('active'));
        clickedBtn.classList.add('active');

        const filterValue = clickedBtn.dataset.filter;
        this.animateContentChange(filterValue);
    }

    animateContentChange(filterValue) {
        const className = filterValue.toLowerCase().replace(/\s+/g, '-').replace('/', '');
        const currentContent = document.querySelector('.portfolio-content.active');
        const targetContent = document.querySelector(`.portfolio-content.${className}`);

        if (!currentContent || !targetContent) {
            console.error('Content elements not found:', { filterValue, className });
            return;
        }

        // GSAP Timeline mit verbesserten Animationen
        const tl = gsap.timeline();

        tl.to(currentContent, {
            opacity: 0,
            y: -20,
            duration: 0.3,
            ease: "power2.out",
            onComplete: () => {
                currentContent.classList.remove('active');
                currentContent.style.display = 'none';
            }
        })
        .set(targetContent, {
            display: 'block',
            y: 20
        })
        .to(targetContent, {
            opacity: 1,
            y: 0,
            duration: 0.3,
            ease: "power2.out",
            onStart: () => {
                targetContent.classList.add('active');
            }
        });
    }
}

// Warten auf vollständiges Laden des DOMs und GSAP
document.addEventListener('DOMContentLoaded', () => {
    // Prüfen ob GSAP verfügbar ist
    if (typeof gsap === 'undefined') {
        console.error('GSAP is not loaded!');
        return;
    }
    
    const portfolioFilter = new PortfolioFilter();
});