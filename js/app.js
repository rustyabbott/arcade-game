// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = Math.random() * 150 + 100;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x < 505 ? this.x += this.speed * dt : this.x = -101;
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Character = function(x, y) {
  this.sprite = 'images/char-boy.png';
  this.x = x;
  this.y = y;
};

Character.prototype.reset = function(x, y) {
  this.x = x;
  this.y = y;
}

Character.prototype.update = function() {
  if (this.y <= 0) {
    this.reset(202, 375);
  }
};

Character.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Character.prototype.handleInput = function(key) {
  if (key === 'right') {
    this.x += 101;
  } else if (key === 'left') {
    this.x -= 101;
  } else if (key === 'up') {
    this.y -= 83;
  } else if (key === 'down') {
    this.y += 83;
  } else {
    '';
  }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
const allEnemies = [];
const player = new Character(202, 375);
const insectOne = new Enemy(0, 63, 1);
const insectTwo = new Enemy(220, 146, 10);
const insectThree = new Enemy(350, 229, 15);
allEnemies.push(insectOne, insectTwo, insectThree);

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
