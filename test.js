
let playArea = document.getElementById("game");
let state = "join";
let frame = 0;
let birds = [];
let bird0;
let bird1;
let bird2;
let bird3;
let obstacles = [];
let currentObstacle = 0;
let i = 0;

class Bird {
  constructor(n) {
    this.alive = true;
    this.top = 225;
    this.bottom = this.top + 50;
    this.leftBound = 200;
    this.rightBound = this.leftBound + 50;
    this.dom;
    this.place(n);
    this.flightPhase = 0;
    birds.push(this);
  }
  place(n) {
    this.dom = document.createElement("div");
    this.dom.classList.add('bird');
    this.dom.id = "player" + n.toString();
    playArea.appendChild(this.dom);
    this.dom.style.top = `${this.top}px`;
  }
  run(obj) {
    console.log(`${this.top}`);
    setInterval(this.drop(obj), 10);
  }
  drop() {
    // if (this.top == 450) {
    //     console.log("dead");
    //     this.alive = false;
    //     return;
        // clearInterval(liveBird);
    // }

        console.log("ran");
        this.top++;
        this.bottom++;
        this.dom.style.top = `${this.top}px`;
        // crash();
  }
  fly(phase) {
    // if (this.top <= 0) {
    //   console.log("dead");
    //   this.alive = false;
    //   return;
      // clearInterval(liveBird);
    // }
    if (this.flightPhase < 10) {
      console.log("phase1");
      this.top = this.top - 3;
      this.bottom = this.bottom - 3;
      this.dom.style.top = `${this.top}px`;
      this.flightPhase++;
    }
    else if (this.flightPhase < 21) {
      console.log("phase2");
      this.top--;
      this.bottom--;
      this.dom.style.top = `${this.top}px`;
      this.flightPhase++;
    }
    else if (phase < 33) {
      console.log("phase3");
      this.flightPhase++;
    }
    else {
      console.log("phase3");
      this.flightPhase = 0;
      // gameController.fall();
    // this.top = this.top - 1;
    // this.dom.style.top = `${this.top}px`;
    }
    // crash();
  }
  crash() {
    if (this.top <= 0) {
      console.log("dead");
      this.alive = false;
      return;
    }
    else if (this.top == 450) {
      console.log("dead");
      this.alive = false;
      return;
    }
    else if (this.rightBound >= obstacles[currentObstacle].leftBound && this.leftBound <= obstacles[currentObstacle.rightBound]) {
      if (this.top <= obstacles[currentObstacle].topBound || this.bottom >= obstacles[currentObstacle].bottomBound) {
        console.log("dead");
        this.alive = false;
        return;
      }
    }
  }
}

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

let eventHandler = document.addEventListener("keypress", function(event) {gameController.joinHandler(event);});


let gameController = {
  run: function(){
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
      for (let bird of birds) {
        if (bird.flightPhase > 0){
          bird.fly();
        }
        else {
          bird.drop();
        }
        bird.crash();
      }
    }();
    if (frame < 1000 && bird0.alive == true) {
      frame++;
      state = requestAnimationFrame(gameController.run);
    }
    else {
      gameController.pause();
    }
  },
  pause: function(){
    cancelAnimationFrame(state);
  },
  birdHandler: function(press){
    let key = press.keyCode;
    console.log(key);
    switch(key) {
      case 97: {
        if (bird0 != null) {
        bird0.flightPhase = 1;
        }
        break;
      }
      case 99: {
        if (bird1 != null) {
        bird1.flightPhase = 1;
        }
        break;
      }
      case 110: {
        if (bird2 != null) {
        bird2.flightPhase = 1;
        }
        break;
      }
      case 108: {
        if (bird3 != null) {
        bird3.flightPhase = 1;
        }
        break;
      }
      case 32: {
        if (state == "pause") {
          gameController.run();
          state = "run";
        }
        else {
        gameController.pause();
        state = "pause";
        }
        break;
      }
      default : {
        console.log("wrong button");
        break;
      }
    }
  },
  joinHandler: function(press){
    let key = press.keyCode;
    console.log(key);
    switch(key) {
      case 97: {
        if (bird0 == null) {
          console.log("createBird");
          bird0 = new Bird(0);
        }
        break;
      }
      case 99: {
        if (bird1 == null) {
          bird1 = new Bird(1);
        }
        break;
      }
      case 110: {
        if (bird2 == null) {
          bird2 = new Bird(2);
        }
        break;
      }
      case 108: {
        if (bird3 == null) {
          bird3 = new Bird(3);
        }
        break;
      }
      case 32: {
        if (state == "join" && (bird0 != null || bird1 != null || bird2 != null || bird3 != null)) {
          gameController.run();
          eventHandler = document.addEventListener("keypress", function(event) {gameController.birdHandler(event)});
          state = "run";
        }
      }
    }
  }
};

// let start = requestAnimationFrame(gameController.run);
