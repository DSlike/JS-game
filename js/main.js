let canvas = document.getElementById("myCanvas"),
    ctx = canvas.getContext("2d"),
    x = 0,
    characterX = 0,
    characterY = canvas.height - 80,
    characterDefY = characterY,
    rightPressed = false,
    leftPressed = false,
    jump = false;

const jumpSize = 40,
      jumpStep = 10,
      stepSize = 2;

canvas.width = window.innerWidth;

let map = [60, 60, 80, 80,80,60];

for(let i=2; i<canvas.width/20; i+=2){
  let a = Math.floor(Math.random() * (10 - 0)) + 0;
  if(a > 5){
    map[i]=80;
    map[i+1]=80;
  }
  else{
    map[i]=60;
    map[i+1]=60;
  }
}

function drawCharacter(callback){
  ctx.beginPath();
  // ctx.rect(characterX, characterY, 20, 20);
  ctx.arc(characterX+10, characterY+10, 10, 0*Math.PI, 2*Math.PI);
  ctx.fillStyle = "yellow";
  ctx.fill();
  ctx.closePath();
}

function drawMap(){
  ctx.beginPath();
  for(let i=0; i<map.length; i++){
    ctx.rect(i*20, canvas.height-map[i], 20, map[i]);
    ctx.fillStyle = "black";
    ctx.lineWidth="0";
    ctx.strokeStyle="white";
    ctx.fill();
    // ctx.stroke();
  }
  ctx.closePath();
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = true;
    }
    else if(e.keyCode == 37) {
        leftPressed = true;
    }
    else if(e.keyCode == 38 && jump==false) {
        jump = true;
        characterDefY = characterY;
    }
}
function keyUpHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = false;
    }
    else if(e.keyCode == 37) {
        leftPressed = false;
    }
}

function collisionDetection(){
  let x = Math.round(characterX / 20);
  let y = characterY-120;
  if(canvas.height-map[x] == characterDefY && characterX-x*20 < 0){
    characterX -= Math.abs(characterX-x*20);
  }
  else if(canvas.height-map[x] == characterDefY && characterX-x*20 > 0){
    characterX -= Math.abs(characterX-x*20);
  }

  if(characterY >= canvas.height-map[x]-30 && characterDefY>canvas.height-map[x]-30){
    characterDefY = canvas.height-map[x]-30;
  }
  else if(characterDefY <= canvas.height-map[x]-20 && jump==false){
    characterDefY = canvas.height-map[x]-20;
  }
}

function draw(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawCharacter();
  drawMap();
  collisionDetection();

  if(characterY<characterDefY){
    characterY+=5;
  }
  if(rightPressed && characterX < canvas.width-20) {
      characterX += stepSize;
  }
  else if(leftPressed && characterX > 0) {
      characterX -= stepSize;
  }
  collisionDetection();
  if(jump == true && characterY > characterDefY-jumpSize){
    characterY-=jumpStep;

    if(characterY <= characterDefY-jumpSize)
      jump=false;
  }
  if(jump == false && characterY < characterDefY){
    characterY+=jumpStep;
  }
  collisionDetection();
  requestAnimationFrame(draw);
}

draw();
