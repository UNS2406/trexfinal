//C1-C7 breakout game

//Declare variables for game objects and behaviour indicators(FLAGS)
var ball;
var paddle;
var brick, bricksGroup;
var score;
var gameState;
var lives;

//Create Media library and load to use it during the course of the software
//executed only once at the start of the program
function preload() {}

//define the intial environment of the software(before it is used)
//by defining the declared variables with default values
//executed only once at the start of the program
function setup() {
  //create ball as a sprite object
  ball = createSprite(200, 200, 10, 10);
  //ball.setAnimation("golfball_1");
  ball.scale = 1;

  //create paddle as a sprite object
  paddle = createSprite(200, 350, 120, 10);
  paddle.shapeColor = "blue";

  //create group for bricks
  bricksGroup = createGroup();

  //create edges in the form of sprites
  createEdgeSprites();

  //assigning default values
  score = 0;
  lives = 3;
  gameState = "pre-start";

  //function call to create a brick row based on y-position and color
  createBrickRow(65, "red");
  createBrickRow(65 + 29, "orange");
  createBrickRow(65 + 29 + 29, "green");
  createBrickRow(65 + 29 + 29 + 29, "yellow");
}

//All modifications, changes, conditions, manipulations, actions during the course of the program are written inside function draw.
//All commands to be executed and checked continously or applied throughout the program are written inside function draw.
//function draw is executed for every frame created since the start of the program.
function draw() {
  // color the background area
  background("black");

  //display scoreboard and lives counter
  textSize(20);
  text("Score: " + score, 40, 25);
  text("Lives: " + lives, 40, 45);

  text("Gamestate: " + gameState, 200, 45);

  //conditions to check what kind of gamestate is active and choose the behaviour accordingly
  if (gameState == "pre-start") {
    //behaviour of the game when the game starts(or restarts)
    text("Click to serve the ball.", 120, 250);
    ball.velocityX = 0;
    ball.velocityY = 0;
    ball.x = 200;
    ball.y = 200;
  } else if (gameState == "end") {
    //display gameover message
    text("Game Over", 150, 250);
    //display gameover message
    text("Press R to restart", 130, 270);
    ball.remove();
    //behaviour to follow when you need to play the game again after losing
    if (keyDown("R")) {
      gameState = "pre-start";

      score = 0;
      lives = 3;

      //create ball as a sprite object
      ball = createSprite(200, 200, 20, 20);
      //ball.setAnimation("golfball_1");
      ball.scale = 0.05;
    }
  } else {
    //add movement to the paddle
    paddle.x = mouseX;
    //paddle.x = ball.x;

    //restrict ball movement inside canvas by bouncing it off all the four edges
    //ball.bounceOff(rightEdge);
    //ball.bounceOff(leftEdge);
    //ball.bounceOff(topEdge);
    ball.bounceOff(bricksGroup, brickHit);

    //condition to make a sound if ball bounces off the paddle
    if (ball.bounceOff(paddle)) {
    }

    //condition to get the GAME WIN behaviour if all the bricks are destroyed
    if (!bricksGroup[0]) {
      //console.log("Won");
      ball.velocityX = 0;
      ball.velocityY = 0;
      text("Well Done!!", 150, 200);
    }
    //conditions to bring ball back to default position if it crosses the right/left edge
    if (ball.x < 60) {
      ball.x = 60;
    }

    if (ball.x > 340) {
      ball.x = 340;
    }
    if (ball.y < 4) {
      ball.y = 5;
    }
    //condition to apply behaviour if the ball misses the paddle
    if (ball.y > 400) {
      //function call to end the game and reduce life by one
      lifeover();
    }
  }

  //display sprite objects
  drawSprites();
}

//function definition to create a brick row as a sprite object based on y-position and color
function createBrickRow(yInput, colorInput) {
  //for loop to create six bricks in a row
  for (var i = 0; i < 6; i++) {
    brick = createSprite(65 + 54 * i, yInput, 50, 25);
    brick.shapeColor = colorInput;
    bricksGroup.add(brick);
  }
}

// function definition and call to be triggered when a mouse button is pressed
// we use this function to add movement to the ball
function mouseClicked() {
  console.log("sdvdf");
  if (gameState == "pre-start") {
    ball.velocityX = 3;
    ball.velocityY = 3;

    gameState = "play";
  }
}

//function definition to end the game and reduce life by one
function lifeover() {
  lives = lives - 1;
  if (lives >= 1) {
    gameState = "pre-start";
  } else {
    gameState = "end";
  }
}

function brickHit(ball, brick) {
  brick.remove();
  score = score + 5;
  //keep on increasing th speed of the ball
  if (ball.velocityY < 12 && ball.velocityY > -12) {
    ball.velocityX *= 0.05;
    ball.velocityY *= 0.05;
  }
}
