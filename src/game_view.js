const Game = require("./game.js")

function GameView(ctx) {
        this.game = new Game();
        this.drawingContext = ctx;
        this.controller = {
            '38': {pressed: false, func:(receiver)=> receiver.game.player.pos[1] -=3},
            '40': {pressed: false, func:(receiver)=> receiver.game.player.pos[1] += 3},
            '37': {pressed: false, func:(receiver)=> receiver.game.player.pos[0] -= 3},
            '39': {pressed: false, func:(receiver)=> receiver.game.player.pos[0] += 3},
            '16': {pressed: false, func:(receiver)=> receiver.game.remainingTrash.forEach(ele=>ele.move(receiver.game.player.pos))}
    }
}


GameView.prototype.start = function() {
   
    window.addEventListener("keydown", (e) => {
        if(this.controller[e.keyCode]){
          this.controller[e.keyCode].pressed = true
        }
      })
    window.addEventListener("keyup", (e) => {
        if(this.controller[e.keyCode]){
          this.controller[e.keyCode].pressed = false
        }
      })
    setInterval(()=> {
        this.executeMoves();
        this.game.draw(this.drawingContext);
        this.game.remainingTrash.forEach(ele=>{ele.isCollideWithPlayer(this.game.player.pos)}); //should check continuously to see if each piece of trash is colliding with the player, updating its grabbable attribute accordingly
        this.game.remainingTrash.forEach(ele=>{ele.isCollideWithTrashBin(this.game.binsArray)})
    }, 10);

}

GameView.prototype.executeMoves = function() {
    
    Object.keys(this.controller).forEach(key=> {
      this.controller[key].pressed && this.controller[key].func(this)
    })
  }



 


module.exports = GameView