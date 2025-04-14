// Menü-Funktionalität für die Seiten-Navigation
document.addEventListener('DOMContentLoaded', function() {
    const menuItems = document.querySelectorAll('.side-menu .menu-item');
    const contentDiv = document.querySelector('.content');
    const portfolioContainer = document.querySelector('.portfolio-container');
    
    setTimeout(function() {
        // Entferne die Transition-Klassen
        const contentElement = document.querySelector('.content');
        if (contentElement && contentElement.classList.contains('content-begin-transition')) {
            contentElement.classList.remove('content-begin-transition');
        }
        
        const menuElement = document.querySelector('.side-menu');
        if (menuElement && menuElement.classList.contains('menu-begin-transition')) {
            menuElement.classList.remove('menu-begin-transition');
        }
    }, 100); // 100ms Verzögerung für einen besseren visuellen Effekt

    // Soziale Medien und Lebenslauf Links
    const socialLinks = {
        'linkedin': 'https://www.linkedin.com/in/manuel-fadljevic/',
        'github': 'https://github.com/manifadi',
        'instagram': 'https://www.instagram.com/_maneyy/',
        'cv': 'https://drive.google.com/file/d/1D3lpFMqoU1El5InZ97wyD1jDT5tsvcu7/view?usp=sharing'
    };
    
    // Website-Projekt-Links (URLs für die einzelnen Website-Projekte)
    const websiteProjectLinks = {
        'Holza': 'https://www.holza.at',
        'GFS': 'https://www.golden-signals.com',
        'Coaching': 'https://nmt-enzendorfer.com/',
        'Yoga': 'https://www.yoga-touch.at'
    };
    
    // Übersetzungen für die Sprachumschaltung
    const translations = {
        en: {
            // Menü
            'tooltip.profile': 'Profile',
            'tooltip.portfolio': 'Portfolio',
            'tooltip.cv': 'Curriculum Vitae',
            
            // Profil-Bereich
            'profile.title': 'Digital Creative Specialist',
            'profile.bio': 'I\'m a 24 year old Media-Technologist. I have been programming and doing creative media for more than 8 years. I create professional websites.',
            'profile.location': 'Vienna, Austria',
            
            // Überschriften
            'section.technologies': 'Technologies',
            'section.tools': 'Tools',
            'section.projects': 'Projects',
            'section.experience': 'Experience',
            'section.education': 'Education',
            
            // Projekt-Beschreibungen
            'project.holza': 'Website for a musician called Holza',
            'project.gfs': 'Website for a finance company',
            'project.coaching': 'Website for a neuromental coach',
            'project.yoga': 'Website for a yoga instructor',
            'view.more': 'view more →',
            
            // Portfolio-Bereich
            'portfolio.title': 'Portfolio',
            'portfolio.websites': 'Websites',
            'portfolio.graphic': 'Graphic Design',
            'portfolio.uiux': 'UI/UX',
            
            // Portfolio-Projekt-Beschreibungen
            'portfolio.holza': 'Website for a musician',
            'portfolio.gfs': 'Website for a finance company',
            'portfolio.coaching': 'Website for a neuromental coach',
            'portfolio.yoga': 'Website for a yoga instructor',
            'portfolio.view.more': 'View more →',
            
            // Erfahrung und Ausbildung
            'experience.marketing': 'Marketing',
            'experience.media': 'Media Assistant',
            'experience.intern': 'Intern',
            'education.bachelor': 'Bachelor of Science',
            
            // Sprach-Umschalter
            'language.tooltip': 'Umstellen auf Deutsch',
            
            // Figma-Platzhalter
            'figma.design': 'Figma Design',
            'figma.load': 'Load Design'
        },
        de: {
            // Menü
            'tooltip.profile': 'Profil',
            'tooltip.portfolio': 'Portfolio',
            'tooltip.cv': 'Lebenslauf',
            
            // Profil-Bereich
            'profile.title': 'Digital Creative Specialist',
            'profile.bio': 'Ich bin ein 24-jähriger Medien-Technologe. Ich programmiere und erstelle kreative Medien seit mehr als 8 Jahren. Ich entwickle professionelle Websites.',
            'profile.location': 'Wien, Österreich',
            
            // Überschriften
            'section.technologies': 'Technologien',
            'section.tools': 'Werkzeuge',
            'section.projects': 'Projekte',
            'section.experience': 'Erfahrung',
            'section.education': 'Ausbildung',
            
            // Projekt-Beschreibungen
            'project.holza': 'Website für einen Musiker namens Holza',
            'project.gfs': 'Website für ein Finanzunternehmen',
            'project.coaching': 'Website für einen Neuromental-Coach',
            'project.yoga': 'Website für eine Yoga-Lehrerin',
            'view.more': 'mehr anzeigen →',
            
            // Portfolio-Bereich
            'portfolio.title': 'Portfolio',
            'portfolio.websites': 'Webseiten',
            'portfolio.graphic': 'Grafikdesign',
            'portfolio.uiux': 'UI/UX',
            
            // Portfolio-Projekt-Beschreibungen
            'portfolio.holza': 'Website für einen Musiker',
            'portfolio.gfs': 'Website für ein Finanzunternehmen',
            'portfolio.coaching': 'Website für einen Neuromental-Coach',
            'portfolio.yoga': 'Website für eine Yoga-Lehrerin',
            'portfolio.view.more': 'Mehr anzeigen →',
            
            // Erfahrung und Ausbildung
            'experience.marketing': 'Marketing',
            'experience.media': 'Medien-Assistent',
            'experience.intern': 'Praktikant',
            'education.bachelor': 'Bachelor of Science',
            
            // Sprach-Umschalter
            'language.tooltip': 'Switch to English',
            
            // Figma-Platzhalter
            'figma.design': 'Figma Design',
            'figma.load': 'Design laden'
        }
    };
    
    // Aktuelle Sprache (Standard: Englisch)
    let currentLanguage = 'en';
    
    // Funktion zur Aktualisierung der Sprache
    function updateLanguage(language) {
        currentLanguage = language;
        
        // Sprach-Umschalter aktualisieren
        const languageSelector = document.querySelector('.language-selector span');
        languageSelector.textContent = language.toUpperCase();
        languageSelector.setAttribute('data-tooltip', translations[language]['language.tooltip']);
        
        // Menü-Tooltips aktualisieren
        document.querySelector('.menu-item a[href="#profile"] .tooltip').textContent = translations[language]['tooltip.profile'];
        document.querySelector('.menu-item a[href="#portfolio"] .tooltip').textContent = translations[language]['tooltip.portfolio'];
        document.querySelector('.menu-item a[href="#cv"] .tooltip').textContent = translations[language]['tooltip.cv'];
        
        // Profil-Bereich aktualisieren
        document.querySelector('.profile-info h2').textContent = translations[language]['profile.title'];
        document.querySelector('.profile-info .bio').textContent = translations[language]['profile.bio'];
        document.querySelector('.profile-info .location').innerHTML = `<i class="fas fa-map-marker-alt"></i> ${translations[language]['profile.location']}`;
        
        // Überschriften aktualisieren
        document.querySelector('.tech-box .box-header h3').textContent = translations[language]['section.technologies'];
        document.querySelector('.tools-box .box-header h3').textContent = translations[language]['section.tools'];
        document.querySelector('.projects-box .box-header h3').textContent = translations[language]['section.projects'];
        document.querySelector('.experience-box .box-header h3').textContent = translations[language]['section.experience'];
        document.querySelector('.education .box-header h3').textContent = translations[language]['section.education'];
        
        // Projekt-Beschreibungen aktualisieren
        const projectCards = document.querySelectorAll('.projects-box .project-card');
        projectCards.forEach(card => {
            const projectName = card.querySelector('h4').textContent;
            const projectKey = projectName.toLowerCase();
            if (translations[language][`project.${projectKey}`]) {
                card.querySelector('p').textContent = translations[language][`project.${projectKey}`];
            }
        });
        
        // "View more" Link aktualisieren
        document.querySelector('.projects-box .view-more').textContent = translations[language]['view.more'];
        document.querySelectorAll('.projects-box .project-info span').forEach(span => {
            span.textContent = translations[language]['view.more'].split(' ')[0] + ' ' + translations[language]['view.more'].split(' ')[1];
        });
        
        // Portfolio-Bereich aktualisieren
        if (document.querySelector('.portfolio-header h1')) {
            document.querySelector('.portfolio-header h1').textContent = translations[language]['portfolio.title'];
            document.querySelector('.filter-btn[data-filter="websites"]').textContent = translations[language]['portfolio.websites'];
            document.querySelector('.filter-btn[data-filter="graphic-design"]').textContent = translations[language]['portfolio.graphic'];
            document.querySelector('.filter-btn[data-filter="uiux"]').textContent = translations[language]['portfolio.uiux'];
        }
        
        // Portfolio-Projekt-Beschreibungen aktualisieren
        const portfolioItems = document.querySelectorAll('.portfolio-section.websites .portfolio-item');
        portfolioItems.forEach(item => {
            const projectName = item.querySelector('h3').textContent;
            const projectKey = projectName.toLowerCase();
            if (translations[language][`portfolio.${projectKey}`]) {
                item.querySelector('p').textContent = translations[language][`portfolio.${projectKey}`];
            }
            item.querySelector('.view-more').textContent = translations[language]['portfolio.view.more'];
        });
        
        // Figma-Platzhalter aktualisieren
        document.querySelectorAll('.figma-loading p').forEach(p => {
            p.textContent = translations[language]['figma.design'];
        });
        
        document.querySelectorAll('.load-figma-btn').forEach(btn => {
            btn.textContent = translations[language]['figma.load'];
        });
        
        // Erfahrung und Ausbildung aktualisieren
        document.querySelectorAll('.experience-entry').forEach(entry => {
            const title = entry.querySelector('h4').textContent;
            if (title === 'Marketing' || title === translations.de['experience.marketing']) {
                entry.querySelector('h4').textContent = translations[language]['experience.marketing'];
            } else if (title === 'Media Assistant' || title === translations.de['experience.media']) {
                entry.querySelector('h4').textContent = translations[language]['experience.media'];
            }
            
            // Intern-Text aktualisieren
            const dateText = entry.querySelector('.date').textContent;
            if (dateText.includes('Intern') || dateText.includes(translations.de['experience.intern'])) {
                const updatedText = dateText.replace('Intern', translations[language]['experience.intern'])
                                          .replace(translations.de['experience.intern'], translations[language]['experience.intern']);
                entry.querySelector('.date').textContent = updatedText;
            }
        });
        
        // Ausbildung aktualisieren
        document.querySelector('.education-entry h4').textContent = translations[language]['education.bachelor'];
        
        // Meta-Title aktualisieren (optional)
        document.title = `Manuel Fadljevic - ${translations[language]['profile.title']}`;
        
        // Speichern der Spracheinstellung im localStorage
        localStorage.setItem('preferredLanguage', language);
    }
    
    // Initialer Zustand - Profil anzeigen
    if (contentDiv.classList.contains('portfolio')) {
        contentDiv.classList.remove('portfolio');
    }
    
    // Optimierte Funktion zum Wechseln zur Portfolio-Ansicht
    function showPortfolio() {
        // Portfolio anzeigen
        contentDiv.classList.add('portfolio');
        
        // Aktiven Menüpunkt markieren (Portfolio)
        menuItems.forEach(mi => mi.classList.remove('active'));
        document.querySelector('.side-menu .menu-item a[href="#portfolio"]').parentElement.classList.add('active');
        
        // Verzögertes Laden der Portfolio-Inhalte
        setTimeout(() => {
            // Nur die aktiv sichtbare Sektion initialisieren
            const activeSection = document.querySelector('.portfolio-section.active');
            if (activeSection) {
                const sectionClass = activeSection.classList[1];
                initMasonryForSection(activeSection, sectionClass);
                
                // Lazy-Load für Figma-Frames
                if (sectionClass === 'uiux') {
                    lazyLoadFigmaFrames();
                }
            }
        }, 300);
    }
    
    // Funktion zum verzögerten Laden der Figma-iFrames
    function lazyLoadFigmaFrames() {
        // Alle iframe-Container im UI/UX-Bereich
        const iframeContainers = document.querySelectorAll('.portfolio-section.uiux .portfolio-item');
        
        iframeContainers.forEach(container => {
            // Prüfen, ob bereits ein Platzhalter erstellt wurde
            if (container.querySelector('.figma-placeholder')) {
                return;
            }
            
            // Daten-Attribute für die Figma-URLs speichern
            const figmaFrame = container.querySelector('iframe');
            if (figmaFrame) {
                const figmaSrc = figmaFrame.getAttribute('src');
                
                // Iframe-Quellcode entfernen und durch Platzhalter ersetzen
                container.innerHTML = `
                    <div class="figma-placeholder">
                        <div class="figma-loading">
                            <p>${translations[currentLanguage]['figma.design']}</p>
                            <button class="load-figma-btn">${translations[currentLanguage]['figma.load']}</button>
                        </div>
                    </div>
                `;
                
                // Speichere die Figma-URL als Datenattribut
                container.setAttribute('data-figma-src', figmaSrc);
                
                // Event-Listener für den Lade-Button
                const loadButton = container.querySelector('.load-figma-btn');
                loadButton.addEventListener('click', function() {
                    // Iframe erst beim Klick laden
                    container.innerHTML = `<iframe style="border: 1px solid rgba(0, 0, 0, 0.1);" width="800" height="450" src="${figmaSrc}" allowfullscreen></iframe>`;
                });
            }
        });
    }
    
    // Optimierte Masonry-Initialisierung nur für eine Sektion
    function initMasonryForSection(section, sectionClass) {
        // Prüfen, ob Masonry bereits initialisiert wurde
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
        // Lazy Loading für Projektbilder
        const img = card.querySelector('img');
        if (img && !img.hasAttribute('loading')) {
            img.setAttribute('loading', 'lazy');
        }
        
        card.addEventListener('click', function(e) {
            // Wenn der Klick auf den View-More-Span erfolgt, nichts tun (der eigene Event-Listener kümmert sich darum)
            if (e.target.tagName === 'SPAN' && e.target.textContent.trim().startsWith('View') || 
                e.target.tagName === 'SPAN' && e.target.textContent.trim().startsWith('mehr')) {
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
        // Lazy Loading für Portfolio-Bilder
        const img = item.querySelector('img');
        if (img && !img.hasAttribute('loading')) {
            img.setAttribute('loading', 'lazy');
        }
        
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
    
    // Optimierte Filter-Funktionalität für Portfolio
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
                        
                        // Verzögertes Laden der Inhalte
                        setTimeout(() => {
                            initMasonryForSection(section, filter);
                            
                            // Lazy-Load für Figma-Frames wenn UI/UX ausgewählt
                            if (filter === 'uiux') {
                                lazyLoadFigmaFrames();
                            }
                        }, 100);
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
            const sections = document.querySelectorAll('.portfolio-section.active');
            
            sections.forEach(section => {
                const sectionClass = section.classList[1]; // z.B. "websites", "graphic-design", "uiux"
                initMasonryForSection(section, sectionClass);
                
                // Lazy-Load für Figma-Frames wenn UI/UX ausgewählt
                if (sectionClass === 'uiux') {
                    lazyLoadFigmaFrames();
                }
            });
        }
    }
    
    // Initialisiere Masonry, wenn die Seite mit Portfolio-Ansicht geladen wird
    if (contentDiv.classList.contains('portfolio')) {
        setTimeout(initMasonry, 300);
    }
    
    // Sprachumschaltung einrichten
    const languageSelector = document.querySelector('.language-selector');
    if (languageSelector) {
        // Tooltip für den Sprachumschalter hinzufügen
        const languageSpan = languageSelector.querySelector('span');
        languageSpan.setAttribute('data-tooltip', translations[currentLanguage]['language.tooltip']);
        
        // Event-Listener für Sprachumschaltung
        languageSelector.addEventListener('click', function() {
            // Sprache umschalten
            const newLanguage = currentLanguage === 'en' ? 'de' : 'en';
            updateLanguage(newLanguage);
        });
        
        // Gespeicherte Spracheinstellung aus localStorage laden
        const savedLanguage = localStorage.getItem('preferredLanguage');
        if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'de')) {
            updateLanguage(savedLanguage);
        }
    }
    
    // Lazy Loading für alle Bilder im Dokument
    document.querySelectorAll('img').forEach(img => {
        if (!img.hasAttribute('loading')) {
            img.setAttribute('loading', 'lazy');
        }
    });
});