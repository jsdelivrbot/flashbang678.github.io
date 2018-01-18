var isGameOver;
var score;

var GRAVITY = 0.3;
var JUMP = -7;
var DIVE = 7;
var BOOST = 10;

var groundSprites;
var GROUND_SPRITE_WIDTH = 50;
var GROUND_SPRITE_HEIGHT = 50;
var numGroundSprites;

var player;
var playerImage;

var obstacleSprites;

function preload(){
playerImage=loadImage("./spaceship.png")
}



function setup() {
    isGameOver = false;
    score = 0;
    
    createCanvas(window.innerWidth-30, window.innerHeight-40);
    background(0, 0, 0);
    groundSprites = new Group();
    
    numGroundSprites = width/GROUND_SPRITE_WIDTH+1;
    for (var n = 0; n < numGroundSprites; n++) {
        var groundSprite = createSprite(n*50, height-25, GROUND_SPRITE_WIDTH, GROUND_SPRITE_HEIGHT);
        groundSprite.shapeColor = color(76, 30, 6);
        groundSprites.add(groundSprite);
    }

    for (var n = 0; n < numGroundSprites; n++) {
        var groundSprite = createSprite(n*50, height-25, GROUND_SPRITE_WIDTH, GROUND_SPRITE_HEIGHT);
        groundSprites.add(groundSprite);
    }
    
    player = createSprite(100, height -75, 50, 50);
    
    obstacleSprites = new Group();
    player.addImage(playerImage);
    player.scale=.25;
}

function draw() {
    if (isGameOver) {
        background(0);
        fill(255);
        textAlign(CENTER);
        text("Your score was: " + score, camera.position.x, camera.position.y - 20);
        text("Game Over! Click anywhere to restart", camera.position.x, camera.position.y);
    } else {
        background(0, 0, 0);
        
        player.velocity.y = player.velocity.y + GRAVITY;
        if (groundSprites.overlap(player)) {
            player.velocity.y = 0;
            player.position.y = (height-50) - (player.height/2);
        }
        

        if (random() > 0.95) {
            var obstacle = createSprite(camera.position.x + width, random(0, (height-50)-15), 30, 30);
            obstacleSprites.add(obstacle);
            obstacle.shapeColor = color(107, 102, 100);
        }
        
        var firstObstacle = obstacleSprites[0];
            obstacleSprites.shapeColor = color(119, 113, 110);
        if (obstacleSprites.length > 0 && firstObstacle.position.x <= camera.position.x - (width/2 + firstObstacle.width/2)) {
            removeSprite(firstObstacle);
        }
        
        obstacleSprites.overlap(player, endGame);

        if (keyDown(UP_ARROW)) {
            player.velocity.y = JUMP;
        }
        if (keyDown(DOWN_ARROW)) {
            player.velocity.y = DIVE;
        }
        if (keyDown(RIGHT_ARROW)){
            player.position.x = player.position.x + 13 + BOOST ;
            score = score + 2
            camera.position.x = player.position.x + (width/16) + BOOST;
        }else {player.position.x = player.position.x + 10 ;
            score = score + 1
            camera.position.x = player.position.x + (width/16)}
        
        drawSprites();
        
        textAlign(CENTER);
        text(score, camera.position.x, 10);
    }
}

function endGame() {
    isGameOver = true;
}

function mouseClicked() {
  if (isGameOver) {
      
    for (var n = 0; n < numGroundSprites; n++) {
      var groundSprite = groundSprites[n];
      groundSprite.position.x = n*50;
    }

    player.position.x = 100;
    player.position.y = height-75;

    obstacleSprites.removeSprites();
    
    score = 0;
    isGameOver = false;
  }
}
