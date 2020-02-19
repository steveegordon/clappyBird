let playArea = document.getElementById("game");
let frame = 0;
let bird0;
let bird1;
let bird2;
let bird3;
let obstacles = [];
let i = 0;

class Obstacle {
  constructor(n) {
    this.topBound = Math.floor(Math.random() * 300 + 50);
    this.bottomBound = this.topBound + 150;
    this.width = 150;
    this.leftBound = 1440;
    this.rightBound = this.leftBound + 150;
    this.id = n;
    this.name = `object${n}`;
    this.domTop;
    this.domBottom;
    this.place();
  }
  place() {
    this.domTop = document.createElement("div");
    this.domBottom = document.createElement("div");
    this.domTop.classList.add(`topBlock`, `${this.name}`);
    this.domBottom.classList.add(`bottomBlock`, `${this.name}`);
    playArea.appendChild(this.domTop);
    playArea.appendChild(this.domBottom);
    this.domTop.style.left = `${this.leftBound}px`;
    this.domTop.style.height = `${this.topBound}px`;
    this.domBottom.style.top = `${this.bottomBound}px`;
    this.domBottom.style.height = `${500 - this.bottomBound}px`;
    this.domBottom.style.left = `${this.leftBound}px`;
  }
  move() {
    this.leftBound = this.leftBound - 2;
    this.rightBound = this.rightBound - 2;
    this.domTop.style.left = `${this.leftBound}px`;
    this.domBottom.style.left = `${this.leftBound}px`;
    // if (this.x == -300) {
    //   this.delete();
    // }
  }
  delete() {
    obstacles.shift();
  }
}

let run = () => {
// Every Frame Check for crash
// Move Bird(s) fraction of frames
  if (frame === 0 || frame % 240 === 0) {
    obstacles[i] = new Obstacle(i);
    i++;
  }
    !function() {
      for (let obstacle of obstacles) {
        obstacle.move();
      }
    }();
  if (frame < 1000) {
  console.log(frame);
  frame++;
  requestAnimationFrame(run);
}
};


requestAnimationFrame(run);
