var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameOver;
var gameState = "play";


function preload(){
  towerImg = loadImage(" tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost.png");
  gameOverImg =loadAnimation("gameOver.png");

}

function setup() {
  createCanvas(600, 600);
  
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 10;

  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();

  ghost = createSprite(200,200,50,50);
  ghost.scale = 0.1;
  ghost.addImage("ghost",ghostImg);

 
}


function draw() {
  background(0);

  if(gameState === "play"){
   if(keyDown("left_arrow")){
      ghost.x = ghost.x-7;
    }

    if(keyDown("right_arrow")){
      ghost.x = ghost.x+7;
    }

    

    if(tower.y > 400){
      tower.y = 300
    }
    
    
    spawnDoors();

    if(climbersGroup.isTouching(ghost)){
      ghost.velocityY = 0;
    }


    if(invisibleBlockGroup.isTouching(ghost) || ghost.y> 600){
      ghost.destroy();
      gameState = "end";
      
    }
    
    drawSprites();
}
if(gameState === "end"){
  fill ("red");
  textSize(50);
  text("Game Over",170,300);
  
}
}
function spawnDoors(){
  if (frameCount % 240 === 0){
    var door = createSprite(200,-50);
    door.addImage(doorImg);

    var climber = createSprite(200,10);
    climber.addImage(climberImg);

    var invisibleBlock = createSprite(200,15);
    invisibleBlock.width = climber.width;
    invisibleBlock.height = 2;

    
    door.x = Math.round(random(120,400));
    door.velocityY = 7;

    climber.x = door.x;
    climber.velocityY = 7;

    invisibleBlock.x  = door.x;
    invisibleBlock.velocityY = 5;
    invisibleBlock.visible = false;

    door.lifetime = 800;
    climber.lifetime = 800;
    invisibleBlock.lifetime = 800;

    doorsGroup.add(door);
    climbersGroup.add(climber);

    invisibleBlock.debug = true
    invisibleBlockGroup.add(invisibleBlock);

    ghost.depth = door.depth;
    ghost.depth  += 3;
  }
  
}