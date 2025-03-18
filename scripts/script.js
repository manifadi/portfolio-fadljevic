// Menü-Funktionalität für die Seiten-Navigation
document.addEventListener('DOMContentLoaded', function() {
    const menuItems = document.querySelectorAll('.side-menu .menu-item');
    const contentDiv = document.querySelector('.content');
    const portfolioContainer = document.querySelector('.portfolio-container');
    
    // Soziale Medien und Lebenslauf Links
    const socialLinks = {
        'linkedin': 'https://www.linkedin.com/in/manuel-fadljevic/',
        'github': 'https://github.com/manifadi',
        'instagram': 'https://www.instagram.com/_maneyy/',
        'cv': 'https://drive.google.com/file/d/1f1Oa18ebOX95dVLUpTGsB9y5XqMi4ldY/view?usp=sharing'
    };
    
    // Website-Projekt-Links (URLs für die einzelnen Website-Projekte)
    const websiteProjectLinks = {
        'Holza': 'https://www.holza.at',
        'GFS': 'https://www.golden-signals.com',
        'Coaching': 'https://nmt-enzendorfer.com/',
        'Yoga': 'https://www.yoga-touch.at'
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
        span.addEventListener('click', function(e) {
            e.stopPropagation(); // Verhindert, dass das Klick-Event zum Elternelement (project-card) weitergeleitet wird
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
    
    // Event-Listener für Website-Projekte auf der Profilseite
    const projectCards = document.querySelectorAll('.projects-box .project-card');
    projectCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // Wenn der Klick auf den View-More-Span erfolgt, nichts tun (der eigene Event-Listener kümmert sich darum)
            if (e.target.tagName === 'SPAN' && e.target.textContent.trim() === 'View more') {
                return;
            }
            
            // Projektname aus dem h4-Element extrahieren
            const projectName = this.querySelector('h4').textContent;
            
            // Prüfen, ob für dieses Projekt eine URL definiert ist
            if (websiteProjectLinks[projectName]) {
                // Website in einem neuen Tab öffnen
                window.open(websiteProjectLinks[projectName], '_blank');
                e.stopPropagation(); // Verhindert, dass andere Event-Listener ausgelöst werden
            }
        });
    });
    
    // Event-Listener für Website-Projekte im Portfolio-Bereich
    const portfolioWebsiteItems = document.querySelectorAll('.portfolio-section.websites .portfolio-item');
    portfolioWebsiteItems.forEach(item => {
        item.addEventListener('click', function(e) {
            // Wenn der Klick auf den View-More-Span erfolgt, nichts tun
            if (e.target.tagName === 'SPAN' && e.target.classList.contains('view-more')) {
                return;
            }
            
            // Projektname aus dem h3-Element extrahieren
            const projectName = this.querySelector('h3').textContent;
            
            // Prüfen, ob für dieses Projekt eine URL definiert ist
            if (websiteProjectLinks[projectName]) {
                // Website in einem neuen Tab öffnen
                window.open(websiteProjectLinks[projectName], '_blank');
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