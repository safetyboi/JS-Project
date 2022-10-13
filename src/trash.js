function Trash(pos,obj) {
    this.pos = pos;
    this.obj = obj;
    this.isCurrentlyHeld = false;
    // this.trashType = obj.trashType; eventually, we will want the Trash constructor to be able to accept an object with a 'Trashtype' property
    this.color = "#FF7B88";
    // this.isCurrentlyHeld = false;
    this.grabbable = false; //flip to true when isCollideWithPlayer is true. flip back to false when isCollideWithPlayer is false. 
    this.throwawayable = false; //eventually, we will flip this switch
    //psuedo-code: if (grabber-button-down && hitboxes-overlapping) this.grabbed = true
    //psuedo-code: if (this.grabbed) this.pos === player.pos+/-)
}

// Trash.prototype.draw = function(ctx) {
//     ctx.beginPath()
//     ctx.rect(this.pos[0], this.pos[1], 15, 15); 
//     ctx.fillStyle = this.color;
//     ctx.fill()
// }

Trash.prototype.draw = function(ctx) {
    const img = new Image();
    // img.src = "../src/images/clingwrap.png"
    img.src = this.obj.look;
    ctx.drawImage(img, this.pos[0], this.pos[1],30,30);
    if (this.grabbable) {
        ctx.beginPath();
        if (this.throwawayable) {
            ctx.strokeStyle = "#53FFF8"
        } else {
            ctx.strokeStyle = "#FF7B88"
        }
        ctx.lineWidth = 3
        // ctx.arc(this.pos[0] + 7.5, this.pos[1] + 7.5, 10, 0, 2*Math.PI);
        ctx.rect(this.pos[0] - 15, this.pos[1] - 15, 60, 60)
        ctx.stroke();
    }  
}

//maybe we're running it on a setInterval so that it's always checking?
Trash.prototype.isCollideWithPlayer = function(playerPos) { //this makes sense right? The trash wouldn't necessarily know the player's position, but it knows it's own position
    if ((playerPos[0] < this.pos[0]+22) && (playerPos[0]+22 > this.pos[0]) && (playerPos[1] < this.pos[1]+22) && (playerPos[1]+22 > this.pos[1])) {
        this.grabbable = true
    } else {
        this.grabbable = false
    }

    // if we run this on a setInterval, it should constantly update the this.grabbable attribute
    // maybe we're iterating through the array of remainingTrash on every set Interval so that we're hitting every piece of trash
}


// Trash.prototype.move = function(player) {
//     //this method will check if the trash's grabbable attribute is 'true'
//     //then set the trash's position equal to some offset of the player's position
//     if (this.grabbable) this.pos = [player.pos[0]+5, player.pos[1]+5];
    
// }

Trash.prototype.move = function(player) {
    this.pos = [player.pos[0]+5, player.pos[1]+5];
}

Trash.prototype.isCollideWithTrashBin = function(bins) {
    if (bins.some(bin=>{return((this.pos[0] < bin.pos[0]+30) && (this.pos[0]+15 > bin.pos[0]) && (this.pos[1] < bin.pos[1]+30) && (this.pos[1]+15 > bin.pos[1]))})) {
        this.throwawayable = true
    } else {
        this.throwawayable = false
    }
}

Trash.prototype.throwaway = function(bin) {

}









module.exports = Trash