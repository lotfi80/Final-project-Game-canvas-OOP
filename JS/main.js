


import Player from "./classen/player.js";
import Ball from "./classen/ball.js";
import Obstacles from "./classen/obstacles.js";




const canvas = document.getElementById("canvas-2d");
canvas.width = 700;
canvas.height = 700;
const ctx = canvas.getContext("2d");

// Initialisieren Sie das Spiel beim Laden der Seite


let obstacleArray = [
  { x: 100, y: 300, width: 50, height: 50, color: "green" },
  { x: 300, y: 300, width: 50, height: 50, color: "green" },
  { x: 500, y: 300, width: 50, height: 50, color: "green" },
];

const playerPositionX = 350;
const playerPositionY = 650;
let playerSpeed = 5;
const playerWidth = 100;
const playerHeight = 10;

let player = new Player(playerPositionX, playerPositionY, playerWidth, playerHeight, playerSpeed);


let ballRadius = 15;
let ballX = player.x;
let ballY = player.y - ballRadius;
let ballSpeedX = 5;
let ballSpeedY = -5;
let isGameover = false;
let isWinning = false;
// let rounds = 0;
const maxRounds = 3;
// let isRestarting = false;

let yesButtonGameOver;
let noButtonGameOver;
/// obstacles instance öffnet neu object und in der obstaclesInstance.getObstacles() schickt es zurück in Array
let obstaclesInstance= new Obstacles(obstacleArray)
let obstacles = obstaclesInstance.getObstacles()
console.log(obstacles)
let ball = new Ball(
  ballX,
  ballY - ballRadius,
  ballSpeedX,
  ballSpeedY,
  ballRadius,
  0
);


window.onload = function () {
  ctx.fillStyle = "black";
ctx.fillRect(0, 0, canvas.width, canvas.height);
player.drawPlayer(ctx);
ball.drawBall(ctx);
obstaclesInstance.drawObstacles(ctx);
  // ... (Code zum Initialisieren des Canvas, der Spieler, Hindernisse usw.)
  // Beispiel: initializeGame();
  // ...

  // Starten Sie die Spiel-Schleife
  // gameLoop();
};





// function drawLine(x1, y1, x2, y2) {
//   ctx.beginPath();
//   ctx.moveTo(x1, y1);
//   ctx.lineTo(x2, y2);
//   ctx.stroke();
// }

// function drawOneObstacle(x1, y1, w, h, color) {
//   ctx.fillStyle = color;
//   ctx.fillRect(x1, y1, w, h);

//   ctx.strokeStyle = "white";
//   // drawLine(x1, y1, x1 + w, y1);
//   // drawLine(x1, y1, x1, y1 + h);
//   // drawLine(x1 + w, y1, x1 + w, y1 + h);
//   // drawLine(x1, y1 + h, x1 + w, y1 + h);
// }

// function drawObstacles() {
//   obstacles.forEach((obstacle) => {
//     drawOneObstacle(
//       obstacle.x,
//       obstacle.y,
//       obstacle.width,
//       obstacle.height,
//       obstacle.color
//     );
//   });
// }
function noButtonClickHandler (){
  alert('Thank you for playing!');
}

function initializeGameVariables() {
  player = new Player(350, 650, 100, 10, 5);
  ball = new Ball(
    player.x,
    player.y - ballRadius,
    ballSpeedX,
    ballSpeedY,
    ballRadius,
    0
  );
   obstaclesInstance= new Obstacles(obstacleArray)
 obstacles = obstaclesInstance.getObstacles()
}



function resetGame() {
  // Setzen Sie alle Spielvariablen auf ihre Anfangswerte zurück
  initializeGameVariables();

  // obstacles.forEach((obstacle) => {
  //   obstacle.color = "green";
  // });

  // Setzen Sie die Zustandsvariablen zurück
  isGameover = false;
  isWinning = false;

  // Entfernen Sie die Event-Handler, um mehrfache Hinzufügungen zu vermeiden
  // yesButtonGameOver.removeEventListener('click', resetGame);
  // noButtonGameOver.removeEventListener('click', function () {
  //   alert('Thank you for playing!');
  // });



  // Starten Sie das Spiel erneut
  gameLoop();
  ///  um zu löschen eventlkistener , vorher bei scape drücken wurde die geschwimdichkeit der ball erhöht 
  yesButtonGameOver.removeEventListener('click', resetGame);
  noButtonGameOver.removeEventListener('click', noButtonClickHandler);

}

function gameLoop() {
  if (!isGameover && !isWinning) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ball.moveBall(player, obstacles, canvas);

    obstaclesInstance.drawObstacles(ctx);
    ball.drawBall(ctx);
    player.drawPlayer(ctx);

    // Überprüfen, ob alle Hindernisse rot sind
    const allObstaclesRed = obstacles.every(
      (obstacle) => obstacle.color === "red"
    );

    if (allObstaclesRed) {
      isWinning = true;
      const playAgain = (ctx.font = "20px Helvetica");
      ctx.textAlign = "center";
      ctx.fillStyle = "green";
      ctx.fillText(
        `Congratulations! You win! Do you want to play again?`,
        canvas.width / 2,
        20
      );
    }

    // Überprüfen, ob das Spiel vorbei ist
    if (ball.rounds >= maxRounds) {
      isGameover = true;
      ctx.font = "25px Helvetica";
      ctx.textAlign = "center";
      ctx.fillStyle = "red";
      const messageY = 100;
      const buttonY = messageY + 50;  
      ctx.fillText(`Game over, Do you want to play again`, canvas.width / 2, messageY);

      // Rufen Sie die Event-Handler-Funktionen außerhalb der gameLoop-Funktion auf
      setupGameOverButtons(buttonY);
    }

    requestAnimationFrame(gameLoop);
  }
}

function setupGameOverButtons(buttonY) {
  yesButtonGameOver = document.getElementById('yes-game-over');
  noButtonGameOver = document.getElementById('no-game-over');

  yesButtonGameOver.style.display = 'block';
  noButtonGameOver.style.display = 'block';
  yesButtonGameOver.style.top = `${buttonY}px`;
  noButtonGameOver.style.top = `${buttonY}px`;

  yesButtonGameOver.addEventListener('click', resetGame);

  noButtonGameOver.addEventListener('click', noButtonClickHandler   );
}
  


document.addEventListener("keydown", function (e) {
  switch (e.code) {
    case "ArrowLeft":
      player.movePlayer("left", canvas);
      break;
    case "ArrowRight":
      player.movePlayer("right", canvas);
      break;
    case "Space":
      gameLoop(); // Spiel zurücksetzen, wenn die Taste 'R' gedrückt wird
      break;
    // case "ok":
    //   resetGame(); // Spiel zurücksetzen, wenn die Taste 'R' gedrückt wird
    //   break;
  }
});

document.addEventListener("keydown", function (e) {
  switch (e.code) {
    case "ArrowLeft":
      player.movePlayer("left", canvas);
      break;
    case "ArrowRight":
      player.movePlayer("right", canvas);
      break;
    case "Space":
      gameLoop(); // Spiel zurücksetzen, wenn die Taste 'R' gedrückt wird
      break;
    case "ok":
      resetGame(); // Spiel zurücksetzen, wenn die Taste 'R' gedrückt wird
      break;
  }
});

// Initialisiere das Spiel
initializeGameVariables();
// gameLoop();
