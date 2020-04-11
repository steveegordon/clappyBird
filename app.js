let playArea = document.getElementById("game");
let bird;
let liveBird;
let obstacles = [];
let currentObstacle = 0;

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
    this.leftBound = this.leftBound - 1;
    this.rightBound = this.rightBound - 1;
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

class Bird {
  constructor() {
    let x = this;
    this.top = 225;
    this.bottom = this.top + 50;
    this.leftBound = 200;
    this.rightBound = this.leftBound + 50;
    this.dom;
    this.place();
    this.flightPhase = 0;
  }
  place() {
    this.dom = document.createElement("div");
    this.dom.classList.add('bird');
    playArea.appendChild(this.dom);
    this.dom.style.top = `${this.top}px`;
  }
  run(obj) {
    console.log(`${this.top}`);
    setInterval(this.drop(obj), 10);
  }
  drop() {
    if (this.top == 450) {
        console.log("dead");
        clearInterval(liveBird);
    }
    else {
        console.log("ran");
        this.top++;
        this.bottom++;
        this.dom.style.top = `${this.top}px`;
        crash();
    }
  }
  fly(phase) {
    if (this.top <= 0) {
      console.log("dead");
      clearInterval(liveBird);
    }
    else if (phase < 10) {
      console.log("phase1");
    this.top = this.top - 3;
    this.bottom = this.bottom - 3;
    this.dom.style.top = `${this.top}px`;
    this.flightPhase++
    }
    else if (phase < 21) {
      console.log("phase2");
    this.top--;
    this.bottom--;
    this.dom.style.top = `${this.top}px`;
    this.flightPhase++
    }
    else if (phase < 32) {
      console.log("phase3");
    this.flightPhase++
    }
    else {
      console.log("phase3");
      gameController.fall();
    // this.top = this.top - 1;
    // this.dom.style.top = `${this.top}px`;
    }
    crash();
  }
}

let flap = () => {
  console.log("flap");
  gameController.flight();
}

let createObstacles = function(){
  let i = 0;
  setInterval(
    function() {
      obstacles[i] = new Obstacle(i);
      i++;
  }, 4000)};


let gameController = {
 run: function (obstacles) {
  bird = new Bird;
  createObstacles();
  gameController.fall();
  setInterval(
    function() {
      for (let obstacle of obstacles) {
        obstacle.move();
      }
    }, 10);
  },
  fall: function () {
    clearInterval(liveBird);
    bird.flightPhase = 0;
    liveBird = setInterval(function() {
    bird.drop();
  }, 10);
  },
  flight: function () {
    clearInterval(liveBird);
    bird.flightPhase = 0;
    liveBird = setInterval(function() {
    bird.fly(bird.flightPhase);
  }, 10);;
  }
};

let crash = () => {
  if (obstacles.length > 0) {
    if (obstacles[currentObstacle].leftBound <= bird.rightBound) {
      if (bird.top <= obstacles[currentObstacle].topBound || bird.bottom >= obstacles[currentObstacle].bottomBound) {
        console.log("dead");
      }
      if (obstacles[currentObstacle].rightBound == bird.leftBound) {
        currentObstacle++;
      }
    }
  }
};


document.addEventListener("keypress", flap);

let start = setInterval(run(), 10);


