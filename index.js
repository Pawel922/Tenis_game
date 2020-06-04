document.addEventListener("DOMContentLoaded", function () {
  const canvas = document.querySelector('canvas');
  const ctx = canvas.getContext('2d');

  canvas.width = 1000;
  canvas.height = 500;


  const cw = canvas.width;
  const ch = canvas.height;
  const ballSize = 20;
  //constant variables for rackets size and placement
  const racketHeight = 100;
  const racketWidth = 20;
  const racketVerticalBorderOffset = 70;
  //constant variables for players placement
  const playerX = racketVerticalBorderOffset;
  const aiX = cw - racketVerticalBorderOffset - racketWidth;
  //constant variables for central line
  const lineWidth = 2;
  const lineHeight = 15;

  //variables which describe ball placement
  let ballX = cw / 2 - ballSize / 2;
  let ballY = ch / 2 - ballSize / 2;

  //variables which describe rackets placement
  let playerY = ch / 2 - racketHeight / 2;
  let aiY = ch /2 - racketHeight / 2;

  //variables which describe ball speed
  let ballSpeedX = 5;
  let ballSpeedY = 5;

  //function which draw player racket
  function player() {
    ctx.fillStyle = '#7EA6F8';
    ctx.fillRect(playerX, playerY, racketWidth, racketHeight);
  }

  //function which draw ai racket
  function ai() {
    ctx.fillStyle = '#FFFF66';
    ctx.fillRect(aiX, aiY, racketWidth, racketHeight);
  }

  //function which draw ball
  function ball() {
    ctx.fillStyle = '#FBF0F0';
    ctx.fillRect(ballX, ballY, ballSize, ballSize);
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    if(ballX <= 0 || ballX + ballSize >= cw) {
      ballSpeedX = -ballSpeedX;
    }

    if(ballY <= 0 || ballY + ballSize >= ch) {
      ballSpeedY = -ballSpeedY;
    }
  }

  //function which draw table
  function table() {
    ctx.fillStyle = '#009900';
    ctx.fillRect(0,0,cw,ch);
    ctx.fillStyle = '#000000';
    for(let linePosition = 2; linePosition < ch; linePosition += 30) {
      ctx.fillRect(cw / 2 - lineWidth /2, linePosition, lineWidth, lineHeight);
    }
  }

  function playerPosition(event) {
    playerY = event.clientY - canvas.offsetTop - racketHeight / 2;

    if(playerY >= ch - racketHeight) {
      playerY = ch - racketHeight;
    }

    if(playerY <= 0) {
      playerY = 0;
    }
  }

  canvas.addEventListener("mousemove", playerPosition);

  function game() {
    table();
    ball();
    player();
    ai();
  }

  setInterval(game, 20);
})
