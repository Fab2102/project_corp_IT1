const heroSection = document.querySelector(".hero-section");
const h2 = document.querySelector(".hero-section h2");
const p = document.querySelector(".hero-section p");

let targetX = 0,
  targetY = 0;
let currentX = 0,
  currentY = 0;
const ease = 0.1; // Adjust this value for softer/smoother movement (0.1 = very smooth, 0.5 = less smooth)

function lerp(start, end, ease) {
  return start + (end - start) * ease;
}

function updatePosition() {
  currentX = lerp(currentX, targetX, ease);
  currentY = lerp(currentY, targetY, ease);

  h2.style.transform = `translate(${currentX}px, ${currentY}px)`;
  p.style.transform = `translate(${currentX}px, ${currentY}px)`;

  requestAnimationFrame(updatePosition);
}

heroSection.addEventListener("mousemove", (e) => {
  const { clientX, clientY } = e; // Get mouse position
  const { offsetWidth, offsetHeight } = heroSection; // Get hero section dimensions

  // Calculate the percentage of mouse position relative to the hero section
  targetX = (clientX / offsetWidth - 0.5) * 30; // Adjust multiplier for sensitivity
  targetY = (clientY / offsetHeight - 0.5) * 30; // Adjust multiplier for sensitivity
});

// Reset the position when the mouse leaves the hero section
heroSection.addEventListener("mouseleave", () => {
  targetX = 0;
  targetY = 0;
});

// Start the animation loop
updatePosition();
