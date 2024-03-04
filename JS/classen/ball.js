// function getNextObstacleColor(currentColor) {
//     const obstacleColors = ['green', 'gold','orange','red'];
//     const currentIndex = obstacleColors.indexOf(currentColor);
//     const nextIndex = (currentIndex + 1) % obstacleColors.length;
//     return obstacleColors[nextIndex];
//   }
  
  export default class Ball {
    
    constructor (x,y,dx,dy,r,rounds) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.r = r;
        this.rounds=rounds
  
  
    }
    drawBall(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        ctx.fillStyle = 'gold';
        ctx.fill();
        ctx.stroke();
    }
    handleCollision(prevBallY, obstacle, index) {
        if (
            this.y + this.r > obstacle.y &&
            this.y - this.r < obstacle.y + obstacle.height &&
            this.x + this.r > obstacle.x &&
            this.x - this.r < obstacle.x + obstacle.width
        ) {
            if (prevBallY + this.r <= obstacle.y || prevBallY - this.r >= obstacle.y + obstacle.height) {
                this.dy = -this.dy;
              
            } else {
                this.dx = -this.dx;
            }
             obstacle.color = getNextObstacleColor(obstacle.color);
        }
       
    }
    moveBall(player, obstacles,canvas,rounds) {
        const prevBallX = this.x;
        const prevBallY = this.y;
    
        this.x += this.dx;
        this.y += this.dy;
    
        if (this.x - this.r < 0 || this.x + this.r > canvas.width) {
            this.dx = -this.dx;
        }
    
        if (this.y - this.r < 0) {
            this.dy = -this.dy;
        }
    
        // Kollision mit dem Spieler
        if (
            this.y + this.r > player.y &&
            this.y - this.r < player.y &&
            this.x + this.r > player.x &&
            this.x - this.r < player.x + player.w
        ) {
            this.dy = -this.dy;
        }
        if (obstacles.length){
             obstacles.forEach((obstacle, index) => {
            this.handleCollision(prevBallY, obstacle, index);
        });
        }
       
    
        if (this.y + this.r > canvas.height) {
            this.x = player.x;
            this.y = player.y - this.r;
            this.dy = -3;
            this.rounds++;
             
           
        }
    }
  }
  