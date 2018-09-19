// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = Math.random() * 150 + 100;
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
    if ((this.x === Math.floor(enemy.x)) && ((this.y + 20) === enemy.y)) {
      console.log('Collision at coordinates: ' + this.x + ', ' + this.y);
      this.reset();
    }
  }
}

// Draw the player
Character.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Character.prototype.handleInput = function(key) {
  if (key === 'right') {
    this.x += 101;
    // Debugger: log coordinates after moving
    console.log('Character: ' + this.x + ', ' + this.y);
    console.log('Enemy: ' + Math.floor(allEnemies[2].x) + ', ' + allEnemies[2].y);
  } else if (key === 'left') {
    this.x -= 101;
    // Debugger: log coordinates after moving
    console.log('Character: ' + this.x + ', ' + this.y);
    console.log('Enemy: ' + Math.floor(allEnemies[2].x) + ', ' + allEnemies[2].y);
  } else if (key === 'up') {
    this.y -= 83;
    // Debugger: log coordinates after moving
    console.log('Character: ' + this.x + ', ' + this.y);
    console.log('Enemy: ' + Math.floor(allEnemies[2].x) + ', ' + allEnemies[2].y);
  } else if (key === 'down') {
    this.y += 83;
    // Debugger: log coordinates after moving
    console.log('Character: ' + this.x + ', ' + this.y);
    console.log('Enemy: ' + Math.floor(allEnemies[2].x) + ', ' + allEnemies[2].y);
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
