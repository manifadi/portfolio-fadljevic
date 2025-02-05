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
            masonry.layout();
        });
    });

    // Event Listener für Filter Buttons
    const filterButtons = document.querySelectorAll('.filter-btn[data-filter="graphic"], .filter-btn[data-filter="uiux"]');
    
    filterButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const filterValue = this.getAttribute('data-filter');
            const content = document.querySelector(`.portfolio-content.${filterValue}`);
            
            if (content) {
                setTimeout(() => {
                    const grid = content.querySelector('.masonry-grid');
                    if (grid && masonryInstances.has(grid)) {
                        const masonry = masonryInstances.get(grid);
                        masonry.layout();
                    }
                }, 350);
            }
        });
    });

    // Debounced Resize Handler
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            masonryInstances.forEach(masonry => {
                const grid = masonry.element;
                const content = grid.closest('.portfolio-content');
                if (content && content.classList.contains('active')) {
                    masonry.layout();
                }
            });
        }, 150);
    });

    // Zusätzlicher Handler für iframe Laden
    const iframes = document.querySelectorAll('.portfolio-content.uiux iframe');
    iframes.forEach(iframe => {
        iframe.addEventListener('load', () => {
            const grid = iframe.closest('.masonry-grid');
            if (grid && masonryInstances.has(grid)) {
                const masonry = masonryInstances.get(grid);
                masonry.layout();
            }
        });
    });
});