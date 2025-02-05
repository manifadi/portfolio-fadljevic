document.addEventListener('DOMContentLoaded', function() {
    const grids = document.querySelectorAll('.masonry-grid');
    let masonryInstances = new Map(); // Speichert Masonry-Instanzen für jeden Grid
    
    // Initialisiere Masonry für alle Grids
    grids.forEach(grid => {
        if (!grid) return;

        // Füge grid-sizer Element hinzu
        const sizerElement = document.createElement('div');
        sizerElement.className = 'grid-sizer';
        grid.insertBefore(sizerElement, grid.firstChild);

        // Masonry Initialisierung mit optimierten Optionen
        const masonry = new Masonry(grid, {
            itemSelector: '.grid-item',
            columnWidth: '.grid-sizer',
            percentPosition: true,
            gutter: 0,
            initLayout: false,
            transitionDuration: '0.3s',
            stagger: 30,
            resize: true
        });

        // Speichere die Masonry-Instanz
        masonryInstances.set(grid, masonry);

        // ImagesLoaded für besseres Laden
        imagesLoaded(grid, function() {
            grid.style.opacity = "1";
        });
    });

    // Event Listener für Filter Buttons
    const graphicFilterBtn = document.querySelector('.filter-btn[data-filter="graphic"]');
    if (graphicFilterBtn) {
        graphicFilterBtn.addEventListener('click', function() {
            // Finde den zugehörigen Content
            const graphicContent = document.querySelector('.portfolio-content.graphic');
            if (graphicContent) {
                // Kurze Verzögerung für Animation
                setTimeout(() => {
                    // Finde das Masonry-Grid innerhalb des Contents
                    const grid = graphicContent.querySelector('.masonry-grid');
                    if (grid && masonryInstances.has(grid)) {
                        const masonry = masonryInstances.get(grid);
                        masonry.layout();
                    }
                }, 350); // Kleine Verzögerung für bessere Transition
            }
        });
    }

    // Debounced Resize Handler
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            masonryInstances.forEach(masonry => {
                const grid = masonry.element;
                const content = grid.closest('.portfolio-content');
                // Nur Layout updaten wenn der Content sichtbar ist
                if (content && content.classList.contains('active')) {
                    masonry.layout();
                }
            });
        }, 150);
    });
});