// Enemies our player must avoid
var Enemy = function(x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

    //  Initializing position corordinates
    this.x = x;
    this.y = y;
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    var dist = 200 * dt;
    this.x += dist;

    if (this.x > 500) {
        this.x = -50;
    }

    //  defining the edges of the enemy for collision detection
    this.left = this.x;
    this.top = this.y;
    this.right = this.x + 70;
    this.bottom = this.y + 70;

    this.checkCollision(this, player);
}

//  Checks to see if enemy and player are intersecting
Enemy.prototype.isIntersecting = function(enemy, player) {
        return !(enemy.top > player.bottom
               || enemy.left > player.right
               || enemy.right < player.left
               || enemy.bottom < player.top);
}

//  Checks to see if there is any collision between enemy and payer
//  if there is then reset position
Enemy.prototype.checkCollision = function(enemy, player) {
    if(this.isIntersecting(enemy, player)) {
        player.resetPosition();
    }
}
// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y) {

    // The image/sprite for our player
    this.sprite = 'images/char-boy.png';

    // Initializing position coordinates
    this.x = x;
    this.y = y;

    this.score = 0;
}

// Update the player's position
Player.prototype.update = function() {
    //  defining the edges of the player for collision detection
    this.left = this.x;
    this.top = this.y;
    this.right = this.x + 70;
    this.bottom = this.y + 70;
}

// Draw the player on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

//  Handles the keyboard inputs
Player.prototype.handleInput = function(keyCode) {
    if (keyCode === 'left') {
        if (this.x > 50) {
            this.x -= 101;
        }
    }
    if (keyCode === 'up') {
        if (this.y > 100) {
            this.y -= 83;
        } else {
            this.score++;
            console.log(this.score);
            this.resetPosition();
        }
    }
    if (keyCode === 'right') {
        if (this.x < 350) {
            this.x   +=101;
        }
    }
    if (keyCode === 'down') {
        if (this.y < 400) {
            this.y +=83;
        }
    }
}

Player.prototype.resetPosition = function() {
    this.x = 200;
    this.y = 400;
}
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var enemy1 = new Enemy(0, 65);
var enemy2 = new Enemy(125, 150);
var enemy3 = new Enemy(75, 230);
var enemy4 = new Enemy(-150, 65);
var enemy5 = new Enemy(-175, 230);
var allEnemies = [enemy1, enemy2, enemy3, enemy4, enemy5];
var player = new Player(200, 400);

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
