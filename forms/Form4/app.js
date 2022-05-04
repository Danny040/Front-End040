class Bubbles {
  constructor() {
    this.width = this.getRendomParameter(20, 200);
    this.height = this.width;
    this.top = this.getRendomParameter(0, window.innerHeight);
    this.left = this.getRendomParameter(0, window.innerWidth);
    this.parent = document.querySelector(".wrapper");
  }

  getRendomParameter(min, max) {
    const parameter = Math.floor(Math.random() * (max - min - 1)) + min;
    return parameter;
  }

  createBubbleElement() {
    const bubble = document.createElement("div");
    bubble.classList.add("bubble");
    bubble.style.height = `${this.height}px`;
    bubble.style.width = `${this.width}px`;
    bubble.style.top = `${this.top}px`;
    bubble.style.left = `${this.left}px`;
    this.parent.appendChild(bubble);
  }
}

function createBubbleObject() {
  for (let i = 0; i < 7; i++) {
    const bubbleObject = new Bubbles();
    bubbleObject.createBubbleElement();
  }
}

createBubbleObject();
