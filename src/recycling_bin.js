const TrashBin = require("./trash_bin.js");
const Util = require("./util.js");

function RecyclingBin(pos) {
    this.pos = pos;
    this.color = "#1053FA"
    this.contents = []
    this.src = "../src/images/park_illustration_fixed.jpeg"
}

Util.inherits(RecyclingBin, TrashBin);

module.exports = RecyclingBin