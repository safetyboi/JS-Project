const TrashBin = require("./trash_bin.js");
const Util = require("./util.js");

function CompostBin(pos) {
    TrashBin.call(this, pos)
    this.type = "compostBin"
    this.color = "#00614C"
    this.src = "images/new-compost-bin.png"
}

Util.inherits(CompostBin, TrashBin);
module.exports = CompostBin