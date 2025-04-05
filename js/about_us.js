// Function to check if element is in viewport
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Function to animate counter
function animateCounter(counter) {
    const target = parseInt(counter.getAttribute('data-target'));
    const duration = 1500; // Animation duration in milliseconds
    const steps = 50; // Number of steps in the animation
    const stepDuration = duration / steps;
    let current = 0;
    
    const increment = target / steps;
    
    const timer = setInterval(() => {
        current += increment;
        
        if (current >= target) {
            counter.textContent = target;
            clearInterval(timer);
        } else {
            counter.textContent = Math.floor(current);
        }
    }, stepDuration);
}

// Function to handle counter animation when section becomes visible
function handleCounterAnimation() {
    const impactSection = document.querySelector('.impact-section');
    const counters = document.querySelectorAll('.counter');
    let animated = false;

    // Function to start animation
    function startAnimation() {
        if (!animated && isElementInViewport(impactSection)) {
            impactSection.classList.add('visible');
            counters.forEach(counter => {
                animateCounter(counter);
            });
            animated = true;
            // Remove scroll listener once animation has played
            window.removeEventListener('scroll', startAnimation);
        }
    }

    // Check on scroll
    window.addEventListener('scroll', startAnimation);
    // Check on initial load
    startAnimation();
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', handleCounterAnimation); 