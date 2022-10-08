const TrashBin = require("./trash_bin.js");
const Util = require("./util.js");

function CompostBin(pos) {
    this.pos = pos;
    this.color = "#00614C"
}

Util.inherits(CompostBin, TrashBin);
module.exports = CompostBin