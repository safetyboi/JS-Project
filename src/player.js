function Player(pos) {
    this.pos = pos;
    this.color = "#4E5CE6"
}

Player.prototype.draw = function(ctx) {
    ctx.beginPath()
    ctx.rect(this.pos[0], this.pos[1], 15, 15); 
    ctx.fillStyle = this.color;
    ctx.fill()
}

module.exports = Player