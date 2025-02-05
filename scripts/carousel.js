class ProjectCarousel {
    constructor() {
        this.container = document.querySelector('.carousel-container');
        this.slides = Array.from(document.querySelectorAll('.project-slide'));
        this.dotsContainer = document.querySelector('.carousel-nav');
        this.currentIndex = 1;
        this.isAnimating = false;
        
        // Touch-Events Variablen
        this.touchStartX = 0;
        this.touchEndX = 0;
        this.minSwipeDistance = 50;
        
        // Initialisierung
        this.init();
    }

    init() {
        if (!this.container || !this.slides.length) return;
        
        this.createNavigationDots();
        
        // Click Events - nur auf die Slides
        this.slides.forEach((slide, index) => {
            slide.addEventListener('click', () => this.handleSlideClick(index));
        });

        // Touch Events
        this.container.addEventListener('touchstart', (e) => this.handleTouchStart(e), { passive: true });
        this.container.addEventListener('touchmove', (e) => this.handleTouchMove(e), { passive: true });
        this.container.addEventListener('touchend', (e) => this.handleTouchEnd(e), { passive: true });

        // Initial Update
        this.updateCarousel();
    }

    // Neue Touch-Event Handler
    handleTouchStart(e) {
        this.touchStartX = e.touches[0].clientX;
    }

    handleTouchMove(e) {
        this.touchEndX = e.touches[0].clientX;
    }

    handleTouchEnd(e) {
        if (!this.touchStartX || !this.touchEndX) return;

        const swipeDistance = this.touchEndX - this.touchStartX;
        const isSignificantSwipe = Math.abs(swipeDistance) > this.minSwipeDistance;

        if (isSignificantSwipe) {
            if (swipeDistance > 0) {
                // Swipe nach rechts - vorherige Slide
                this.goToPrevSlide();
            } else {
                // Swipe nach links - nächste Slide
                this.goToNextSlide();
            }
        }

        // Reset touch values
        this.touchStartX = 0;
        this.touchEndX = 0;
    }

    createNavigationDots() {
        if (!this.dotsContainer) return;
        
        this.dotsContainer.innerHTML = '';
        
        this.slides.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.className = 'nav-dot';
            dot.addEventListener('click', () => this.goToSlide(index));
            this.dotsContainer.appendChild(dot);
        });
        
        this.dots = Array.from(this.dotsContainer.querySelectorAll('.nav-dot'));
    }

    handleSlideClick(clickedIndex) {
        if (this.isAnimating) return;
        const clickedSlide = this.slides[clickedIndex];
        
        if (clickedSlide.classList.contains('current')) {
            const url = clickedSlide.dataset.url;
            
            const hasValidUrl = url && url.toLowerCase().includes('http');
            if (hasValidUrl) {
                window.open(url, '_blank');
            }
            return;
        }
        
        if (clickedSlide.classList.contains('prev')) {
            this.goToPrevSlide();
        } else if (clickedSlide.classList.contains('next')) {
            this.goToNextSlide();
        }
    }

    updateCarousel(animate = true) {
        if (this.isAnimating) return;

        if (animate) {
            this.isAnimating = true;
            setTimeout(() => { this.isAnimating = false; }, 500);
        }

        this.slides.forEach(slide => {
            slide.classList.remove('prev', 'current', 'next');
            slide.style.transition = animate ? 'all 0.5s ease-in-out' : 'none';
        });

        const prevIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
        const nextIndex = (this.currentIndex + 1) % this.slides.length;

        this.slides[prevIndex].classList.add('prev');
        this.slides[this.currentIndex].classList.add('current');
        this.slides[nextIndex].classList.add('next');

        if (this.dots) {
            this.dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === this.currentIndex);
            });
        }
        document.dispatchEvent(new CustomEvent('slideChanged'));
    }

    goToNextSlide() {
        if (this.isAnimating) return;
        this.currentIndex = (this.currentIndex + 1) % this.slides.length;
        this.updateCarousel();
    }

    goToPrevSlide() {
        if (this.isAnimating) return;
        this.currentIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
        this.updateCarousel();
    }

    goToSlide(index) {
        if (this.isAnimating || this.currentIndex === index) return;
        this.currentIndex = index;
        this.updateCarousel();
    }
}

// Warte auf DOM-Load
document.addEventListener('DOMContentLoaded', () => {
    const carousel = new ProjectCarousel();
});

// Hover-Mauszeiger-Projekt-Positionierung
document.addEventListener('DOMContentLoaded', function() {
    const hoverBox = document.querySelector('.project-hover-box');
    const carouselContainer = document.querySelector('.carousel-container');
    let isHovering = false;
    let lastMouseEvent = null;

    function updateHoverBoxPosition(e) {
        if (e) {
            lastMouseEvent = e;
        } else if (!lastMouseEvent) {
            return;
        }

        const currentEvent = e || lastMouseEvent;

        // Prüfe, ob der Mauszeiger über dem aktuellen Slide ist
        const currentSlide = document.querySelector('.project-slide.current');
        
        // Prüfe die data-url des aktuellen Slides
        const slideUrl = currentSlide.dataset.url;
        const hasValidUrl = slideUrl && slideUrl.toLowerCase().includes('http');
        
        const slideRect = currentSlide.getBoundingClientRect();
        const isOverCurrentSlide = (
            currentEvent.clientX >= slideRect.left &&
            currentEvent.clientX <= slideRect.right &&
            currentEvent.clientY >= slideRect.top &&
            currentEvent.clientY <= slideRect.bottom
        );

        // Aktualisiere isHovering nur wenn eine gültige URL vorhanden ist
        isHovering = isOverCurrentSlide && hasValidUrl;
        hoverBox.style.opacity = isHovering ? '1' : '0';
        
        if (!isHovering) return;
        
        const containerRect = carouselContainer.getBoundingClientRect();
        const relativeX = currentEvent.clientX + window.scrollX - containerRect.left;
        const relativeY = currentEvent.clientY + window.scrollY - containerRect.top;
        const offset = 10;

        hoverBox.style.left = `${relativeX + offset}px`;
        hoverBox.style.top = `${currentEvent.clientY - containerRect.top + offset}px`;
    }

    carouselContainer.addEventListener('mousemove', updateHoverBoxPosition);

    window.addEventListener('scroll', () => {
        if (isHovering) {
            updateHoverBoxPosition();
        }
    });

    document.addEventListener('slideChanged', () => {
        isHovering = false;
        hoverBox.style.opacity = '0';
    });
});