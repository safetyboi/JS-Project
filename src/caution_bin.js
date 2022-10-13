const TrashBin = require("./trash_bin.js");
const Util = require("./util.js");

function CautionBin(pos) {
    this.pos = pos;
    this.type = "cautionBin"
    this.color = "#FABA0F"
    this.contents = []
    this.src = "images/new-caution-bin.png"
}

Util.inherits(CautionBin, TrashBin);

module.exports = CautionBin