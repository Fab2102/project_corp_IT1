// inserting navbar.html into the other html pages
const navContainer = document.querySelector(".target-nav");

fetch("/html/components/navbar.html")
  .then(res => res.text())
  .then(data => {
      if (navContainer) {
          navContainer.innerHTML = data;
          setupNavbar();
      }
  })
  .catch(error => console.error("Error loading navbar:", error));



// navbar js functions
function setupNavbar() {
    // Hamburger menu toggle
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (hamburger && mobileMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            mobileMenu.classList.toggle('active');
        });
    }

    // Set active links based on current URL
    const currentLocation = window.location.pathname;
    document.querySelectorAll(".nav-links a, .mobile-menu a").forEach(link => {
        if (link.href.includes(currentLocation)) {
            link.classList.add("active");
        }
    });
}