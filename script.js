// === script.js ===
const canvas = document.getElementById("flowerCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

// === Clase MariposaBonita ===
class MariposaBonita {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.x = 100;
    this.y = 100;
    this.vx = 1.5;
    this.vy = 1.2;
    this.angle = 0;
    this.colorIndex = 0;
    this.colorSets = [
      ["#ff69b4", "#ffe4e1"],
      ["#87CEFA", "#e0ffff"],
      ["#ffcc99", "#fff8dc"]
    ];
    setInterval(() => this.changeColors(), 3000);
  }

  changeColors() {
    this.colorIndex = (this.colorIndex + 1) % this.colorSets.length;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.angle += 0.1;
    if (this.x < 0 || this.x > this.canvas.width) this.vx *= -1;
    if (this.y < 0 || this.y > this.canvas.height) this.vy *= -1;
  }

  draw() {
    const ctx = this.ctx;
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(Math.sin(this.angle) * 0.2);
    ctx.fillStyle = "#3e2c23";
    for (let i = 0; i < 5; i++) {
      ctx.beginPath();
      ctx.arc(0, i * 10, 5 + (5 - i), 0, Math.PI * 2);
      ctx.fill();
    }
    const colors = this.colorSets[this.colorIndex];
    for (let side of [-1, 1]) {
      ctx.save();
      ctx.scale(side, 1);
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(-50, -40);
      ctx.lineTo(-50, 40);
      ctx.closePath();
      ctx.fillStyle = colors[0];
      ctx.fill();
      ctx.fillStyle = colors[1];
      ctx.beginPath(); ctx.arc(-40, -25, 10, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.arc(-40, 0, 7, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.arc(-40, 25, 5, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
    }
    ctx.restore();
  }
}

const mariposa = new MariposaBonita(canvas);

// === Flor emoji centrada y más abajo ===
const flowerEmojis = ["🌸", "🌼", "🌹", "🌻", "🌺", "🌷", "💐", "🪷"];
let currentFlower = Math.floor(Math.random() * flowerEmojis.length);

function drawCenterFlower() {
  ctx.font = `${canvas.height * 0.25}px serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(flowerEmojis[currentFlower], canvas.width / 2, canvas.height * 0.7);
}
setInterval(() => {
  let newFlower;
  do {
    newFlower = Math.floor(Math.random() * flowerEmojis.length);
  } while (newFlower === currentFlower);
  currentFlower = newFlower;
}, 2500);

function drawEverything() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  mariposa.update();
  mariposa.draw();
  drawCenterFlower();
}
setInterval(drawEverything, 20);

// === Clics con corazones ===
document.addEventListener('click', (e) => {
  const heart = document.createElement('div');
  heart.classList.add('click-heart');
  heart.style.left = `${e.clientX}px`;
  heart.style.top = `${e.clientY}px`;
  document.querySelector('.click-hearts').appendChild(heart);
  setTimeout(() => heart.remove(), 1500);
});

// === Mensajes rotativos inferiores ===
const messages = [
    "Tu sonrisa me iluminaaa 🌞",
    "Eres un poema 🦋",
    "Contigo los días son maravillosos 🌸",
    "Me fascina tu ternura 💕",
    "Gracias por existir 🌷",
    "Adoro tu mirada 🌙",
    "Cada latido mío dice tu nombre ❤️",
    "A tu lado todo florece 🌼",    
    "Eres mi pedacito de cielo ☁️"
  ];
  
let index = 0;
const msgElement = document.getElementById("bottomMessages");
function changeMessage() {
  let newIndex;
  do {
    newIndex = Math.floor(Math.random() * messages.length);
  } while (newIndex === index);
  index = newIndex;
  msgElement.classList.remove("visible");
  setTimeout(() => {
    msgElement.textContent = messages[index];
    msgElement.classList.add("visible");
  }, 500);
}
changeMessage();
setInterval(changeMessage, 3000);

// === Corazones flotantes aleatorios ===
function createHearts(amount, minDistance = 8) {
  const container = document.querySelector('.pixel-hearts');
  const placed = [];
  for (let i = 0; i < amount; i++) {
    let tries = 0;
    let top, left;
    let valid = false;
    while (!valid && tries < 100) {
      top = Math.random() * 95;
      left = Math.random() * 95;
      valid = true;
      for (const p of placed) {
        const dx = p.left - left;
        const dy = p.top - top;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < minDistance) {
          valid = false;
          break;
        }
      }
      tries++;
    }
    if (valid) {
      const heart = document.createElement('div');
      heart.classList.add('pixel-heart');
      heart.style.top = `${top}%`;
      heart.style.left = `${left}%`;
      heart.style.animationDelay = `${Math.random() * 3}s`;
      container.appendChild(heart);
      placed.push({ top, left });
    }
  }
}
createHearts(55, 6);
