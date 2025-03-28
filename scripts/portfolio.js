// Masonry-Initialisierung für das Portfolio
document.addEventListener('DOMContentLoaded', function() {
    const contentDiv = document.querySelector('.content');
    const portfolioContainer = document.querySelector('.portfolio-container');
    
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
                    gutter: 20,
                    // Sorgt dafür, dass alle Elemente gleiche Höhe haben
                    fitWidth: false
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
    
    // Menü-Funktionalität für Portfolio-Filter
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
});