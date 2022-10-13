const TrashBin = require("./trash_bin.js");
const Util = require("./util.js");

function RecyclingBin(pos) {
    this.pos = pos;
    this.type ="recyclingBin"
    this.color = "#1053FA"
    this.contents = []
    this.src = "./src/images/recycling-bin.png"
}

Util.inherits(RecyclingBin, TrashBin);

module.exports = RecyclingBin