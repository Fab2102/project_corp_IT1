const fullText = `Our goal is to <b>protect forests sustainably</b> while unlocking their economic potential through cutting-edge blockchain technology.
We empower forest owners to tokenize the <b>ecological and financial value</b> of their land.
This gives investors transparent access to <b>real, climate-relevant natural assets</b>.
By bridging capital markets and environmental protection, we create meaningful impact.
Our project stands for <b>innovation, sustainability, and inclusive participation</b> in a greener future.`;

const speed = 10;
let i = 0;
let typing = false;

function startTyping() {
  if (typing) return;
  typing = true;

  const element = document.getElementById("typewriter");
  element.innerHTML = "";
  i = 0;
  typeWriter(element);
}

function typeWriter(element) {
  if (i < fullText.length) {
    if (fullText[i] === "<") {
      // Detect the full HTML tag
      let tagEnd = fullText.indexOf(">", i);
      if (tagEnd !== -1) {
        // Append the entire tag at once
        element.innerHTML += fullText.slice(i, tagEnd + 1);
        i = tagEnd + 1;
      } else {
        // If no closing '>' is found, just append the character
        element.innerHTML += fullText[i];
        i++;
      }
    } else {
      element.innerHTML += fullText[i];
      i++;
    }
    setTimeout(() => typeWriter(element), speed);
  }
}
