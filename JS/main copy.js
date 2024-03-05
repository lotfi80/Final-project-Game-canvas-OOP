/// this level work with 1 level only / another level has been not added yet. 

import Player from "./classen/player.js";
import Ball from "./classen/ball.js";
import Obstacles from "./classen/obstacles.js";





const canvas = document.getElementById("canvas-2d");
canvas.width = 700;
canvas.height = 700;
const ctx = canvas.getContext("2d");




const playerPositionX = 350;
const playerPositionY = 650;
let playerSpeed = 10;
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
let isStarted = false ;
let yesButtonReplay;
let noButtonReplay;

let yesButtonGameOver;
let noButtonGameOver;
/// obstacles instance öffnet neu object und in der obstaclesInstance.getObstacles() schickt es zurück in Array
let obstaclesInstance= new Obstacles()
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
  
    
};



function noButtonClickHandler (){
  alert('Thank you for playing!');
}

function initializeGameVariables() {
  player = new Player(playerPositionX, playerPositionY, playerWidth, playerHeight, playerSpeed);
  ball = new Ball(
    player.x,
    player.y - ballRadius,
    ballSpeedX,
    ballSpeedY,
    ballRadius,
    0
  );
  // function erstellt um zu lösen das problem mit dem Hindernissee farnbe ( Grün ) bei starten des Spiel 

  /*  nouvelle instance d'obstacles : objet */
   obstaclesInstance= new Obstacles()

 obstacles = obstaclesInstance.getObstacles(); //  return array of obstacles 
//  console.log('last clg',obstacles)
//  console.log('last 2',obstacles)

}



function resetGame() {
  //   alle Spielvariablen auf ihre Anfangswerte zurück setzen
  initializeGameVariables();

  // obstacles.forEach((obstacle) => {
  //   obstacle.color = "green";
  // });

  //   die Zustandsvariablen zurück auf False
  isStarted=false;
  isGameover = false;
  isWinning = false;

  // Entfernen  der Event-Handler, um mehrfache Hinzufügungen zu vermeiden . bezüglich space button
  // yesButtonGameOver.removeEventListener('click', resetGame);
  // noButtonGameOver.removeEventListener('click', function () {
  //   alert('Thank you for playing!');
  // });

// function ertellt pour differen entrer les deux  conditions
if (yesButtonReplay){
  yesButtonReplay.style.display = 'none';
  noButtonReplay.style.display = 'none';
}
if (yesButtonGameOver){
   yesButtonGameOver.style.display = 'none';
  noButtonGameOver.style.display = 'none';
 
}
 
  

  // Starten Sie das Spiel erneut
  // gameLoop();
  ///  um zu löschen eventlkistener , vorher bei scape drücken wurde die geschwimdichkeit der ball erhöht 

  if (yesButtonReplay){
    yesButtonReplay.removeEventListener('click', resetGame);
    noButtonReplay.removeEventListener('click', noButtonClickHandler);
  }
  if (yesButtonGameOver){
    yesButtonGameOver.removeEventListener('click', resetGame);
  noButtonGameOver.removeEventListener('click', noButtonClickHandler);
   
  }


  
  
}

function gameLoop() {
  // pour resoudre le pbm avec boutton espace qui accelere la vitesse de ball 
  isStarted=true;
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
      const messageY = 100;
      const buttonY = messageY + 200; 
      ctx.fillText(
        `Congratulations! You win! Do you want to play again?`,
        canvas.width / 2,
        messageY
      );
      
      setupReplayButtons(buttonY)
      
    }

    // Überprüfen, ob das Spiel vorbei ist
    if (ball.rounds >= maxRounds) {
      isGameover = true;
      ctx.font = "25px Helvetica";
      ctx.textAlign = "center";
      ctx.fillStyle = "red";
      const messageY = 100;
      const buttonY = messageY + 200 ;  
      ctx.fillText(`Game over, Do you want to play again`, canvas.width / 2, messageY);

      //  Event-Handler-Funktionen außerhalb der gameLoop-Funktion aufrufen
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
function setupReplayButtons(buttonY) {
  yesButtonReplay = document.getElementById('yes-win');
  noButtonReplay = document.getElementById('no-win');

  yesButtonReplay.style.display = 'block';
  noButtonReplay.style.display = 'block';
  yesButtonReplay.style.top = `${buttonY}px`;
  noButtonReplay.style.top = `${buttonY}px`;

  yesButtonReplay.addEventListener('click', resetGame);

  noButtonReplay.addEventListener('click', noButtonClickHandler   );
}
  


document.addEventListener("keydown", function (e) {
  console.log(e.code)
  switch (e.code) {
    

    case "ArrowLeft":
      player.movePlayer("left", canvas);
      break;
    case "ArrowRight":
      player.movePlayer("right", canvas);
      break;
      
    case "Space":
      if ( !isStarted){
        gameLoop(); // Spiel zurücksetzen, wenn die Taste 'R' gedrückt wird
      break;
      }
      
   
  }
});



// Initialisiere das Spiel
// initializeGameVariables();
// gameLoop();