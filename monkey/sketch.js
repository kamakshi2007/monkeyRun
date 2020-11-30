
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var ground;
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var bananaGroup, obstacleGroup;
var score;
var time;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  bgImage = loadImage("tree.jpg");
 
}



function setup() {
  background("white");
  createCanvas(500,310);
  monkey = createSprite(50,300,20,20);
  monkey.addAnimation("running", monkey_running);
  edges = createEdgeSprites();
  monkey.scale = 0.1;
  monkey.x = 50
  ground = createSprite(50,300,1000,5);
  //ground.visible = false;
  var rand =  Math.round(random(1,100))
  
  
   obstacleGroup = new Group();
   bananaGroup = new Group();
  
   score = 0;
   time = 0;
}


function draw() {
   //background("bgImage");
   background(200);
   fill("black");
   textSize(20);
   text("Score: "+ score, 370,50);
   
   fill("black");
   textSize(20);
   text("Survival Time = " + time , 300,70);
   
   
  if( gameState === PLAY ){
      if(keyDown("space") && monkey.y >= 240) {
      monkey.velocityY = -13;
 }
     monkey.velocityY = monkey.velocityY + 0.5;
     monkey.collide(ground);
    
     spawnObstacle();
     spawnbanana();
      
     for (var k = 0; k < bananaGroup.length; k++) {
        if (bananaGroup.contains(bananaGroup.get(k))) {
          if (monkey.isTouching(bananaGroup.get(k))) {
               bananaGroup.get(k).destroy(); 
                score=score+1;
               
       }
    }
       
     }
    
       
      if (obstacleGroup.isTouching(monkey)){
        gameState = END;
        
     }
     time = time + Math.round(getFrameRate()/60);
    console.log(Math.round(getFrameRate()/60));
  
  }
   else if (gameState === END){
     bananaGroup.setVelocityXEach(0);
     obstacleGroup.setVelocityXEach(0);
     monkey.velocityX = 0;
     
     obstacleGroup.destroyEach();
     monkey.destroy();
     bananaGroup.destroyEach();
    
        stroke(3000);
        fill("red");
        textSize(40);
        text("GAME OVER",120,200);
   }
    
  
  
  drawSprites();
  
  
}

function spawnObstacle(){
 
  
  if(frameCount%300===0){
    obstacle = createSprite(410,260,40,10);
    obstacle.velocityX = -4;
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.5;
    //obstacle.y = 300;    
    obstacle.lifetime  = 160;
    obstacle.scale = 0.2;
    obstacleGroup.add(obstacle);
    obstacle.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    //obstacle.depth = obstacle.depth+1;
  }
}
function spawnbanana(){
 
  
  if(frameCount%80===0){
    banana = createSprite(410,115,40,10);
    banana.velocityX = -4;
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.y = Math.round(random(90,150));    
    banana.lifetime  = 160;
    bananaGroup.add(banana);
    
    
  }
}


