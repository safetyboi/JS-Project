function Player(pos) {
    this.pos = pos;
    this.color = "#4E5CE6"
    this.alreadyHoldingTrash = false; //currently not calling this anywhere; might call 
}

Player.prototype.draw = function(ctx) {
    ctx.beginPath()
    ctx.rect(this.pos[0], this.pos[1], 15, 15); 
    ctx.fillStyle = this.color;
    ctx.fill()
}

//could run this as a conditional before the shift-button can do anything
Player.prototype.isCollideWithTrash = function(trashArray) {
    for(let i = 0; i < trashArray.length; i++) {
        let trash = trashArray[i]
        if ((this.pos[0]+22 > trash.pos[0])&&(this.pos[0]<trash.pos[0]+22)&&(this.pos[1]+22>trash.pos[1])&&(this.pos[1]<trash.pos[1]+22)){
            trash.isCurrentlyHeld = true;
            return trash
        }
    }
}



module.exports = Player