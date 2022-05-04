var bg
var ball
var lvl1, lvl2, lvl3
var gamestate = 0
var level
var bg1
var ballGroup1
var ballGroup2
var ballGroup3
var cursor
var score = 0
var ballCount
var bg2
var bg3

function preload(){
  //LOADING THE IMAGES
 bg = loadImage("./assets/bg3.png")
 ball = loadImage("./assets/ball.png")
 lvl1 = loadImage("./assets/Level 1.png")
 lvl2 = loadImage("./assets/Level 2.png")
 lvl2 = loadImage("./assets/Level 3.png")
 bg1 = loadImage("./assets/Pixel.1.png")
 bg2 = loadImage("./assets/Pixel.2.png")
 bg3 = loadImage("./assets/Pixel.3.png")
 bg4 = laodImage("./assets/Pixel.4.png")
}

function setup() {
createCanvas(windowWidth-20,windowHeight-19.8)

//CREATING GROUPS
ballGroup1 = createGroup();
ballGroup2 = createGroup();
ballGroup3 = createGroup();

//CREATING INVISIBLE CURSOR
cursor = createSprite(20,20, 20,20)
cursor.visible = false
cursor.debug = false


}

function draw() {
  //ALIGNING CURSOR TO MOUSE POSITIONS
  cursor.x = mouseX
  cursor.y = mouseY

  //TEXT PROPERTIES
  textSize(40)
  fill("white")
  

  if (gamestate !== 4){
    text("Select a level to BEGIN", width/2 - 290, height/2 - 148)
  }

  //MAIN MENU
  if (gamestate == 0){
    ballCount = 0
    background(bg)
    
    //CREATING INVISIBLE BUTTONS
    btn1 = createSprite(width/2 - 3,height/2 + 165, 137,50)
    btn2 = createSprite(width/2 ,height/2 + 243, 145,50)
    btn3 = createSprite(width/2 ,height/2 + 324, 144,50)

    btn1.visible = false
    btn2.visible = false
    btn3.visible = false

  //CHANGING GAMESTATE DEPENDING ON BUTTON PRESSED
    if (mousePressedOver(btn1)){
      gamestate = 1
    }
    if (mousePressedOver(btn2)){
      gamestate = 2
    }
    if (mousePressedOver(btn3)){
      gamestate = 3
    }
  }

  //LEVEL 1
  if(gamestate == 1){
    background(bg1)
    level1()

    for (var i = 0; i < ballGroup1.length; i++) {
      if (ballGroup1.get(i).isTouching(cursor)) {
          ballGroup1.get(i).destroy();
          score = score+1;
      }
    }
    

  }
  
  //LEVEL 2
  if(gamestate == 2){
    background(bg1)
    level2()
    
    //MAKING SURE BALL DESPAWNS AFTER IT GETS TOUCHED BY CURSOR
    for (var i = 0; i < ballGroup2.length; i++) {
      if (ballGroup2.get(i).isTouching(cursor)) {
          ballGroup2.get(i).destroy();
          score = score+1;
      }
    }
  }
  
  //LEVEL 3
  if(gamestate == 3){
    background(bg1)
    level3()
    
    //MAKING SURE BALL DESPAWNS AFTER IT GETS TOUCHED BY CURSOR
    for (var i = 0; i < ballGroup3.length; i++) {
      if (ballGroup3.get(i).isTouching(cursor)) {
          ballGroup3.get(i).destroy();
          score = score+1;
      }
    }
  }

  //IF THE SCORE IS NOT 20 BY THE END OF THE LEVEL
  if(gamestate == 4){
    background(bg2)

    //DESTROYING BALLS FROM ALL GROUPS TO MAKE SURE NONE SPAWN ONCE THE LEVEL IS OVER
    ballGroup1.destroyEach()
    ballGroup2.destroyEach()
    ballGroup3.destroyEach()
    
    //CREATING INVISIBLE BUTTON SPRITE 
    var restartBtn = createSprite(width/2,height/2 + 117, 215, 65)
    restartBtn.visible = false

    //INVISIBLE BUTTON FUNCTIONS
    if(mousePressedOver(restartBtn)){
      //RELOAD THE SITE
      window.location.reload()
    }
  }

  //IF THE SCORE IS 20 BY THE END OF THE LEVEL (ONLY FOR LEVEL 1 AND 2)
  if (gamestate == 5){
    background(bg3)

    //DESTROYING BALLS FROM ALL GROUPS TO MAKE SURE NONE SPAWN ONCE THE LEVEL IS OVER
    ballGroup1.destroyEach()
    ballGroup2.destroyEach()
    ballGroup3.destroyEach()

    //CREATING INVISIBLE BUTTON SPRITE 
    var restartBtn1 = createSprite(width/2,height/2 + 117, 350, 65)
    restartBtn1.visible = false

    //INVISIBLE BUTTON FUNCTIONS
    if(mousePressedOver(restartBtn1)){
      //RELOAD THE SITE
      window.location.reload()
    }
  }

  //IF LEVEL 3 IS COMPLETED
  if (gamestate == 6){
    background(bg4)
    //DESTROYING BALLS FROM ALL GROUPS TO MAKE SURE NONE SPAWN ONCE THE LEVEL IS OVER
    ballGroup1.destroyEach()
    ballGroup2.destroyEach()
    ballGroup3.destroyEach()
  }

  drawSprites()

  //CREATING THE SCORE
  text("score = " + score, 50, 900)
}


function level1(){
    //EVERY 45 FRAMES, NEW BALL WILL BE SPAWNED
  if (frameCount % 45 === 0){
    ballCount += 1
   //CREATING BALL SPRITE
    ball1 = createSprite(Math.round(random(0,1920)), Math.round(random(0,975)))
    ball1.scale = 0.25
    ball1.setCollider("circle",35,-45, 143) 
    ball1.addImage(ball)

    //TIME UNTIL THE BALL DISAPPEARS
    ball1.lifetime = 35

    //ADDING BALL SPRITE TO GROUP
    ballGroup1.add(ball1)

    //ONCE 20 BALLS ARE SPAWNED, GAMESTATE WILL BE 4
    if (ballCount >= 21){
      gamestate = 4
    }

    //IF SCORE IS 20, GAMESTATE WILL BE 5
    if (score == 20){
      gamestate = 5
    }
  }
  
}

function level2(){
  //EVERY 25 FRAMES, NEW BALL WILL BE SPAWNED
  if (frameCount % 25 === 0){
    ballCount += 1
    //CREATING BALL SPRITE
    ball2 = createSprite(Math.round(random(0,1920)), Math.round(random(0,975)))
    ball2.scale = 0.25
    ball2.addImage(ball)

    //ADDING BALL SPRITE TO GROUP
    ballGroup2.add(ball2)

    //TIME UNTIL THE BALL DISAPPEARS
    ball2.lifetime = 25

    //ONCE 20 BALLS ARE SPAWNED, GAMESTATE WILL BE 4
    if (ballCount >= 21){
      gamestate = 4
    }

    //IF SCORE IS 20, GAMESTATE WILL BE 5
    if (score == 20){
      gamestate = 5
    }
  }
}

function level3(){
  //EVERY 17 FRAMES, NEW BALL WILL BE SPAWNED
  if (frameCount % 17 === 0){
    ballCount += 1

    //CREATING BALL SPRITE
    ball3 = createSprite(Math.round(random(0,1920)), Math.round(random(0,975)))
    ball3.scale = 0.25
    ball3.addImage(ball)

     //TIME UNTIL THE BALL DISAPPEARS
    ball3.lifetime = 15

    //ADDING BALL SPRITE TO GROUP
    ballGroup3.add(ball3)

    //ONCE 20 BALLS ARE SPAWNED, GAMESTATE WILL BE 4
    if (ballCount >= 21){
      gamestate = 4
    }

    //IF SCORE IS 20, GAMESTATE WILL BE 6
    if (score == 20){
      gamestate = 6
    }
  }
}