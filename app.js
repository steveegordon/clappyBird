let playArea = document.getElementById("game");
let bird;
let liveBird;

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
  fly() {
    if (this.top <= 0) {
      console.log("dead");
      clearInterval(liveBird);
    }
    else {
    this.top = this.top - 1;
    this.dom.style.top = `${this.top}px`;
    }
  }
}

// let placeObject = (obstacle) => {
//   let topBlock = document.createElement("div");
//   let bottomBlock = document.createElement("div");
//   topBlock.classList.add("topBlock");
//   bottomBlock.classList.add('bottomBlock');
//   playArea.appendChild(topBlock);
//   playArea.appendChild(bottomBlock);
//   topBlock.style.left = (obstacle.x - obstacle.width).toString() + "px";
//   topBlock.style.height = obstacle.topBound.toString() + "px";
//   bottomBlock.style.top = obstacle.bottomBound.toString() + "px";
//   bottomBlock.style.height = (500 - obstacle.bottomBound).toString() + "px";
//   bottomBlock.style.left = (obstacle.x - obstacle.width).toString() + "px";
// }
let swag = () => {
  console.log("swag");
  gameController.flight();
  setTimeout(gameController.fall, 1000);
}

let obstacles = [];
// let object1 = new Obstacle;
// console.log(object1);
// placeObject(object1);

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
  // liveBird = setInterval(function() {
  //   bird.drop();
  // }, 10);
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
    liveBird = setInterval(function() {
    bird.drop();
  }, 10);
  },
  flight: function () {
    clearInterval(liveBird);
    liveBird = setInterval(function() {
    bird.fly();
  }, 10)
  }
};


document.addEventListener("keypress", swag);



// let move = setInterval(function(){
//   let top = document.getElementsByClassName("topBlock");
//   let bottom = document.getElementsByClassName("bottomBlock");
//   object1.x = object1.x - 1;
//   top[0].style.left = (object1.x - object1.width).toString() + "px";
//   bottom[0].style.left = (object1.x - object1.width).toString() + "px";
//   if (object1.x == 0) clearInterval(move), object1 = null;
// }, 10);


