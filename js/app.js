// Create Game object to hold game settings
var Game = {
  "width": 505,
  "height": 606,
  "score": 0,
  "winningScore": 10,
  "numEnemies": 4,
  "scoreChange": function(pointChange){
    var elScore = document.getElementById("elScore");
    this.score = this.score + pointChange
    elScore.innerHTML = this.score;
    if(pointChange > 0) {
      console.log("Winner! 1 point! Your score is now: " + this.score)
    } else {
      console.log("Ouch! You lose a point! Your score is now: " + this.score)
    }
    player.resetPosition();
  },
  "displayScore": function() {
    console.log("Your score is now: " + this.score)
  },
  "checkCollisions": function(){
    // iterate through all Enemy objects. If location of any is within 25px of a Player object, trigger collission event
    for (var i = 0; i < allEnemies.length; i++) {
      if( Math.abs(player.y - allEnemies[i].y) < 25 && Math.abs(player.x - allEnemies[i].x) < 25) {
        this.scoreChange(-1);
      }
    }
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
}

Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
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
        Game.scoreChange(1);
      } else { this.y = this.y - this.moveY};
      break;
    case "down":
      if(this.y > 385) {this.y = this.y + this.moveY};
      break;
  }

  console.log("x: " + this.x, "y: " + this.y)

}

Player.prototype.update = function(dt) {

}

Player.prototype.resetPosition = function(){
  this.x = 200;
  this.y = 385;
}


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var allEnemies = [];
for(var i = 0; i < Game.numEnemies; i++) {
  allEnemies.push(new Enemy());
}

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
