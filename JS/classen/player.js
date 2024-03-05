
export default class Player  {
    constructor (x,y,w,h,v) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.v = v;
    }
    drawPlayer(ctx) {
        if (ctx){
            ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x + this.w, this.y);
        ctx.strokeStyle = 'white';
        ctx.stroke();
        }
        
    }
    movePlayer(direction, canvas) {
        if (direction === "left" && this.x > 0) {
            this.x -= this.v;
        } else if (direction === "right" && this.x + this.w < canvas.width) {
            this.x += this.v;
        }
    
        // Fügen Sie diese Zeile hinzu, um die aktuelle Position des Spielers zu zeichnen
        this.drawPlayer();
    }
}
