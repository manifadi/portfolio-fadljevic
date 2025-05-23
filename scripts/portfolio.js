// Masonry-Initialisierung für das Portfolio
document.addEventListener('DOMContentLoaded', function() {
    const contentDiv = document.querySelector('.content');
    const portfolioContainer = document.querySelector('.portfolio-container');
    
    // Globale Variable für Masonry-Instanzen
    window.masonryInstances = {}; // Mache masonryInstances global verfügbar
    
    // Funktion zur Initialisierung von Masonry
    function initMasonry() {
        if (document.querySelector('.portfolio-section')) {
            const sections = document.querySelectorAll('.portfolio-section');
            
            sections.forEach(section => {
                const sectionClass = section.classList[1]; // z.B. "websites", "graphic-design", "uiux"
                
                // Falls bereits eine Masonry-Instanz existiert, zerstöre sie
                if (window.masonryInstances[sectionClass]) {
                    window.masonryInstances[sectionClass].destroy();
                }
                
                // Neue Masonry-Instanz erstellen
                const masonry = new Masonry(section, {
                    itemSelector: '.portfolio-item',
                    columnWidth: '.grid-sizer',
                    percentPosition: true,
                    gutter: 20,
                    // Sorgt dafür, dass alle Elemente gleiche Höhe haben
                    fitWidth: false
                });
                
                // Speichere die Masonry-Instanz
                window.masonryInstances[sectionClass] = masonry;
                
                // Neu anordnen, nachdem Bilder geladen sind
                imagesLoaded(section, function() {
                    masonry.layout();
                });
            });
        }
    }
    
    // Menü-Funktionalität für Portfolio-Filter
    if (portfolioContainer) {
        const filterButtons = document.querySelectorAll('.filter-btn');
        
        // Wir verwenden jetzt die Übergangsfunktion aus portfolio-transitions.js
        // Dieser Code bleibt als Fallback, falls portfolio-transitions.js nicht geladen ist
        if (!window.transitionToSection) {
            filterButtons.forEach(button => {
                button.addEventListener('click', function() {
                    // Aktiven Button markieren
                    filterButtons.forEach(btn => btn.classList.remove('active'));
                    this.classList.add('active');
                    
                    // Entsprechende Sektion anzeigen
                    const filter = this.getAttribute('data-filter');
                    const sections = document.querySelectorAll('.portfolio-section');
                    
                    sections.forEach(section => {
                        section.classList.remove('active');
                        if (section.classList.contains(filter)) {
                            section.classList.add('active');
                            
                            // Masonry mit Verzögerung neu anordnen
                            setTimeout(() => {
                                if (window.masonryInstances && window.masonryInstances[filter]) {
                                    window.masonryInstances[filter].layout();
                                }
                            }, 150);
                        }
                    });
                });
            });
        }
    }
    
    // Initialisiere Masonry, wenn die Seite mit Portfolio-Ansicht geladen wird
    if (contentDiv.classList.contains('portfolio')) {
        setTimeout(initMasonry, 150);
    }
    
    // Event-Listener für den Portfolio-Menüpunkt hinzufügen
    const portfolioMenuItem = document.querySelector('.menu-item a[href="#portfolio"]').parentElement;
    if (portfolioMenuItem) {
        portfolioMenuItem.addEventListener('click', function() {
            setTimeout(initMasonry, 150);
        });
    }
    
    // NEU: Füge Klick-Event-Listener zu allen Portfolio-Items hinzu
    function addPortfolioItemClickHandlers() {
        document.querySelectorAll('.portfolio-item').forEach(item => {
            // Nur wenn das Item eine URL hat und noch keinen Klick-Handler
            if (item.getAttribute('data-url') && !item.hasAttribute('data-click-handler-added')) {
                item.setAttribute('data-click-handler-added', 'true');
                item.style.cursor = 'pointer';
                
                item.addEventListener('click', function(e) {
                    // Nur wenn nicht auf einen Link oder Button innerhalb des Items geklickt wurde
                    if (!e.target.closest('a') && !e.target.closest('button')) {
                        const url = this.getAttribute('data-url');
                        if (url) {
                            window.open(url, '_blank', 'noopener,noreferrer');
                        }
                    }
                });
            }
        });
    }
    
    // Rufe die Funktion beim Laden und nach Filteränderungen auf
    addPortfolioItemClickHandlers();
    
    // Event-Listener für Filter-Buttons, um Klick-Handler nach Filterwechsel hinzuzufügen
    document.querySelectorAll('.filter-btn').forEach(button => {
        button.addEventListener('click', function() {
            setTimeout(addPortfolioItemClickHandlers, 200);
        });
    });
});