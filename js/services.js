const fullText = `<h2><b>our mission</b></h2>`;
let started = false;

function startFading() {
  if (started) return;
  started = true;

  const container = document.getElementById("typewriter");
  container.innerHTML = fullText;
  container.classList.add("fade-slide-in");
}