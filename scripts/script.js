// Menü-Funktionalität für die Seiten-Navigation
document.addEventListener('DOMContentLoaded', function() {
    const menuItems = document.querySelectorAll('.side-menu .menu-item');
    const contentDiv = document.querySelector('.content');
    const portfolioContainer = document.querySelector('.portfolio-container');
    
    // Soziale Medien und Lebenslauf Links
    const socialLinks = {
        'linkedin': 'https://www.linkedin.com/in/manuel-fadljevic/', // Ersetzen Sie dies mit Ihrem tatsächlichen LinkedIn-Profil
        'github': 'https://github.com/manifadi', // Ersetzen Sie dies mit Ihrem tatsächlichen GitHub-Profil
        'instagram': 'https://www.instagram.com/_maneyy/', // Ersetzen Sie dies mit Ihrem tatsächlichen Instagram-Profil
        'cv': 'https://drive.google.com/file/d/1f1Oa18ebOX95dVLUpTGsB9y5XqMi4ldY/view?usp=sharing' // Ersetzen Sie dies mit Ihrem tatsächlichen Google Drive Link
    };
    
    // Initialer Zustand - Profil anzeigen
    if (contentDiv.classList.contains('portfolio')) {
        contentDiv.classList.remove('portfolio');
    }
    
    // Funktion zum Wechseln zur Portfolio-Ansicht
    function showPortfolio() {
        // Portfolio anzeigen
        contentDiv.classList.add('portfolio');
        
        // Aktiven Menüpunkt markieren (Portfolio)
        menuItems.forEach(mi => mi.classList.remove('active'));
        document.querySelector('.side-menu .menu-item a[href="#portfolio"]').parentElement.classList.add('active');
        
        // Masonry mit Verzögerung initialisieren
        setTimeout(initMasonry, 150);
    }
    
    // Event-Listener für die "View more" Links in den Projektkarten
    document.querySelector('.projects-box .view-more').addEventListener('click', function(e) {
        e.preventDefault();
        showPortfolio();
    });
    
    // Event-Listener für die "View more" Spans in den Projektkarten
    const projectViewMoreSpans = document.querySelectorAll('.projects-box .project-info span');
    projectViewMoreSpans.forEach(span => {
        span.addEventListener('click', function() {
            showPortfolio();
        });
    });
    
    // Menü-Navigation
    menuItems.forEach(item => {
        item.addEventListener('click', function(e) {
            const linkElement = this.querySelector('a');
            const target = linkElement.getAttribute('href').substring(1);
            
            // Prüfen, ob es sich um einen externen Link handelt
            if (['linkedin', 'github', 'instagram', 'cv'].includes(target)) {
                e.preventDefault(); // Verhindert das Standard-Link-Verhalten
                
                // Öffne den entsprechenden Link in einem neuen Tab
                if (socialLinks[target]) {
                    window.open(socialLinks[target], '_blank');
                }
                
                return; // Beende die Funktion hier, um keine weiteren Aktionen auszuführen
            }
            
            // Für interne Navigation (Profil, Portfolio)
            e.preventDefault();
            
            // Aktiven Menüpunkt markieren
            menuItems.forEach(mi => mi.classList.remove('active'));
            this.classList.add('active');
            
            // Seiten-Wechsel-Logik
            if (target === 'portfolio') {
                showPortfolio();
            } else if (target === 'profile') {
                // Profil anzeigen
                contentDiv.classList.remove('portfolio');
            }
        });
    });
    
    // Filter-Funktionalität für Portfolio
    if (portfolioContainer) {
        const filterButtons = document.querySelectorAll('.filter-btn');
        const sections = document.querySelectorAll('.portfolio-section');
        
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Aktiven Button markieren
                filterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                // Entsprechende Sektion anzeigen
                const filter = this.getAttribute('data-filter');
                sections.forEach(section => {
                    section.classList.remove('active');
                    if (section.classList.contains(filter)) {
                        section.classList.add('active');
                        
                        // Masonry mit Verzögerung neu anordnen
                        setTimeout(() => {
                            if (masonryInstances && masonryInstances[filter]) {
                                masonryInstances[filter].layout();
                            }
                        }, 150);
                    }
                });
            });
        });
    }
    
    // Globale Variable für Masonry-Instanzen
    let masonryInstances = {};
    
    // Funktion zur Initialisierung von Masonry
    function initMasonry() {
        if (document.querySelector('.portfolio-section')) {
            const sections = document.querySelectorAll('.portfolio-section');
            
            sections.forEach(section => {
                const sectionClass = section.classList[1]; // z.B. "websites", "graphic-design", "uiux"
                
                // Falls bereits eine Masonry-Instanz existiert, zerstöre sie
                if (masonryInstances[sectionClass]) {
                    masonryInstances[sectionClass].destroy();
                }
                
                // Neue Masonry-Instanz erstellen
                const masonry = new Masonry(section, {
                    itemSelector: '.portfolio-item',
                    columnWidth: '.grid-sizer',
                    percentPosition: true,
                    gutter: 20
                });
                
                // Speichere die Masonry-Instanz
                masonryInstances[sectionClass] = masonry;
                
                // Neu anordnen, nachdem Bilder geladen sind
                imagesLoaded(section, function() {
                    masonry.layout();
                });
            });
        }
    }
    
    // Initialisiere Masonry, wenn die Seite mit Portfolio-Ansicht geladen wird
    if (contentDiv.classList.contains('portfolio')) {
        setTimeout(initMasonry, 150);
    }
});