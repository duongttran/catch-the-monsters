/*
  Code modified from:
  http://www.lostdecadegames.com/how-to-make-a-simple-html5-canvas-game/
  using graphics purchased from vectorstock.com
*/

/* Initialization.
Here, we create and add our "canvas" to the page.
We also load all of our images. 
*/


let canvas;
let ctx;

canvas = document.createElement("canvas");
ctx = canvas.getContext("2d");
canvas.width = 512;
canvas.height = 480;
document.body.appendChild(canvas);

let bgReady, heroReady, monsterReady;
let bgImage, heroImage, monsterImage;

let startTime = Date.now();
let SECONDS_PER_ROUND = 15;
let elapsedTime = 0;

let isGameOver = true;

function loadImages() {
    bgImage = new Image();
    bgImage.onload = function() {
        // show the background image
        bgReady = true;
    };
    bgImage.src = "images/background.png";

    heroImage = new Image();
    heroImage.onload = function() {
        // show the hero image
        heroReady = true;
    };
    heroImage.src = "images/hero.png";

    monsterImage = new Image();
    monsterImage.onload = function() {
        // show the monster image
        monsterReady = true;
    };
    monsterImage.src = "images/monster.png";
    isGameOver = false;
}

/** 
 * Setting up our characters.
 * 
 * Note that heroX represents the X position of our hero.
 * heroY represents the Y position.
 * We'll need these values to know where to "draw" the hero.
 * 
 * The same applies to the monster.
 */


let heroX = canvas.width / 2;
let heroY = canvas.height / 2;

let monsterX = 100;
let monsterY = 100;

/** 
 * Keyboard Listeners
 * You can safely ignore this part, for now. 
 * 
 * This is just to let JavaScript know when the user has pressed a key.
 */
let keysDown = {};

function setupKeyboardListeners() {
    // Check for keys pressed where key represents the keycode captured
    // For now, do not worry too much about what's happening here. 
    addEventListener("keydown", function(key) {
        keysDown[key.keyCode] = true;
    }, false);

    addEventListener("keyup", function(key) {
        delete keysDown[key.keyCode];
    }, false);
}


let score = 0;
/**
 *  Update game objects - change player position based on key pressed
 *  and check to see if the monster has been caught!
 *  
 *  If you change the value of 5, the player will move at a different rate.
 */
let update = function() {
    // Update the time.
    if (isGameOver) {
        document.getElementById("gameResult").innerHTML = "You ran out of time!"
        return;
    }


    if (elapsedTime >= SECONDS_PER_ROUND) {
        //if remaining seconds = 0, timer will stop
        // the hero can't not move
        isGameOver = true;
        return;
    }

    elapsedTime = Math.floor((Date.now() - startTime) / 1000);

    if (38 in keysDown) { // Player is holding up key
        if (heroY <= 0) {
            heroY = 480;
        } else {
            heroY -= 5;
        }
    }
    if (40 in keysDown) { // Player is holding down key
        if (heroY >= 480) {
            heroY = 0;
        } else {
            heroY += 5;
        }
    }
    if (37 in keysDown) { // Player is holding left key
        if (heroX <= 0) {
            heroX = 512;
        } else {
            heroX -= 5;
        }
    }
    if (39 in keysDown) { // Player is holding right key
        if (heroX >= 512) {
            heroX = 0;
        } else {
            heroX += 5;
        }
    }

    // Check if player and monster collided. Our images
    // are about 32 pixels big.
    if (
        heroX <= (monsterX + 32) &&
        monsterX <= (heroX + 32) &&
        heroY <= (monsterY + 32) &&
        monsterY <= (heroY + 32)
    ) {
        // Pick a new location for the monster.
        // Note: Change this to place the monster at a new, random location.

        monsterX = Math.floor(Math.random() * (canvas.width - 32))
        monsterY = Math.floor(Math.random() * (canvas.height - 32))

        score++;
    }
};

/**
 * This function, render, runs as often as possible.
 */
var render = function() {

    if (bgReady) {
        ctx.drawImage(bgImage, 0, 0);
    }
    if (heroReady) {
        ctx.drawImage(heroImage, heroX, heroY);
    }
    if (monsterReady) {
        ctx.drawImage(monsterImage, monsterX, monsterY);
    }

    ctx.fillText(`Monster catched: ${score}`, 20, 40);
    ctx.fillText(`Seconds Remaining: ${SECONDS_PER_ROUND - elapsedTime}`, 20, 20);

};

/**
 * The main game loop. Most every game will have two distinct parts:
 * update (updates the state of the game, in this case our hero and monster)
 * render (based on the state of our game, draw the right things)
 */
var main = function() {

    update();
    render();
    // Request to do this again ASAP. This is a special method
    // for web browsers. 
    requestAnimationFrame(main);
};

// Cross-browser support for requestAnimationFrame.
// Safely ignore this line. It's mostly here for people with old web browsers.
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

// Let's play this game!
loadImages();
setupKeyboardListeners();
main();

// function startGame() {

//     //document.getElementById("startButton").remove();
//     resetGame();
// }


let playerName = '';

function submitName() {
    playerName = document.getElementById("userName").value;
    console.log(playerName + 'this is my name');
    document.getElementById("nameDisplay").innerHTML = `Hi ${playerName}! Let's play the game!`;

    document.getElementById("userName").value = '';

}


function resetGame() {
    console.log("Reset Game")
    startTime = Date.now();
    SECONDS_PER_ROUND = 15;
    elapsedTime = 0;


    isGameOver = false;
    document.getElementById("nameDisplay").innerHTML = ``;
    document.getElementById("gameResult").innerHTML = ""

    heroX = canvas.width / 2;
    heroY = canvas.height / 2;

    monsterX = Math.floor(Math.random() * (canvas.width - 32))
    monsterY = Math.floor(Math.random() * (canvas.height - 32))
    score = 0;
    return;
}