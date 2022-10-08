function Trash(pos) {
    this.pos = pos;
    // this.trashType = obj.trashType; eventually, we will want the Trash constructor to be able to accept an object with a 'Trashtype' property
    this.color = "#FF7B88";
    this.grabbed = false; //eventually, we will flip this switch
    //psuedo-code: if (grabber-button-down && hitboxes-overlapping) this.grabbed = true
    //psuedo-code: if (this.grabbed) this.pos === player.pos+/-)
}

Trash.prototype.draw = function(ctx) {
    ctx.beginPath()
    ctx.rect(this.pos[0], this.pos[1], 15, 15); 
    ctx.fillStyle = this.color;
    ctx.fill()

}


Trash.prototype.move = function() {
    //will be needed for when the user grabs the trash and moves around the map with it
}









module.exports = Trash