const Util = require("./util.js");

function TrashBin(pos) {
    this.pos = pos;
    // this.type = type
    this.contaminated = false;
}

TrashBin.prototype.draw = function(ctx) {
    ctx.beginPath()
    ctx.rect(this.pos[0], this.pos[1], 30, 30); 
    ctx.fillStyle = this.color;
    ctx.fill()
}

TrashBin.prototype.registerContamination = function() {
    //if a trash object with a type that does not match the bin's type is released into the bin, the bin's contamination status will quietly change to true. This, in turn, affects the message the player receives at the end of the level. 
}

module.exports = TrashBin