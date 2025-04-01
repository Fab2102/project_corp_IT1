const fullText = `Our goal is to <b>protect forests sustainably</b> while unlocking their economic potential through cutting-edge blockchain technology.
We empower forest owners to tokenize the <b>ecological and financial value</b> of their land.
This gives investors transparent access to <b>real, climate-relevant natural assets</b>.
By bridging capital markets and environmental protection, we create meaningful impact.
Our project stands for <b>innovation, sustainability, and inclusive participation</b> in a greener future.`;

const speed = 10;
let typing = false;

function parseHTMLtoNodes(html) {
  const container = document.createElement("div");
  container.innerHTML = html;
  return Array.from(container.childNodes);
}

function startTyping() {
  if (typing) return;
  typing = true;

  const element = document.getElementById("typewriter");
  element.innerHTML = "";

  const nodes = parseHTMLtoNodes(fullText);
  typeNodes(nodes, element, 0);
}

function typeNodes(nodes, parent, index) {
  if (index >= nodes.length) return;

  const node = nodes[index];

  if (node.nodeType === Node.TEXT_NODE) {
    typeText(node.textContent, parent, 0, () => {
      typeNodes(nodes, parent, index + 1);
    });
  } else if (node.nodeType === Node.ELEMENT_NODE) {
    const newElem = document.createElement(node.tagName);
    for (let attr of node.attributes) {
      newElem.setAttribute(attr.name, attr.value);
    }
    parent.appendChild(newElem);
    const childNodes = Array.from(node.childNodes);
    typeNodes(childNodes, newElem, 0); // Type children first
    // When done with children, continue with the next sibling at this level
    let observer = new MutationObserver(() => {
      if (newElem.textContent.length === node.textContent.length) {
        observer.disconnect();
        typeNodes(nodes, parent, index + 1);
      }
    });
    observer.observe(newElem, {
      childList: true,
      subtree: true,
      characterData: true,
    });
  }
}

function typeText(text, parent, charIndex, callback) {
  if (charIndex < text.length) {
    parent.appendChild(document.createTextNode(text[charIndex]));
    setTimeout(() => {
      typeText(text, parent, charIndex + 1, callback);
    }, speed);
  } else {
    callback();
  }
}
