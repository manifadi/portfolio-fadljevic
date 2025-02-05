class PortfolioFilter {
    constructor() {
        this.filterButtons = document.querySelectorAll('.filter-btn');
        this.portfolioContents = document.querySelectorAll('.portfolio-content');
        this.init();
    }

    init() {
        this.filterButtons.forEach(btn => {
            btn.addEventListener('click', () => this.handleFilter(btn));
        });
    }

    handleFilter(clickedBtn) {
        this.filterButtons.forEach(btn => btn.classList.remove('active'));
        clickedBtn.classList.add('active');

        const filterValue = clickedBtn.dataset.filter;
        this.animateContentChange(filterValue);
    }

    animateContentChange(filterValue) {
        // Konvertiere filterValue zu einem gültigen Klassennamen
        const className = filterValue.toLowerCase().replace(/\s+/g, '-').replace('/', '');
        
        const currentContent = document.querySelector('.portfolio-content.active');
        const targetContent = document.querySelector(`.portfolio-content.${className}`);

        console.log('Debug:', {
            filterValue,
            className,
            currentContent,
            targetContent
        });

        if (!currentContent || !targetContent) {
            console.error('Content elements not found:', { filterValue, className });
            return;
        }

        const tl = gsap.timeline();

        tl.to(currentContent, {
            opacity: 0,
            y: -20,
            duration: 0.5,
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
            duration: 0.5,
            onStart: () => {
                targetContent.classList.add('active');
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const portfolioFilter = new PortfolioFilter();
});