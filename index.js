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

  //variables for score
  let pointScore = false;

  let interval = null;

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

    //conditions when ball touches horizontal border
    if(ballX <= 0) {
      var aiScore = getCookie('aiScore');
      aiScore ++;
      setCookie('aiScore', aiScore);
      pointScore = true;
    }

    if(ballX + ballSize >= cw) {
      var playerScore = getCookie('playerScore');
      playerScore ++;
      setCookie('playerScore', playerScore);
      pointScore = true;
    }

    //conditions when ball touches vertical border
    if(ballY <= 0 || ballY + ballSize >= ch) {
      ballSpeedY = -ballSpeedY;
      speedUp(0.2);
    }

    //conditions when ball touches player racket
    if(ballX <= playerX + racketWidth &&
      ballY - playerY < racketHeight &&
      ballY - playerY > -ballSize) {
        ballSpeedX = -ballSpeedX;
    }

    //conditions when ball touches ai rackets
    if(aiX <= ballX + ballSize &&
      ballY - aiY < racketHeight &&
      ballY - aiY > -ballSize) {
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

  // function which simulate ai movement
  function aiPosition() {
    let ballCenter = ballY + ballSize / 2;
    let aiRacketCenter = aiY + racketHeight / 2;

    if(ballX < cw / 2) {
      if(aiRacketCenter - ballCenter > 250) {
        aiY <= 0 ? aiY = 0 : aiY -= 10;
      } else if(aiRacketCenter - ballCenter > 100) {
        aiY <= 0 ? aiY = 0 : aiY -= 7;
      } else if(aiRacketCenter - ballCenter < -250) {
        aiY >= ch - racketHeight ? aiY = ch - racketHeight : aiY += 10;
      } else if(aiRacketCenter - ballCenter < -100) {
        aiY >= ch - racketHeight ? aiY = ch - racketHeight : aiY += 7;
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

  //function to display information in the middle of screen
  function displayInfo (content) {
    ctx.fillStyle = '#000000';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = '10vh Ubuntu';
    ctx.fillText(content, cw / 2, ch / 2);
  }

  //function to display current scores
  function displayScores() {
    document.querySelectorAll('#scores div p span')[1].textContent = getCookie('aiScore');
    document.querySelectorAll('#scores div p span')[0].textContent = getCookie('playerScore');
  }

  //function to set cookie
  function setCookie(cname, cvalue) {
    document.cookie = cname + "=" + cvalue + ";";
  }

  //function to get cookie
  function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }



  function game() {
    if(!pointScore) {
      table();
      ball();
      player();
      ai();
      aiPosition();
    } else {
      clearInterval(interval);
      setTimeout(function() {
        document.location.reload();
      }, 1000);
    }
  }

  if(getCookie('playerScore') == ""){
    setCookie('playerScore', 0);
  }

  if(getCookie('aiScore') == ""){
    setCookie('aiScore', 0);
  }



  game();
  displayInfo("Press 'Enter' to start");
  displayScores();
  canvas.addEventListener("mousemove", playerPosition);

  //start playing the game after 'Enter' key pressed
  document.addEventListener("keypress", function(e) {
    if(e.code === 'Enter') {
      interval = setInterval(game,20);
    }
  })


})
