// Fondo de nodos animado rojo
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

class Node {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.vx = (Math.random() - 0.5) * 0.6;
    this.vy = (Math.random() - 0.5) * 0.6;
    this.radius = Math.random() * 3 + 1;
  }
  update() {
    this.x += this.vx;
    this.y += this.vy;
    if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
    if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
  }
}

const nodes = [];
for (let i = 0; i < 60; i++) nodes.push(new Node());

function connectNodes() {
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const dx = nodes[i].x - nodes[j].x;
      const dy = nodes[i].y - nodes[j].y;
      const dist = Math.sqrt(dx*dx + dy*dy);
      if (dist < 140) {
        ctx.beginPath();
        ctx.moveTo(nodes[i].x, nodes[i].y);
        ctx.lineTo(nodes[j].x, nodes[j].y);
        ctx.strokeStyle = `rgba(230, 57, 70, ${1 - dist/140})`;
        ctx.lineWidth = 1.2;
        ctx.stroke();
      }
    }
  }
}

function animate() {
  ctx.fillStyle = 'rgba(13,13,13,0.08)';
  ctx.fillRect(0,0,canvas.width,canvas.height);

  nodes.forEach(node => {
    node.update();
    ctx.beginPath();
    ctx.arc(node.x, node.y, node.radius, 0, Math.PI*2);
    ctx.fillStyle = '#e63946';
    ctx.shadowColor = '#e63946';
    ctx.shadowBlur = 12;
    ctx.fill();
    ctx.shadowBlur = 0;
  });

  connectNodes();
  requestAnimationFrame(animate);
}

animate();
