'use strict';
// Enemies our player must avoid
const Enemy = function(x, y, speed) {
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = Math.random() * 150 + 100;

    // Enemy collision zone
    this.height = 50;
    this.width = 55;
}

// Update the enemy's position
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    this.x < 505 ? this.x += this.speed * dt : this.x = -101;
}

// Draw the enemy on the screen
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Your player
var Character = function(x, y) {
  this.sprite = 'images/char-boy.png';
  this.x = x;
  this.y = y;

  // player colllision zone
  this.height = 50;
  this.width = 50;
}

Character.prototype.reset = function() {
  this.x = 202;
  this.y = 375;
}

Character.prototype.update = function() {
  if (this.y <= 0) {
    alert('You made it!');
    this.reset();
  }

  // Collision detection
  for (let enemy of allEnemies) {
    if (this.x < enemy.x + enemy.width &&
      this.x + this.width > enemy.x &&
      this.y < enemy.y + enemy.height &&
      this.y + this.height > enemy.y) {
        this.reset();
    }
  }
}

// Draw the player
Character.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Character.prototype.handleInput = function(key) {
  if (key === 'right' && this.x < 404) {
    this.x += 101;
  } else if (key === 'left' && this.x > 0) {
    this.x -= 101;
  } else if (key === 'up') {
    this.y -= 83;
  } else if (key === 'down' && this.y < 375) {
    this.y += 83;
  }
}

const allEnemies = [];
const player = new Character(202, 375);
const insectOne = new Enemy(0, 63, 1);
const insectTwo = new Enemy(220, 146, 10);
const insectThree = new Enemy(350, 229, 15);
allEnemies.push(insectOne, insectTwo, insectThree);

// Listen for key presses and send the keys to the Player.handleInput() method
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
})
