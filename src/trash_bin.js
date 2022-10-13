const Util = require("./util.js");

function TrashBin(pos) {
    this.pos = pos;
    // this.type = type
    this.contaminated = false;
    this.contents = []
}

// TrashBin.prototype.draw = function(ctx) {
//     ctx.beginPath()
//     ctx.rect(this.pos[0], this.pos[1], 30, 30); 
//     ctx.fillStyle = this.color;
//     ctx.fill()
// }

TrashBin.prototype.draw = function(ctx) {
    const img = new Image();
    img.src = this.src;
    ctx.drawImage(img, this.pos[0], this.pos[1],60,60);
    
}

//this will get called in a separate function's forEach, for every piece of trash
TrashBin.prototype.isCollideWithTrash = function(trash) {
    return ((this.pos[0]+45 > trash.pos[0]) && (this.pos[0] < trash.pos[0]+15) && (this.pos[1]+45 > trash.pos[1]) && (this.pos[1] < trash.pos[1]+15))
}

TrashBin.prototype.eatTrash = function(trash) {
    this.contents.push(trash);
}

// //might not use this...
// TrashBin.prototype.registerContamination = function() {
//     //if a trash object with a type that does not match the bin's type is released into the bin, the bin's contamination status will quietly change to true. This, in turn, affects the message the player receives at the end of the level. 
// }

module.exports = TrashBin