const TrashBin = require("./trash_bin.js");
const Util = require("./util.js");

function LandfillBin(pos) {
    this.pos = pos;
    this.type = "landfillBin"
    this.color = "#000000"
    this.contents = []
    this.src = "../src/images/new-landfill-bin.png"
}

Util.inherits(LandfillBin, TrashBin);

module.exports = LandfillBin