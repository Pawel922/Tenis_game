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
  //const vatiable for ball speed
  const speedMax = 16;

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

  //function which cause that ball moves faster
  function speedUp(step) {
    if(ballSpeedX > 0 && ballSpeedX < speedMax) {
      ballSpeedX += step;
    } else if (ballSpeedX < 0 && ballSpeedX > -speedMax) {
      ballSpeedX -= step;
    }

    if(ballSpeedY > 0 && ballSpeedY < speedMax) {
      ballSpeedY += step;
    } else if (ballSpeedY < 0 && ballSpeedY > -speedMax) {
      ballSpeedY -= step;
    }
  }

  //function which draw ball
  function ball() {
    ctx.fillStyle = '#FBF0F0';
    ctx.fillRect(ballX, ballY, ballSize, ballSize);
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    if(ballX <= 0 || ballX + ballSize >= cw) {
      ballSpeedX = -ballSpeedX;
      speedUp(0.2);
    }

    if(ballY <= 0 || ballY + ballSize >= ch) {
      ballSpeedY = -ballSpeedY;
      speedUp(0.2);
    }

    if(ballX <= playerX + racketWidth &&
      ballY - playerY <= racketHeight &&
      ballY - playerY >= -ballSize) {
        ballSpeedX = -ballSpeedX;
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

  //function which allow to control position of player racket
  function playerPosition(event) {
    playerY = event.clientY - canvas.offsetTop - racketHeight / 2;

    if(playerY >= ch - racketHeight) {
      playerY = ch - racketHeight;
    }

    if(playerY <= 0) {
      playerY = 0;
    }
  }

  //function which simulate ai movement
  function aiPosition() {
    let ballCenter = ballY + ballSize / 2;
    let aiRacketCenter = aiY + racketHeight / 2;

    if(ballX < cw / 2) {
      if(aiRacketCenter - ballCenter > 250) {
        aiY <= 0 ? aiY = 0 : aiY -= 10;
      } else if(aiRacketCenter - ballCenter > 100) {
        aiY <= 0 ? aiY = 0 : aiY -= 5;
      } else if(aiRacketCenter - ballCenter < -250) {
        aiY >= ch - racketHeight ? aiY = ch - racketHeight : aiY += 10;
      } else if(aiRacketCenter - ballCenter < -100) {
        aiY >= ch - racketHeight ? aiY = ch - racketHeight : aiY += 5;
      }
    } else if(ballX >= cw /2 ) {
      if(aiRacketCenter - ballCenter > 200) {
        aiY <= 0 ? aiY = 0 : aiY -= 25;
      } else if(aiRacketCenter - ballCenter > 25) {
        aiY <= 0 ? aiY = 0 : aiY -= 10;
      } else if(aiRacketCenter - ballCenter < -200) {
        aiY >= ch - racketHeight ? aiY = ch - racketHeight : aiY += 25;
      } else if(aiRacketCenter - ballCenter < -25) {
        aiY >= ch - racketHeight ? aiY = ch - racketHeight : aiY += 10;
      }
    }
  }

  canvas.addEventListener("mousemove", playerPosition);

  function game() {
    table();
    ball();
    player();
    aiPosition();
    ai();
  }

  setInterval(game, 20);
})
