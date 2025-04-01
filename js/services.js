const fullText = <i>Our goal is to <b>protect forests sustainably</b> while unlocking their economic potential through cutting-edge blockchain technology.
We empower forest owners to tokenize the <b>ecological and financial value</b> of their land. 
This gives investors transparent access to <b>real, climate-relevant natural assets</b>. 
By bridging capital markets and environmental protection, we create meaningful impact. 
Our project stands for <b>innovation, sustainability, and inclusive participation</b> in a greener future.</i>;
const speed = 50;
let i = 0;
let typing = false;

function startTyping() {
  if (typing) return; 
  typing = true;
  const element = document.getElementById("typewriter");
  element.textContent = ""; 
  i = 0;
  typeWriter(element);
}

function typeWriter(element) {
  if (i < fullText.length) {
    element.textContent += fullText.charAt(i);
    i++;
    setTimeout(() => typeWriter(element), speed);
  }
}