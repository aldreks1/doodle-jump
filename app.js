const field = document.querySelector(".field");
const doodler = document.createElement("div");
let doodlerLeft = 100;
let doodlerBottom = 100;
const amountOfPlatforms = 6;
let platforms = [];
let leftInterval;
let rightInterval;
let fallInterval;
let isMovingLeft = false;
let isMovingRight = false;
let isJumping = false;
let gravity = 0.45;
let score = 0;
const startBtn = document.querySelector(".startBtn");
let speed = 15;
startBtn.addEventListener("click", startGame);
function createDoodler() {
  field.appendChild(doodler);
  doodler.classList.add("doodler");
  doodler.style.bottom = `${doodlerBottom}px`;
  doodlerLeft = platforms[0].left;
  doodler.style.left = `${platforms[0].left}px`;
}

class Platform {
  constructor(newPlatBottom) {
    this.left = Math.random() * 315;
    this.bottom = newPlatBottom;
    this.visual = document.createElement("div");

    const visual = this.visual;
    visual.classList.add("platform");
    visual.style.bottom = `${this.bottom}px`;
    visual.style.left = `${this.left}px`;
    field.appendChild(visual);
  }
}

function createPlatforms() {
  for (let i = 0; i < amountOfPlatforms; i++) {
    const platGap = 600 / amountOfPlatforms;
    let newPlatBottom = 100 + i * platGap;
    let newPlatform = new Platform(newPlatBottom);
    platforms.push(newPlatform);
  }
}

function movePlatforms() {
  if (doodlerBottom > 200) {
    platforms.forEach((platform) => {
      platform.bottom -= 4;
      let visual = platform.visual;
      visual.style.bottom = platform.bottom + "px";

      if (platform.bottom < 0) {
        let firstPlatform = platforms[0].visual;
        firstPlatform.classList.remove("platform");
        platforms.shift();
        score++;
        var newPlatform = new Platform(600);
        platforms.push(newPlatform);
      }
    });
  }
}

function jump() {
  gravity = 0.45;
  console.log("прыгаем");
  isJumping = true;

  let jumpInterval = setInterval(() => {
    if (doodlerBottom >= 300) {
      clearInterval(jumpInterval);
      isJumping = false;
      fall();
    }
    let jumpForce = (5 - gravity) * 2;
    doodler.style.bottom = `${doodlerBottom + jumpForce}px`;
    doodlerBottom += jumpForce;
  }, 10);
}

function fall() {
  console.log("padaem");
  fallInterval = setInterval(() => {
    if (!isJumping) {
      gravity += 0.075;
      doodlerBottom -= gravity;
      doodler.style.bottom = `${doodlerBottom}px`;

      if (parseFloat(doodler.style.bottom) <= 0) {
        doodler.style.bottom = "0px";
        gravity = 0.45;
        gameOver(score);
        clearInterval(fallInterval);
        clearInterval(leftInterval);
        clearInterval(rightInterval);
      }
    }

    //48 пикселей ноги дудлера начиная от 7 до 56 а центр на 48 лево<дудлер<право
    platforms.forEach((platform, index) => {
      if (
        doodlerBottom >= platform.bottom &&
        doodlerBottom <= platform.bottom + 10 &&
        doodlerLeft + 60 >= platform.left &&
        doodlerLeft <= platform.left + 85 &&
        !isJumping
      ) {
        clearInterval(fallInterval);
        console.log(`${index}`);
        jump();
      }
    });
  }, 10);
}

function moveDoodler() {
  if (isMovingLeft) {
    if (doodlerLeft > 0) {
      doodlerLeft -= 6; // Измените скорость по вашему желанию
      doodler.style.left = `${doodlerLeft}px`;
    }
  }

  if (isMovingRight) {
    if (doodlerLeft < 315) {
      doodlerLeft += 6; // Измените скорость по вашему желанию
      doodler.style.left = `${doodlerLeft}px`;
    }
  }

  requestAnimationFrame(moveDoodler);
}

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") {
    isMovingLeft = true;
  } else if (e.key === "ArrowRight") {
    isMovingRight = true;
  }
});

document.addEventListener("keyup", (e) => {
  if (e.key === "ArrowLeft") {
    isMovingLeft = false;
  } else if (e.key === "ArrowRight") {
    isMovingRight = false;
  }
});
// add a button later
function startGame() {
  while (field.firstChild) {
    field.removeChild(field.firstChild);
  }
  console.log("стартуем");
  createPlatforms();
  createDoodler();
  setInterval(movePlatforms, 15);
  requestAnimationFrame(moveDoodler);
  jump();
}

function gameOver(score) {
  while (field.firstChild) {
    field.removeChild(field.firstChild);
  }
let html = `<div class="finalScore">${score}</div>`;
field.innerHTML = html;
}
