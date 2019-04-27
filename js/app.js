let flag = false;
let winCounter = document.getElementById("winCounter");
let blockWidth = 101;
let blockHeight = 171;
let canvasWidth = 101*5;
let canvasHeight = 171*5;
let boyWidth = 101;
let boyHeight = 171;

var Enemy = function(x,y,speed) {
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = speed;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;

    difficulity = 300;

    if(this.x > 510) {
        this.x = -50;
        this.speed = 100 + Math.floor(Math.random() * difficulity);
      }

    if(player.x < this.x + 50 && player.x + 50 > this.x && player.y < this.y + 50 && player.y + 50 > this.y){
        player.reset();
        winCounter.innerHTML = 0;
    }
};


// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function(){
    this.sprite = 'images/char-boy.png';
    this.x = (canvasWidth/2.0) - boyWidth/2.0;
    this.y = canvasHeight/2.0 ;
}

let enemy1 = new Enemy(blockWidth,47.5,200);
let enemy2 = new Enemy(blockWidth*2,142.5,200);
let enemy3 = new Enemy(blockWidth*3,237.5,200);
let allEnemies = [enemy1,enemy2,enemy3];


let player = new Player();

Player.prototype.handleInput = function(key){
        if(key == 'left' && this.x > 2 ){
            this.x = this.x - 100;
        }

        if(key == 'right' && this.x < 400){
            this.x = this.x + 100;
        }
    
        if(key == 'up' && this.y > -100){           
            this.y = this.y - 95;
            // console.log(this.y);
            // console.log(this.x)
        }
    
        if(key == 'down' && this.y < 400){
            this.y = this.y + 95;
        }
}


Player.prototype.update = function(){
    if(this.y < 0){
        this.reset();
        winCounter.innerHTML++;
        // console.log(winCounter);
        if(winCounter.innerHTML == 3){
            this.win();
        }
    }
}

Player.prototype.reset = function(){
    this.x = (canvasWidth/2.0) - boyWidth/2;
    this.y = canvasHeight/2 ;
}

Player.prototype.win = function(){
    setTimeout(function(){
        alert("You won !");
        player.reset();
        winCounter.innerHTML = 0;
    },0)
}

Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

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