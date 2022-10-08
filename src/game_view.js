const Game = require("./game.js")

function GameView(ctx) {
        this.game = new Game();
        this.drawingContext = ctx;
    }

GameView.prototype.start = function() {
    window.addEventListener('keydown', this.registerKeyPress.bind(this))
    setInterval(()=> {
        this.game.draw(this.drawingContext);
    }, 10);
    // this.bindKeyHandlers() //empty function right now
}

// GameView.prototype.bindKeyHandlers = function() {

// }

GameView.prototype.registerKeyPress = function(e) {
    // if (e.keyCode === '16' (shift) (onKeyDown)
    //  grabber-pincers = closed
        //else grabber-pincers = open
    let that = this;
    // console.log(that)
        if (e.keyCode == '38') {
            // up arrow
            that.game.player.pos[1] -=4
            // console.log(that.game.player)
            
        }
        else if (e.keyCode == '40') {
            // down arrow
            that.game.player.pos[1] += 4
        }
        else if (e.keyCode == '37') {
           // left arrow
           that.game.player.pos[0] -= 4
        }
        else if (e.keyCode == '39') {
           // right arrow
           that.game.player.pos[0] += 4
        }
    
}


module.exports = GameView