var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;

  ghost = createSprite(300,300);
  ghost.addImage(ghostImg);
  ghost.scale = 0.3;
  ghost.debug = false;
  ghost.setCollider("circle",0,20,130);

  doorsGroup = createGroup();
  railingsGroup = createGroup();
  blocksGroup = createGroup();

  spookySound.loop();
  spookySound.setVolume(0.2);
  
}

function draw() {
  background(200);
  drawSprites();
  

  if(gameState === "play"){
    if(tower.y > 400){
      tower.y = 300
    }

    if(keyDown("space")){
      ghost.velocityY = -13;
    }
    ghost.velocityY += 0.8;

    if(keyDown("left")){
      ghost.x -= 10
    }

    if(keyDown("right")){
      ghost.x += 10;
    }


    if(railingsGroup.isTouching(ghost)){
      ghost.velocityY = 0;
    }

    if(blocksGroup.isTouching(ghost) || ghost.y > 650){
      gameState = "end";
    }


    obstacle();
  }
  else if(gameState = "end"){
    tower.velocityY = 0;
    ghost.velocityY = 0;

    doorsGroup.setVelocityYEach(0);
    railingsGroup.setVelocityYEach(0);
    blocksGroup.setVelocityYEach(0);

    doorsGroup.setLifetimeEach(-10);
    railingsGroup.setLifetimeEach(-10);
    blocksGroup.setLifetimeEach(-10);

    textAlign(CENTER);
    fill ("red");
    textSize(50);
    text ("Game Over!", 300,300);
  }
  
}

function obstacle(){
  if(frameCount%200===0){
    door = createSprite(random(100,500),-100);
    door.addImage(doorImg);
    door.scale = 0.8;   

    railing = createSprite(door.x,-50);
    railing.addImage(climberImg);
    railing.scale = 0.8;

    block = createSprite(door.x,-40,70,5);
    block.visible = false;

    door.velocityY = 1;
    railing.velocityY = 1;
    block.velocityY = 1;

    ghost.depth = door.depth;
    ghost.depth += 1;
    
    door.lifetime = 700;
    railing.lifetime = 700;
    block.lifetime = 700;

    doorsGroup.add(door);
    railingsGroup.add(railing);
    blocksGroup.add(block);
  }
}
