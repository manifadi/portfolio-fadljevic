// Funktion zum Laden der Projekte aus der JSON-Datei
async function loadProjects() {
    try {
        // JSON-Datei laden
        const response = await fetch('./data/projects.json');
        const data = await response.json();
        
        if (!data.projects || data.projects.length === 0) {
            console.error('Keine Projekte in der JSON-Datei gefunden');
            return;
        }

        // Projekte nach Priorität sortieren
        const sortedProjects = [...data.projects].sort((a, b) => a.priority - b.priority);
        
        // Container für die Projekte auf der Hauptseite (nur die Top 4)
        const projectsContainer = document.getElementById('projects-container');
        if (projectsContainer) {
            // Nur die ersten 4 Projekte für die Hauptseite laden
            const topProjects = sortedProjects.slice(0, 4);
            
            topProjects.forEach(project => {
                const projectCard = document.createElement('div');
                projectCard.className = 'project-card';
                
                projectCard.innerHTML = `
                    <img src="${project.image}" alt="${project.title}" loading="lazy">
                    <div class="dark-background"></div>
                    <div class="project-info">
                        <h4>${project.title}</h4>
                        <p>${project.description}</p>
                        <a href="${project.url || '#'}" target="_blank" rel="noopener noreferrer" class="view-more">Website öffnen</a>
                    </div>
                `;
                
                // Projekt zum Container hinzufügen
                projectsContainer.appendChild(projectCard);
            });
            
            // Da es genau 4 Projekte sind, keine Scrollbar anzeigen
            projectsContainer.classList.add('no-scroll');
            
            // Höhe der Projektkarten anpassen
            adjustProjectHeight(projectsContainer, 2); // 2 Reihen für 4 Projekte
        }
        
        // Container für die Projekte im Portfolio-Bereich (alle Projekte)
        const portfolioWebsitesSection = document.querySelector('.portfolio-section.websites');
        if (portfolioWebsitesSection) {
            // Alle bestehenden Projekte entfernen (außer grid-sizer)
            const gridSizer = portfolioWebsitesSection.querySelector('.grid-sizer');
            portfolioWebsitesSection.innerHTML = '';
            if (gridSizer) {
                portfolioWebsitesSection.appendChild(gridSizer);
            }
            
            // Alle Projekte für den Portfolio-Bereich laden
            sortedProjects.forEach(project => {
                const portfolioItem = document.createElement('div');
                portfolioItem.className = 'portfolio-item';
                portfolioItem.setAttribute('data-category', project.category);
                
                // URL als data-Attribut hinzufügen, falls vorhanden
                if (project.url) {
                    portfolioItem.setAttribute('data-url', project.url);
                    portfolioItem.style.cursor = 'pointer';
                }
                
                portfolioItem.innerHTML = `
                    <img src="${project.image}" alt="${project.title}" loading="lazy">
                    <div class="portfolio-item-overlay">
                        <div class="portfolio-item-info">
                            <h3>${project.title}</h3>
                            <p>${project.description}</p>
                            <a href="${project.url || '#'}" target="_blank" rel="noopener noreferrer" class="view-more">Website öffnen →</a>
                        </div>
                    </div>
                `;
                
                // Klick-Event-Handler für das gesamte Portfolio-Item hinzufügen
                portfolioItem.addEventListener('click', function(e) {
                    // Nur wenn nicht auf den Link geklickt wurde
                    if (!e.target.closest('a')) {
                        const url = this.getAttribute('data-url');
                        if (url) {
                            window.open(url, '_blank', 'noopener,noreferrer');
                        }
                    }
                });
                
                // Projekt zum Portfolio-Container hinzufügen
                portfolioWebsitesSection.appendChild(portfolioItem);
            });
        }
    } catch (error) {
        console.error('Fehler beim Laden der Projekte:', error);
    }
}

// Funktion zur Anpassung der Projekthöhe
function adjustProjectHeight(container, numRows = 2) {
    if (!container) return;
    
    const projectCards = container.querySelectorAll('.project-card');
    
    if (projectCards.length > 0) {
        const containerHeight = container.offsetHeight;
        
        // Berechnung der optimalen Höhe für die Karten
        const optimalHeight = (containerHeight - ((numRows - 1) * 16)) / numRows; // 16px ist der Abstand (gap)
        
        // Höhe für alle Karten setzen
        projectCards.forEach(card => {
            card.style.height = `${optimalHeight}px`;
        });
    }
}

// Projekte laden, wenn das DOM geladen ist
document.addEventListener('DOMContentLoaded', loadProjects);

// Höhe anpassen, wenn das Fenster geladen oder die Größe geändert wird
window.addEventListener('load', () => {
    const projectsContainer = document.getElementById('projects-container');
    if (projectsContainer) {
        adjustProjectHeight(projectsContainer, 2);
    }
});
window.addEventListener('resize', () => {
    const projectsContainer = document.getElementById('projects-container');
    if (projectsContainer) {
        adjustProjectHeight(projectsContainer, 2);
    }
});