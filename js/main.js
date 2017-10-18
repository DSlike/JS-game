const jumpSize = 40,
      jumpStep = 10,
      stepSize = 2,
      level = 1;

let canvas = document.getElementById("myCanvas"),
    ctx = canvas.getContext("2d"),
    x = 0,
    characterX = 0,
    characterY = (canvas.height-40-jumpSize/2)*level,
    characterDefY = characterY,
    rightPressed = false,
    leftPressed = false,
    jump = false;

canvas.width = window.innerWidth;

let objectsMap = [[0,(canvas.height-40)*level, 40]];
// let map = [60, 60, 80, 80,80,60];

for(let i=0; i<canvas.width/20; i++){
  let a = Math.floor(Math.random() * (20 - 0)) + 0;
  if(a<10){
    objectsMap.push({x: i*20, y:(canvas.height-40)*level, h:40, w:20 });
  }
  else if(a>=10){
    objectsMap.push({x: i*20, y:(canvas.height-60)*level, h:60, w:20 });
  }
}

objectsMap[0].y = canvas.height-40;
objectsMap[0].h = 40;

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
  for(let i=0; i<objectsMap.length; i++){
    let o = objectsMap[i];
    ctx.rect(o.x, o.y, o.w, o.h);
    ctx.fillStyle = "black";
    ctx.lineWidth="0";
    ctx.strokeStyle="white";
    ctx.fill();
    // ctx.stroke();
  }
  ctx.closePath();
}

// document.addEventListener("keydown", keyDownHandler, false);
// document.addEventListener("keyup", keyUpHandler, false);
//
// function keyDownHandler(e) {
//     if(e.keyCode == 39) {
//         rightPressed = true;
//     }
//     else if(e.keyCode == 37) {
//         leftPressed = true;
//     }
//     else if(e.keyCode == 38 && jump==false) {
//         jump = true;
//         characterDefY = characterY;
//     }
// }
// function keyUpHandler(e) {
//     if(e.keyCode == 39) {
//         rightPressed = false;
//     }
//     else if(e.keyCode == 37) {
//         leftPressed = false;
//     }
// }
//
// function collisionDetection(){
//   for(let i=0; i<objectsMap.length; i++){
//     var o = objectsMap[i];
//     if(characterX>o.x && characterX<o.x+20){
//       characterX = o.x-20;
//     }
//   }
// }

function draw(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawCharacter();
  drawMap();
  // collisionDetection();

  if(characterY<characterDefY){
    characterY+=5;
  }
  if(rightPressed && characterX < canvas.width-20) {
      characterX += stepSize;
  }
  else if(leftPressed && characterX > 0) {
      characterX -= stepSize;
  }
  if(jump == true && characterY > characterDefY-jumpSize){
    characterY-=jumpStep;

    if(characterY <= characterDefY-jumpSize)
      jump=false;
  }
  if(jump == false && characterY < characterDefY){
    characterY+=jumpStep;
  }
  requestAnimationFrame(draw);
}

draw();
