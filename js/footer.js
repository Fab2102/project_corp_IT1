function loadFooter() {
  const footerContainer = document.querySelector(".target-footer");

  fetch("/html/components/footer.html")
    .then((res) => res.text())
    .then((data) => {
      if (footerContainer) {
        footerContainer.innerHTML = data;
        setupNavbar();
      }
    })
    .catch((error) => console.error("Error loading footer:", error));
}

loadFooter();
