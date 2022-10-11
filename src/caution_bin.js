const TrashBin = require("./trash_bin.js");
const Util = require("./util.js");

function CautionBin(pos) {
    this.pos = pos;
    this.color = "#FABA0F"
    this.contents = []
    this.src = "../src/images/park_illustration_fixed.jpeg"
}

Util.inherits(CautionBin, TrashBin);

module.exports = CautionBin