document.addEventListener("DOMContentLoaded", () => {
  const footerContainer = document.querySelector(".target-footer");

  if (!footerContainer) {
    console.warn("Footer container not found.");
    return;
  }

  fetch("/html/components/footer.html")
    .then((res) => {
      if (!res.ok) throw new Error("Failed to fetch footer");
      return res.text();
    })
    .then((data) => {
      footerContainer.innerHTML = data;
      // You could call footer-specific setup here if needed
    })
    .catch((error) => console.error("Error loading footer:", error));
});
