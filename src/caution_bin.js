const TrashBin = require("./trash_bin.js");
const Util = require("./util.js");

function CautionBin(pos) {
    this.pos = pos;
    this.color = "#FABA0F"
}

Util.inherits(CautionBin, TrashBin);

module.exports = CautionBin