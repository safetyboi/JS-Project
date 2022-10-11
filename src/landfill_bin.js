const TrashBin = require("./trash_bin.js");
const Util = require("./util.js");

function LandfillBin(pos) {
    this.pos = pos;
    this.color = "#000000"
    this.contents = []
    this.src = "../src/images/park_illustration_fixed.jpeg"
}

Util.inherits(LandfillBin, TrashBin);

module.exports = LandfillBin