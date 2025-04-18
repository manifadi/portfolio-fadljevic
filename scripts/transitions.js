document.addEventListener('DOMContentLoaded', function() {
    // Hauptelemente für die Übergänge
    const contentDiv = document.querySelector('.content');
    const profileContent = document.querySelector('.more-information-box');
    const portfolioContainer = document.querySelector('.portfolio-container');
    const titleBox = document.querySelector('.title-box');
    
    // Globale Funktionen für die Übergänge definieren
    window.pageTransitions = {
        // Übergang von Profil zu Portfolio
        toPortfolio: function() {
            // Title-Box Animation - schneller und flüssiger
            if (titleBox) {
                titleBox.style.transition = 'transform 0.4s cubic-bezier(0.25, 0.1, 0.25, 1), opacity 0.4s ease';
                titleBox.style.transform = 'translateX(-30px)';
                titleBox.style.opacity = '0';
            }
            
            // Profil ausblenden - schneller und flüssiger
            if (profileContent) {
                profileContent.style.transition = 'opacity 0.4s ease, transform 0.4s cubic-bezier(0.25, 0.1, 0.25, 1)';
                profileContent.style.opacity = '0';
                profileContent.style.transform = 'translateY(20px)';
            }
            
            // Nach kürzerer Verzögerung Portfolio einblenden
            setTimeout(() => {
                // Portfolio-Klasse hinzufügen
                if (contentDiv) {
                    contentDiv.classList.add('portfolio');
                }
                
                // Portfolio vorbereiten
                if (portfolioContainer) {
                    portfolioContainer.style.opacity = '0';
                    portfolioContainer.style.transform = 'translateY(20px)';
                    
                    // Portfolio einblenden - sofort starten
                    setTimeout(() => {
                        portfolioContainer.style.transition = 'opacity 0.5s ease, transform 0.5s cubic-bezier(0.25, 0.1, 0.25, 1)';
                        portfolioContainer.style.opacity = '1';
                        portfolioContainer.style.transform = 'translateY(0)';
                    }, 20); // Kürzere Verzögerung
                }
                
                // Title-Box zurücksetzen für spätere Verwendung
                if (titleBox) {
                    setTimeout(() => {
                        titleBox.style.transition = 'none';
                        titleBox.style.transform = 'translateX(30px)';
                        
                        setTimeout(() => {
                            titleBox.style.transition = 'transform 0.5s cubic-bezier(0.25, 0.1, 0.25, 1), opacity 0.5s ease';
                            titleBox.style.transform = 'translateX(0)';
                            titleBox.style.opacity = '1';
                        }, 20); // Kürzere Verzögerung
                    }, 200); // Kürzere Verzögerung
                }
            }, 300); // Kürzere Verzögerung für den Übergang
        },
        
        // Übergang von Portfolio zu Profil
        toProfile: function() {
            // Portfolio ausblenden - schneller und flüssiger
            if (portfolioContainer) {
                portfolioContainer.style.transition = 'opacity 0.4s ease, transform 0.4s cubic-bezier(0.25, 0.1, 0.25, 1)';
                portfolioContainer.style.opacity = '0';
                portfolioContainer.style.transform = 'translateY(20px)';
            }
            
            // Title-Box Animation - schneller und flüssiger
            if (titleBox) {
                titleBox.style.transition = 'transform 0.4s cubic-bezier(0.25, 0.1, 0.25, 1), opacity 0.4s ease';
                titleBox.style.transform = 'translateX(-30px)';
                titleBox.style.opacity = '0';
            }
            
            // Nach kürzerer Verzögerung Profil einblenden
            setTimeout(() => {
                // Portfolio-Klasse entfernen
                if (contentDiv) {
                    contentDiv.classList.remove('portfolio');
                }
                
                // Profil vorbereiten
                if (profileContent) {
                    profileContent.style.opacity = '0';
                    profileContent.style.transform = 'translateY(20px)';
                    
                    // Profil einblenden - sofort starten
                    setTimeout(() => {
                        profileContent.style.transition = 'opacity 0.5s ease, transform 0.5s cubic-bezier(0.25, 0.1, 0.25, 1)';
                        profileContent.style.opacity = '1';
                        profileContent.style.transform = 'translateY(0)';
                    }, 20); // Kürzere Verzögerung
                }
                
                // Title-Box wieder einblenden
                if (titleBox) {
                    setTimeout(() => {
                        titleBox.style.transition = 'none';
                        titleBox.style.transform = 'translateX(30px)';
                        
                        setTimeout(() => {
                            titleBox.style.transition = 'transform 0.5s cubic-bezier(0.25, 0.1, 0.25, 1), opacity 0.5s ease';
                            titleBox.style.transform = 'translateX(0)';
                            titleBox.style.opacity = '1';
                        }, 20); // Kürzere Verzögerung
                    }, 200); // Kürzere Verzögerung
                }
            }, 300); // Kürzere Verzögerung für den Übergang
        }
    };
    
    // Initialen Zustand setzen
    if (contentDiv && contentDiv.classList.contains('portfolio')) {
        if (portfolioContainer) {
            portfolioContainer.style.opacity = '1';
            portfolioContainer.style.transform = 'translateY(0)';
        }
        if (profileContent) {
            profileContent.style.opacity = '0';
        }
    } else {
        if (profileContent) {
            profileContent.style.opacity = '1';
            profileContent.style.transform = 'translateY(0)';
        }
    }
    
    // Sicherstellen, dass die title-box anfangs sichtbar ist
    if (titleBox) {
        titleBox.style.opacity = '1';
        titleBox.style.transform = 'translateX(0)';
    }
});