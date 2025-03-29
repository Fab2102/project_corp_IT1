document.addEventListener("DOMContentLoaded", () => {
  const navContainer = document.querySelector(".target-nav");

  if (!navContainer) {
    console.warn("Navbar container not found.");
    return;
  }

  fetch("/html/components/navbar.html")
    .then((res) => {
      if (!res.ok) throw new Error("Failed to fetch navbar");
      return res.text();
    })
    .then((data) => {
      navContainer.innerHTML = data;
      setupNavbar();
    })
    .catch((error) => console.error("Error loading navbar:", error));
});

function setupNavbar() {
  const hamburger = document.querySelector(".hamburger");
  const mobileMenu = document.querySelector(".mobile-menu");

  if (hamburger && mobileMenu) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active");
      mobileMenu.classList.toggle("active");
    });
  } else {
    console.warn("Hamburger or mobile menu not found.");
  }

  // Highlight active nav link
  const currentPath = window.location.pathname;
  document.querySelectorAll(".nav-links a, .mobile-menu a").forEach((link) => {
    if (link.href.includes(currentPath)) {
      link.classList.add("active");
    }
  });
}
