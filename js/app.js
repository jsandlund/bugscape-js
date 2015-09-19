// Create Game object to hold game settings
var Game = {
  "width": 505,
  "height": 606,
  "score": 0,
  "timeUp": false,
  "livesOut": false,
  "difficultySettings": {
    "easy": {
      "numEnemies": 4,
      "enemySpeedMultiplier": 1,
      "oddsOfSuperEnemy": .05,
      "playerLives": 10
    },
    "medium": {
      "numEnemies": 7,
      "enemySpeedMultiplier": 2,
      "oddsOfSuperEnemy": .10,
      "playerLives": 5
    },
    "hard": {
      "numEnemies": 10,
      "enemySpeedMultiplier": 3,
      "oddsOfSuperEnemy": .20,
      "playerLives": 2
    }
  },
  "difficulty": "easy",
  "state": "state_createGame",
  "gameTimer": new Timer(5, 1000, "elTime"), // length of timer, ms interval, ID of element to update
  "initStateFunctions": {
    "state_createGame": function(){
      // handle form submissions
      $("#createGame").submit(function(e) {
        // get username and difficulty
        var form = this;
        e.preventDefault();
        player.username = form.username.value;
        Game.difficulty = form.difficulty.value;
        // start game
        Game.changeState("state_playGame");
      })
    },
    "state_playGame": function(){

      // Instantiate Enemy objects, place in global allEnemies array
      for (var i = 0; i < Game.difficultySettings[Game.difficulty].numEnemies; i++) {
        allEnemies.push(new Enemy());
      }

      // Initiate Player
      player.initiate();

      // hide View1, update View2, show view2
      $("#view-createGame").toggleClass("hidden-xs-up");
      $("#elLives").text(player.lives);
      $("#view-playGame").toggleClass("hidden-xs-up");

      // Start game timer. [QUESTION]: is there a way to refernce the Game object by climbing the `this` chain? Using just this references the `initStateFunctions`
      Game.gameTimer.run();
      // start GameEngine
      Engine(window);

    },
    "state_endGame": function(){
      $("#view-playGame").toggleClass("hidden-xs-up");
      alert("GAME OVER!")
      // write score to localStorage
      // populate leaderboard
    }
  },
  "changeState": function(newState){
    console.log("State changed to: ", newState);
    this.initStateFunctions[newState]();
    this.state = newState;
  },
  "displayScore": function() {
    console.log("Your score is now: " + this.score)
  },
  "updateScore": function(pointChange){
    var elScore = document.getElementById("elScore");
    this.score = this.score + pointChange
    elScore.innerHTML = this.score;
    player.resetPosition();
  },
  "checkCollisions": function(){
    // iterate through all Enemy objects. If location of any is within 25px of a Player object, trigger collission event
    for (var i = 0; i < allEnemies.length; i++) {
      if( Math.abs(player.y - allEnemies[i].y) < 25 && Math.abs(player.x - allEnemies[i].x) < 25) {
        this.updateScore(-1);
        if (player.lives > 0) {
          player.updateLives(-1);
        } else {
          Game.changeState('state_endGame');
        };
        player.resetPosition();
      }
    }
  },
  "isGameOver": function(){
    if (this.timeUp || this.livesOut) {return true} else { return false};
  }
}

// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = 1;
    this.yBase = 60;
    this.yInterval = 80;
    this.y = this.yBase + ( Math.floor((Math.random() * 3)) * this.yInterval); // get random number between 1 - 3; multiply by pixels to determine starting row of enemy
    this.speed = 100 + Math.floor((Math.random() * 200) + 1);
    this.resetPosition = function(){
      this.x = -20;
      this.y = this.yBase + ( Math.floor((Math.random() * 3)) * this.yInterval);
    }
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + this.speed * dt;
    if(this.x > Game.width) {
      this.resetPosition();
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function() {
  this.sprite = 'images/char-boy.png'
  this.x = 200;
  this.y = 385;
  this.moveY = 85;
  this.moveX = 100;
  this.points = 0;
}

Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.updateLives = function(livesChange){
  this.lives = this.lives + livesChange;
  $("#elLives").text(this.lives);
}

Player.prototype.handleInput = function(keyPressed) {

  switch (keyPressed) {
    case "left":
      if(this.x !== 0) {this.x = this.x - this.moveX};
      break;
    case "right":
      if(this.x < 400) { this.x = this.x + this.moveX};
      break;
    case "up":
      if(this.y === 45) {
        Game.updateScore(1);
      } else { this.y = this.y - this.moveY};
      break;
    case "down":
      if(this.y < 385) {this.y = this.y + this.moveY};
      break;
  }

  console.log("x: " + this.x, "y: " + this.y)

}

Player.prototype.initiate = function() {
  // set lives
  this.lives = Game.difficultySettings[Game.difficulty].playerLives;
  console.log(this.username + " has " + this.lives + " lives!");
}

Player.prototype.update = function(dt) {
}

Player.prototype.resetPosition = function(){
  this.x = 200;
  this.y = 385;
}


// Place all enemy objects in an array called allEnemies
var allEnemies = [];

// Place the player object in a variable called player
var player = new Player();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});

// Initate first State
Game.changeState(Game.state);

// Timer constructor function. Used to set gameTime
// Hat tip to Steve Harrison who's SO answer helped me understand why in the world the execution context, and consequent reference to `this`,
// changed when calling the setInterval function. http://stackoverflow.com/questions/1101668/how-to-use-settimeout-to-invoke-object-itself

function Timer(secs, msInterval, elemToUpdate){
  this.secs = secs;
  this.msInterval = msInterval;
  this.elemToUpdate = elemToUpdate;
  this.run = function(){
    var element = document.getElementById(this.elemToUpdate);
    element.innerHTML = this.secs;

    // set `this` to local scope variable to prevent setInterval from referencing global window object.
    var scope = this
    var timer = setInterval(updateTimer, this.msInterval, this.element, scope)

    function updateTimer(){
      element.innerHTML = scope.secs;
      if (scope.secs < 1) {
        // stop setInterval
        clearTimeout(timer);
        // change to game over state
        Game.changeState('state_endGame');
      }
      scope.secs--;
    }
  }
}
