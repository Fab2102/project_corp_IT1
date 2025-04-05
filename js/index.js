// Fade in the whole page on load
document.addEventListener("DOMContentLoaded", function () {
  document.body.style.opacity = 0;
  document.body.style.transition = "opacity 1s ease-in-out";
  // Slight delay to trigger the transition
  setTimeout(function () {
    document.body.style.opacity = 1;
  }, 100);

  // Prepare all sections for the scroll-in effect
  const sections = document.querySelectorAll("section");
  sections.forEach((section) => {
    section.style.opacity = 0;
    section.style.transform = "translateY(50px)";
  });

  // IntersectionObserver to detect when sections come into view
  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.transition =
            "opacity 1s ease-out, transform 1s ease-out";
          entry.target.style.opacity = 1;
          entry.target.style.transform = "translateY(0)";
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  sections.forEach((section) => {
    observer.observe(section);
  });
});
