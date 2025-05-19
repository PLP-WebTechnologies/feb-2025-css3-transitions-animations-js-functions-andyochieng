// script.js - JavaScript functionality for the interactive webpage

// Wait for the DOM to be fully loaded before executing code
document.addEventListener('DOMContentLoaded', function() {
    // ----- Theme Color Management with localStorage -----
    
    // Elements that will change color with theme
    const header = document.getElementById('main-header');
    const h2Elements = document.querySelectorAll('h2');
    const imageElements = document.querySelectorAll('.image-container img');
    const actionBtn = document.getElementById('animate-btn');
    const animationBox = document.getElementById('animation-box');
    
    // Get theme color from localStorage or use default
    const savedThemeColor = localStorage.getItem('themeColor') || '#4b6cb7';
    
    // Apply saved theme on page load
    applyThemeColor(savedThemeColor);
    
    // Add event listeners to theme buttons
    const themeButtons = document.querySelectorAll('.theme-btn');
    themeButtons.forEach(button => {
        // Set initial active state
        if (button.dataset.color === savedThemeColor) {
            button.style.boxShadow = '0 0 0 3px rgba(0, 0, 0, 0.2)';
        }
        
        // Add click event
        button.addEventListener('click', function() {
            const color = this.dataset.color;
            
            // Save to localStorage
            localStorage.setItem('themeColor', color);
            
            // Apply new theme color
            applyThemeColor(color);
            
            // Update active button appearance
            themeButtons.forEach(btn => {
                btn.style.boxShadow = btn.dataset.color === color ? 
                    '0 0 0 3px rgba(0, 0, 0, 0.2)' : 'none';
            });
        });
    });
    
    // Function to apply theme color to various elements
    function applyThemeColor(color) {
        // Update header background
        header.style.backgroundColor = color;
        
        // Update heading colors
        h2Elements.forEach(h2 => {
            h2.style.color = color;
        });
        
        // Update image borders
        imageElements.forEach(img => {
            img.style.borderColor = color;
        });
        
        // Update button and animation box colors
        actionBtn.style.backgroundColor = color;
        animationBox.style.backgroundColor = color;
    }
    
    // ----- Animation Box -----
    
    // Get animation preference from localStorage or use default
    const savedAnimation = localStorage.getItem('preferredAnimation') || 'bounce';
    
    // Animation button click handler
    const animateBtn = document.getElementById('animate-btn');
    animateBtn.addEventListener('click', function() {
        // Remove any existing animation classes
        animationBox.classList.remove('bounce', 'spin', 'pulse');
        
        // Get the saved animation preference
        const animation = localStorage.getItem('preferredAnimation') || 'bounce';
        
        // Apply the animation class
        animationBox.classList.add(animation);
        
        // Cycle through animations and save preference
        let nextAnimation;
        switch(animation) {
            case 'bounce':
                nextAnimation = 'spin';
                break;
            case 'spin':
                nextAnimation = 'pulse';
                break;
            default:
                nextAnimation = 'bounce';
        }
        
        // Save next animation preference
        localStorage.setItem('preferredAnimation', nextAnimation);
        
        // Remove animation class after it completes to allow re-triggering
        setTimeout(() => {
            animationBox.classList.remove(animation);
        }, 1000);
    });
    
    // ----- Check for and display previous visits -----
    
    // Record visit count
    const visitCount = parseInt(localStorage.getItem('visitCount') || '0') + 1;
    localStorage.setItem('visitCount', visitCount);
    
    // Record last visit time
    const lastVisit = localStorage.getItem('lastVisit');
    const currentTime = new Date().toString();
    localStorage.setItem('lastVisit', currentTime);
    
    // Display welcome message if not first visit
    if (visitCount > 1 && lastVisit) {
        const welcomeMsg = document.createElement('div');
        welcomeMsg.className = 'welcome-message';
        welcomeMsg.style.padding = '10px';
        welcomeMsg.style.margin = '20px';
        welcomeMsg.style.backgroundColor = '#f0f8ff';
        welcomeMsg.style.borderRadius = '5px';
        welcomeMsg.style.borderLeft = `4px solid ${savedThemeColor}`;
        welcomeMsg.innerHTML = `
            <p><strong>Welcome back!</strong> This is visit #${visitCount}.<br>
            Last visit: ${new Date(lastVisit).toLocaleString()}</p>
        `;
        
        // Insert after header
        const header = document.getElementById('main-header');
        header.parentNode.insertBefore(welcomeMsg, header.nextSibling);
    }
});
