const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const box = 20;                 
const cols = canvas.width / box;
const rows = canvas.height / box;

let score = 0;
let direction = 'RIGHT';        

const initialLength = 12;
let snake = [];
const startX = Math.floor(cols/2);
const startY = Math.floor(rows/2);

function resetSnake() {
  snake = [];
  for (let i = 0; i < initialLength; i++) {
    snake.push({ x: (startX - i) * box, y: startY * box });
  }
}
resetSnake();

function spawnFood() {
  let fx, fy, ok;
  do {
    fx = Math.floor(Math.random() * cols) * box;
    fy = Math.floor(Math.random() * rows) * box;
    ok = !snake.some(s => s.x === fx && s.y === fy);
  } while (!ok);
  return { x: fx, y: fy };
}

let food = spawnFood();

document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft' && direction !== 'RIGHT') direction = 'LEFT';
  if (e.key === 'ArrowUp' && direction !== 'DOWN') direction = 'UP';
  if (e.key === 'ArrowRight' && direction !== 'LEFT') direction = 'RIGHT';
  if (e.key === 'ArrowDown' && direction !== 'UP') direction = 'DOWN';
});

function setDirectionBtn(dir) {
  if (dir === 'LEFT' && direction !== 'RIGHT') direction = 'LEFT';
  else if (dir === 'UP' && direction !== 'DOWN') direction = 'UP';
  else if (dir === 'RIGHT' && direction !== 'LEFT') direction = 'RIGHT';
  else if (dir === 'DOWN' && direction !== 'UP') direction = 'DOWN';
}

function draw() {
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = 'crimson';
  ctx.fillRect(food.x, food.y, box, box);

  for (let i = 0; i < snake.length; i++) {
    const seg = snake[i];
    const t = i / (snake.length - 1 || 1);
    const r = 50*(1-t) + 10*t;
    const g = 205*(1-t) + 80*t;
    const b = 50*(1-t) + 10*t;
    const alpha = 1 - 0.6*t;
    ctx.fillStyle = rgba(${r},${g},${b},${alpha});
    const shrink = 1 + Math.floor(4*t);
    const pad = Math.floor(shrink/2);
    ctx.fillRect(seg.x + pad, seg.y + pad, box - shrink, box - shrink);
    ctx.strokeStyle = 'rgba(0,0,0,0.55)';
    ctx.strokeRect(seg.x + pad, seg.y + pad, box - shrink, box - shrink);
  }
}
