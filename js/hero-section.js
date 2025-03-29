const heroSection = document.querySelector(".hero-section");
const h2 = document.querySelector(".hero-section h2");
const p = document.querySelector(".hero-section p");

let targetX = 0,
  targetY = 0;
let currentX = 0,
  currentY = 0;
const ease = 0.1;

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
  const { clientX, clientY } = e;
  const { offsetWidth, offsetHeight } = heroSection;

  targetX = (clientX / offsetWidth - 0.5) * 30;
  targetY = (clientY / offsetHeight - 0.5) * 30;
});

heroSection.addEventListener("mouseleave", () => {
  targetX = 0;
  targetY = 0;
});

updatePosition();
