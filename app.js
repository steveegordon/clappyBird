let playArea = document.getElementById("game");
let bird;
let liveBird;
let obstacles = [];

class Obstacle {
  constructor(n) {
    this.topBound = Math.floor(Math.random() * 300 + 50);
    this.bottomBound = this.topBound + 100;
    this.width = 150;
    this.x = 1440;
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
    this.domTop.style.left = `${this.x}px`;
    this.domTop.style.height = `${this.topBound}px`;
    this.domBottom.style.top = `${this.bottomBound}px`;
    this.domBottom.style.height = `${500 - this.bottomBound}px`;
    this.domBottom.style.left = `${this.x}px`;
  }
  move() {
    this.x = this.x - 1;
    this.domTop.style.left = `${this.x}px`;
    this.domBottom.style.left = `${this.x}px`;
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
        this.top = this.top + 1;
        this.dom.style.top = `${this.top}px`;
    }
  }
  fly(phase) {
    if (this.top <= 0) {
      console.log("dead");
      clearInterval(liveBird);
    }
    else if (phase <= 10) {
      console.log("phase1");
    this.top = this.top - 2;
    this.dom.style.top = `${this.top}px`;
    this.flightPhase++
    }
    else if (phase <= 20) {
      console.log("phase2");
    this.top = this.top - 1;
    this.dom.style.top = `${this.top}px`;
    this.flightPhase++
    }
    else {
      console.log("phase3");
    // this.top = this.top - 1;
    // this.dom.style.top = `${this.top}px`;
    }
  }
}

let swag = () => {
  console.log("swag");
  gameController.flight();
  setTimeout(gameController.fall, 300);
}

let createObstacles = function(){
  let i = 0;
  setInterval(
    function() {
      obstacles[i] = new Obstacle(i);
      i++;
  }, 3000)};


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
  }, 10)
  }
};


document.addEventListener("keypress", swag);



