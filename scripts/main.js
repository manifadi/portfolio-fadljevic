function calculateAndSetHeight() {
    // Header-Höhe ermitteln
    const headerHeight = document.querySelector('header').offsetHeight;
    
    // Verfügbare Höhe berechnen (Fensterhöhe minus Header)
    const availableHeight = window.innerHeight - headerHeight;
    
    // Hero-Section auf verfügbare Höhe setzen
    const heroSection = document.querySelector('.hero');
    heroSection.style.height = `${availableHeight}px`;
    
    // Bild-Container und Bild anpassen
    const heroImage = document.querySelector('.hero-image');
    heroImage.style.height = `${availableHeight}px`;
}

// Initial ausführen
document.addEventListener('DOMContentLoaded', calculateAndSetHeight);

// Bei Fenstergrößenänderung neu berechnen
window.addEventListener('resize', calculateAndSetHeight);

// Typing Animation hinzufügen
class TypeWriter {
    constructor(element, words, waitTime = 3000) {
        this.element = element;
        this.words = words;
        this.txt = '';
        this.wordIndex = 0;
        this.waitTime = waitTime;
        this.type();
        this.isDeleting = false;
    }

    type() {
        // Current word index
        const current = this.wordIndex % this.words.length;
        const fullTxt = this.words[current];

        // Check if deleting
        if(this.isDeleting) {
            // Remove char
            this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
            // Add char
            this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        // Insert txt into element
        this.element.innerHTML = this.txt;

        // Initial Type Speed
        let typeSpeed = 100;

        if(this.isDeleting) {
            typeSpeed /= 2; // Faster delete speed
        }

        // If word is complete
        if(!this.isDeleting && this.txt === fullTxt) {
            // Make pause at end
            typeSpeed = this.waitTime;
            // Set delete to true
            this.isDeleting = true;
        } else if(this.isDeleting && this.txt === '') {
            this.isDeleting = false;
            // Move to next word
            this.wordIndex++;
            // Pause before start typing
            typeSpeed = 500;
        }

        setTimeout(() => this.type(), typeSpeed);
    }
}

// Init On DOM Load
document.addEventListener('DOMContentLoaded', function() {
    // Bestehende calculateAndSetHeight-Funktion
    calculateAndSetHeight();

    // Typing Animation initialisieren
    const typeWriter = new TypeWriter(
        document.querySelector('.typing-text'),
        [
            'webdeveloper.',
            'UI/UX Designer.',
            'Fullstack Developer.',
            'Graphic Designer.'
        ],
        3000 // Wartezeit in ms bevor das Wort gelöscht wird
    );
});

// Bestehender resize Event Listener bleibt unverändert
window.addEventListener('resize', calculateAndSetHeight);

// Füge diese Funktionen am Ende der Datei hinzu
function createTransitionElement() {
    const transition = document.createElement('div');
    transition.className = 'page-transition';
    document.body.appendChild(transition);
    return transition;
}

function animatePageTransition(targetSection) {
    const transition = createTransitionElement();
    const heroSection = document.querySelector('.hero');
    const allSections = document.querySelectorAll('.hidden-section');
    const body = document.body;
    
    // Timeline für die Animation
    const tl = gsap.timeline();
    
    tl.to(transition, {
        scaleY: 1,
        duration: 0.5,
        ease: "power4.inOut"
    })
    .to(heroSection, {
        opacity: 0,
        duration: 0.1
    }, "-=0.3")
    .to(allSections, {
        opacity: 0,
        visibility: 'hidden',
        duration: 0.1
    }, "-=0.3")
    .add(() => {
        // Ändere Hintergrundfarbe wenn Portfolio Section aktiv
        if(targetSection.classList.contains('portfolio-section')) {
            body.style.backgroundColor = '#fff';
            document.querySelector('header').classList.add('lightmode');
            document.querySelector('#header-logo').src = "./assets/mfadljevic-logo-black.png";

        } else {
            body.style.backgroundColor = 'var(--background-color)';
            document.querySelector('header').classList.remove('lightmode');
            document.querySelector('#header-logo').src = "./assets/mfadljevic-logo-white.png";
        }
    })
    .to(targetSection, {
        opacity: 1,
        visibility: 'visible',
        duration: 0.1
    })
    .to(transition, {
        scaleY: 0,
        transformOrigin: 'top',
        duration: 0.5,
        ease: "power4.inOut"
    })
    .to(targetSection.querySelector('h1'), {
        opacity: 1,
        y: 0,
        duration: 0.5
    }, "-=0.3")
    .then(() => {
        transition.remove();
    });
}

// Event Listener für die Navigation
document.addEventListener('DOMContentLoaded', function() {
    // Logo-Klick Event Listener hinzufügen
    document.querySelector('.logo').addEventListener('click', function(e) {
        e.preventDefault();
        const heroSection = document.querySelector('.hero');
        animatePageTransition(heroSection);
    });

    // About-Links (Navigation und CTA Button)
    document.querySelectorAll('a[href="#about"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const aboutSection = document.querySelector('.about-section');
            animatePageTransition(aboutSection);
        });
    });

    // Portfolio-Links (Navigation und CTA Button)
    document.querySelectorAll('a[href="#portfolio"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const portfolioSection = document.querySelector('.portfolio-section');
            animatePageTransition(portfolioSection);
        });
    });
});

function handleNavigation(e) {
    e.preventDefault();
    const targetId = e.target.getAttribute('href').substring(1);
    const targetSection = document.querySelector(`.${targetId}-section`);
    
    // Entferne active von allen Sections
    document.querySelectorAll('.hidden-section, .hero').forEach(section => {
        section.classList.remove('section-active');
    });
    
    // Füge active zur Ziel-Section hinzu
    if (targetSection) {
        targetSection.classList.add('section-active');
        animatePageTransition(targetSection);
    }
}

// Event Listener für Navigation Links
document.querySelectorAll('.nav-links a, .cta-buttons a').forEach(link => {
    link.addEventListener('click', handleNavigation);
});