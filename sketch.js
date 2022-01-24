var bg, bgImg;
var bottomGround;
var topGround;
var balloon, balloonImg;
var obstacleTop, top1, top2;
var obstacleBottom, bottom1, bottom2, bottom3;
var obstacleTGroup, obstacleBGroup;
var star, starImg;
var PLAY = 1, END = 0
var gamestate = PLAY
var gameover, gameoverImg
var restart, restartImg
var starGroup
var score = 0;

function preload() {
  bgImg = loadImage("assets/bg.png")

  top1 = loadImage("assets/obsTop1.png")
  top2 = loadImage("assets/obsTop2.png")

  bottom1 = loadImage("assets/obsBottom1.png")
  bottom2 = loadImage("assets/obsBottom2.png")
  bottom3 = loadImage("assets/obsBottom3.png")

  gameoverImg = loadImage("assets/gameOver.png")
  restartImg = loadImage("assets/restart.png")
  starImg = loadImage("assets/star.png")

  balloonImg = loadAnimation("assets/balloon1.png", "assets/balloon2.png", "assets/balloon3.png")
}

function setup() {

  //background image
  bg = createSprite(165, 485, 1, 1);
  bg.addImage(bgImg);
  bg.scale = 1.3

  gameover = createSprite(200, 200);
  gameover.addImage(gameoverImg)
  gameover.visible = false

  restart = createSprite(200, 240)
  restart.addImage(restartImg)
  restart.visible = false;

  //creating top and bottom grounds
  bottomGround = createSprite(200, 390, 800, 20);
  bottomGround.visible = false;

  topGround = createSprite(200, 10, 800, 20);
  topGround.visible = false;

  //creating balloon     
  balloon = createSprite(100, 200, 20, 50);
  balloon.addAnimation("balloon", balloonImg);
  balloon.scale = 0.1;

  obstacleTGroup = new Group();
  obstacleBGroup = new Group();

starGroup = new Group();




}

function star(){
  if(World.frameCount%60===0){
    var star=createSprite(400,200,10,20);
    star.addImage(starImg)
    star.velocityX=-7;
    star.y=Math.round(random(50,100))
    star.lifetime=70
    star.depth=balloon.depth
     starGroup.add(star)
     star.scale=0.01
  }
}



function draw() {

  background("black");
  fill("white");



  if (gamestate === PLAY) {

    if (keyDown("space")) {
      balloon.velocityY = -6;
    }

    star();
  


    balloon.velocityY = balloon.velocityY + 2;

    spawnobstacleTop();
    spawnobstaclesBottom()

    if (obstacleTGroup.isTouching(balloon) || obstacleBGroup.isTouching(balloon) || balloon.isTouching(topGround) || balloon.isTouching(bottomGround)) {
      gamestate = END;

    }

  }

  if (gamestate === END) {

    gameover.visible = true;
    gameover.depth = gameover.depth + 1
    restart.visible = true;
    restart.depth = restart.depth + 1
    restart.scale = 0.5
    balloon.velocityX = 0;
    balloon.velocityY = 0;
    obstacleBGroup.setVelocityXEach(0)
    obstacleTGroup.setVelocityXEach(0)

    starGroup.setVelocityXEach(0)

    obstacleBGroup.setLifetimeEach(-1)
    obstacleTGroup.setLifetimeEach(-1)
    balloon.y = 200



    if (mousePressedOver(restart)) {
      reset()
    }
  }

  drawSprites();
  Score()

}

function reset() {
  gamestate = PLAY
  gameover.visible = false
  restart.visible = false
  obstacleTGroup.destroyEach()
  obstacleBGroup.destroyEach()
score=0;
}

function spawnobstacleTop() {
  if (World.frameCount % 60 === 0) {
    obstacleTop = createSprite(400, 50, 40, 50)
    obstacleTop.scale = 0.1;
    obstacleTop.velocityX = -3
    obstacleTop.y = Math.round(random(10, 100))
    var r1 = Math.round(random(1, 2))
    switch (r1) {
      case 1: obstacleTop.addImage(top1)
        break;
      case 2: obstacleTop.addImage(top2)
        break;
      default: break
    }
    obstacleTop.lifetime = 120
    balloon.depth = balloon.Depth + 1;
    obstacleTGroup.add(obstacleTop)
  }
}

function spawnobstaclesBottom() {
  if (World.frameCount % 70 === 0) {
    obstacleBottom = createSprite(400, 310, 40, 50)
    obstacleBottom.scale = 0.1;
    obstacleBottom.velocityX = -3
    var r2 = Math.round(random(1, 3))
    switch (r2) {
      case 1: obstacleBottom.addImage(bottom1)
        break;
      case 2: obstacleBottom.addImage(bottom2)
        break;
      case 3: obstacleBottom.addImage(bottom3)
        break;
      default: break
    }
    obstacleBottom.lifetime = 140
    balloon.depth = balloon.Depth + 1;
  }

}

function Score(){
  if (balloon.isTouching(starGroup)){
score=score+1
  }
  text("score:" + score,350,50)
}