var background;
var player1,player2, player1Img, player2Img
var laser1, laser2, laser1Img, laser2Img;
var invisibleground;
var score1 = 0;
var score2 = 0;
var player1life = 5;
var player2life=5;
var im_heart;
var bulletGroup1;
var bulletGroup2;
var bomb1IMG,bomb2IMG

function preload(){
  ground = loadImage("images/Background.jpg");
  laser1Img = loadImage("images/Laser 1.png");
  laser2Img = loadImage("images/Laser 2.png");
  im_heart = loadImage('images/heart.png');
  bomb1IMG = loadImage("images/bomb 2.png");
  bomb2IMG = loadImage("images/bomb.png");

  //loadImage to Sprite objects
  player1Img = loadImage("images/Player1-.png");
  player2Img = loadImage("images/Player2-.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  //Sprite objects
  invisibleground = createSprite(width/2,height-40,1000,80);
  invisibleground.visible = false;

  player1 = createSprite(110,height-57, 50, 50);
  player1.addImage("player1",player1Img);
  player1.debug = false;
  player1.setCollider ("circle",0,0,80);

  player2 = createSprite(810,height-57,50,50);
  player2.addImage ("player2",player2Img);
  player2.scale = 0.7;
  player2.debug = false;
  player2.setCollider("circle",0,0,100);

  bulletGroup1=new Group();
  bulletGroup2=new Group();

 }

function draw() {
  background(ground);

  
  //count.x = count.x +600;

 if((touches.length > 0 || keyDown("right"))){
 player2.x = player2.x +5;
 touches = []
}

 if((touches.length > 0 || keyDown("left"))){
   player2.x = player2.x -5;
   touches = []
 }

 if((touches.length > 0 || keyDown("a"))){
   player1.x = player1.x -5;
   touches = []
 }

 if(touches.length > 0 || (keyDown("d"))){
   player1.x = player1.x +5;
   touches = []
 }

 if(touches.length > 0 || (keyDown("w"))){
  createlaser1();
  touches = []
 }

 if(touches.length > 0 || (keyDown("l"))){
  createlaser2();
  touches = []
 }

 if(touches.length > 0 || (keyDown("s"))){
   player1.y = player1.y -5;
   touches = []
 }

 if(touches.length > 0 || (keyDown("x"))){
   player1.y = player1.y +5;
   touches = []
 }

 if(touches.length > 0 || (keyDown("up"))){
   player2.y = player2.y -5;
   touches = []
 }

 if(touches.length > 0 || (keyDown("down"))){
   player2.y = player2.y +5;
   touches = []
 }

 createEdgeSprites();
 player1.collide(invisibleground);
 player2.collide(invisibleground);


 if(bulletGroup1.isTouching(player2)){
  score1=score1+1;
  player2life--;
  bulletGroup1.destroyEach();
  
 }

 if(bulletGroup2.isTouching(player1)){
  score2=score2+1;
  player1life--;
  bulletGroup2.destroyEach();
 }

 for (var i = 0 ; i < player1life ; i++) {
  image(im_heart, 10 + (i*50), 30,40,40);
}
for (var i = 0 ; i < player2life ; i++) {
image(im_heart, (width-300) + (i*50), 30,40,40);
}
fill("red");
textSize(22);
text("Score :"+score1,10,100);

fill("yellow");
textSize(22);
text("Score :"+score2,width-300,100);

if (player1life === 0 ||player2life === 0) {
  noLoop();

  textSize(60);
  textFont("Arial");
  textStyle(BOLD);
  textAlign(CENTER);
  fill(255);
  text('GAME OVER',500, 300);
}
  drawSprites();
  
  

}
function createlaser1() {
  laser1=createSprite(player1.x-45,player1.y-45,10,40);
  laser1.velocityX=5;
  if(score1 >= 0 && score1 < 3){
    laser1.addImage(laser1Img);
  }
  else{
    laser1.addImage(bomb1IMG);
  }

  bulletGroup1.add(laser1);
  laser1.scale=0.1;
  laser1.depth=player1.depth;
  player1.depth+=1
  
}
function createlaser2() {
  laser2=createSprite(player2.x+30,player2.y-30,5,20);
  laser2.velocityX=-5;
  if(score2 >= 0 && score2 < 3){
    laser2.addImage(laser1Img);
  }
  else{
    laser2.addImage(bomb2IMG);
  }
  bulletGroup2.add(laser2);
  laser2.scale=0.1;
  laser2.depth=player2.depth;
  player2.depth+=1
  
}