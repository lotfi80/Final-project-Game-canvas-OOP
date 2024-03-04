import Player from "./classen/player.js";
import Ball from "./classen/ball.js";

const canvas = document.getElementById("canvas-2d");
canvas.width = 700;
canvas.height = 700;
const ctx = canvas.getContext("2d");

let obstacles = [
  { x: 100, y: 300, width: 50, height: 50, color: "green" },
  { x: 300, y: 300, width: 50, height: 50, color: "green" },
  { x: 500, y: 300, width: 50, height: 50, color: "green" },
];

let playerPositionX = 350;
let playerPositionY = 650;
let playerSpeed = 5;
let playerWidth = 100;

let player = new Player(350, 650, 100, 10, 5);

let ballRadius = 15;
let ballX = player.x;
let ballY = player.y - ballRadius;
let ballSpeedX = 5;
let ballSpeedY = -5;
let isGameover = false;
let isWinning = false;
let ball = new Ball(
  player.x,
  player.y - ballRadius,
  ballSpeedX,
  ballSpeedY,
  ballRadius,
  0
);
ctx.fillStyle = "black";
ctx.fillRect(0, 0, canvas.width, canvas.height);
player.drawPlayer(ctx);
ball.drawBall(ctx);
drawObstacles();

let rounds = 0;
const maxRounds = 20;

function drawLine(x1, y1, x2, y2) {
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
}

function drawOneObstacle(x1, y1, w, h, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x1, y1, w, h);

  ctx.strokeStyle = "white";
  drawLine(x1, y1, x1 + w, y1);
  drawLine(x1, y1, x1, y1 + h);
  drawLine(x1 + w, y1, x1 + w, y1 + h);
  drawLine(x1, y1 + h, x1 + w, y1 + h);
}

function drawObstacles() {
  obstacles.forEach((obstacle) => {
    drawOneObstacle(
      obstacle.x,
      obstacle.y,
      obstacle.width,
      obstacle.height,
      obstacle.color
    );
  });
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
  obstacles = [
    { x: 100, y: 300, width: 50, height: 50, color: "green" },
    { x: 300, y: 300, width: 50, height: 50, color: "green" },
    { x: 500, y: 300, width: 50, height: 50, color: "green" },
  ];
}

function resetGame() {
  // Setzen  alle Spielvariablen auf ihre Anfangswerte zurück
  initializeGameVariables();

  obstacles.forEach((obstacle) => {
    obstacle.color = "green";
  });

  // Starten  das Spiel erneut
  gameLoop();
}

function gameLoop() {
  if (!isGameover && !isWinning) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ball.moveBall(player, obstacles, canvas);

    drawObstacles();
    ball.drawBall(ctx);
    // console.log(ctx)
    player.drawPlayer(ctx);

    // Überprüfen, ob alle Hindernisse rot sind
    const allObstaclesRed = obstacles.every(
      (obstacle) => obstacle.color === "red"
    );
    if (allObstaclesRed) {
      isWinning = true;
      const playAgain = (ctx.font = "20px Helvetica");
      ctx.textAlign = "center";
      ctx.fillStyle = "Green";
      ctx.fillText(
        `Congratulations! You win! Do you want to play again?`,
        canvas.width / 2,
        20
      );
    }

    // Überprüfen, ob das Spiel vorbei ist
    if (ball.rounds >= maxRounds) {
      isGameover = true;
      ctx.font = "20px Helvetica";
      ctx.textAlign = "center";
      ctx.fillStyle = "red";
      ctx.fillText(`Game over`, canvas.width / 2, 20);
    }

    requestAnimationFrame(gameLoop);
  }
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
      gameLoop(); // Spiel zurücksetzen, wenn die Taste 'R' gedrückt 
      break;
    case "ok":
      resetGame(); // Spiel zurücksetzen, wenn die Taste 'R' gedrückt 
      break;
  }
});

// Initialisiere das Spiel
initializeGameVariables();
// erst mal auskommentiert 
// gameLoop();
