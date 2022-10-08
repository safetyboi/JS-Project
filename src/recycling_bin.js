const TrashBin = require("./trash_bin.js");
const Util = require("./util.js");

function RecyclingBin(pos) {
    this.pos = pos;
    this.color = "#1053FA"
}

Util.inherits(RecyclingBin, TrashBin);

module.exports = RecyclingBin