// export default class Obstacles{

//     // constructor (obstacles) {
//     //     this.obstacles=obstacles
//     // }
//     // Initialisieren  das Spiel beim Laden der Seite
//     obstacles = [
//       { x: 100, y: 300, width: 50, height: 50, color: "green" },
//       { x: 300, y: 300, width: 50, height: 50, color: "green" },
//       { x: 500, y: 300, width: 50, height: 50, color: "green" },
//     ];
    
//     drawOneObstacle(x1, y1, w, h, color,ctx) {
//       ctx.fillStyle = color;
//       ctx.fillRect(x1, y1, w, h);
    
//       ctx.strokeStyle = "white";
//       // drawLine(x1, y1, x1 + w, y1);
//       // drawLine(x1, y1, x1, y1 + h);
//       // drawLine(x1 + w, y1, x1 + w, y1 + h);
//       // drawLine(x1, y1 + h, x1 + w, y1 + h);
//     }
//     getObstacles(){
//       return this.obstacles
//     }
    
    
//      drawObstacles(ctx) {
//       this.obstacles.forEach((obstacle) => {
//         this.drawOneObstacle(
//           obstacle.x,
//           obstacle.y,
//           obstacle.width,
//           obstacle.height,
//           obstacle.color,
//           ctx,
//         );
//       });
//     }
    
//     }



export default class Obstacles{

  // constructor (obstacles) {
  //     this.obstacles=obstacles
  // }
 
  obstacles = [
    { x: 100, y: 300, width: 50, height: 50, color: "green" },
    { x: 300, y: 300, width: 50, height: 50, color: "green" },
    { x: 500, y: 300, width: 50, height: 50, color: "green" },
  ];
  
getNextObstacle(){
  this.obstacles= [...this.obstacles, { x: 300, y: 150, width: 50, height: 50, color: "green" }]
  return this.obstacles;

}
  
  drawOneObstacle(x1, y1, w, h, color,ctx) {
    ctx.fillStyle = color;
    ctx.fillRect(x1, y1, w, h);
  
    ctx.strokeStyle = "white";
    // drawLine(x1, y1, x1 + w, y1);
    // drawLine(x1, y1, x1, y1 + h);
    // drawLine(x1 + w, y1, x1 + w, y1 + h);
    // drawLine(x1, y1 + h, x1 + w, y1 + h);
  }
  getObstacles(){
    return this.obstacles
  }
  
  
   drawObstacles(ctx,level) {
    const obs = level>1 ? [...this.obstacles, { x: 300, y: 150, width: 50, height: 50, color: "green" }] :this.obstacles;
    this.obstacles.forEach((obstacle) => {
      this.drawOneObstacle(
        obstacle.x,
        obstacle.y,
        obstacle.width,
        obstacle.height,
        obstacle.color,
        ctx,
      );
    });
  }
  
  }