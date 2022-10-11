const TrashBin = require("./trash_bin.js");
const Util = require("./util.js");

function CompostBin(pos) {
    TrashBin.call(this, pos)
    this.color = "#00614C"
    this.src = "../src/images/park_illustration_fixed.jpeg"
}

Util.inherits(CompostBin, TrashBin);
module.exports = CompostBin