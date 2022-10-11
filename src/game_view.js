const Game = require("./game.js");
const Trash = require("./trash.js");

function GameView(ctx) {
        this.game = new Game();
        this.dummyTrash = new Trash()
        this.drawingContext = ctx;
        this.controller = {
            '38': {pressed: false, func:(receiver)=> {if (receiver.game.player.pos[1] > 0) receiver.game.player.pos[1] -=3}},
            '40': {pressed: false, func:(receiver)=> {if (receiver.game.player.pos[1] < 485) receiver.game.player.pos[1] += 3}},
            '37': {pressed: false, func:(receiver)=> {if (receiver.game.player.pos[0] > 0) receiver.game.player.pos[0] -= 3}},
            '39': {pressed: false, func:(receiver)=> {if (receiver.game.player.pos[0] < 485) receiver.game.player.pos[0] += 3}},
            // '16': {pressed: false, func:(receiver)=> receiver.game.remainingTrash.forEach(ele=>ele.move(receiver.game.player))}
            '16': {pressed: false, func:(receiver)=> {
                let reachableTrash = receiver.game.player.isCollideWithTrash(receiver.game.remainingTrash);
                if (reachableTrash) reachableTrash.move(receiver.game.player)}}
                // receiver.game.player.isCollideWithTrash(receiver.game.remainingTrash)).move(receiver.game.player)}
    }
}
    


GameView.prototype.start = function() {
    this.game = new Game()
    // clearInterval();
    document.getElementById("game-canvas").classList.remove('hidden');
    document.getElementById("ready-to-play").classList.add('hidden');
   
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
            this.game.remainingTrash.forEach(ele=>{ele.isCollideWithPlayer(this.game.player.pos)}); //should check continuously to see if each piece of trash is colliding with the player, updating its grabbable attribute accordingly
            this.game.remainingTrash.forEach(ele=>{ele.isCollideWithTrashBin(this.game.binsArray)})
            this.game.updateRemainingTrash();
            this.game.draw(this.drawingContext);
            this.endscreen();
        }, 10);
    
}

GameView.prototype.executeMoves = function() {
    
    Object.keys(this.controller).forEach(key=> {
      this.controller[key].pressed && this.controller[key].func(this)
    })
  }

GameView.prototype.endscreen = function() {
    if (this.game.gameover()) {
        
        document.getElementById("game-canvas").classList.add('hidden');
        document.getElementById("main-title").classList.add('hidden');
        document.getElementById("end-stats").classList.remove('hidden');
        document.getElementById("play-again").classList.remove('hidden');
        document.getElementById("back-to-practice").classList.remove('hidden');
        clearInterval();
    }
}

GameView.prototype.replay = function() {
    document.getElementById("end-stats").classList.add('hidden');
    document.getElementById("play-again").classList.add('hidden');
    document.getElementById("back-to-practice").classList.add('hidden');
    document.getElementById("main-title").classList.remove('hidden');
}

GameView.prototype.reset = function() {
    document.getElementById("main-title").classList.remove('hidden');
    document.getElementById("end-stats").classList.add('hidden');
    document.getElementById("play-again").classList.add('hidden');
    document.getElementById("back-to-practice").classList.add('hidden');
    document.getElementById("ready-to-play").classList.remove('hidden');

}

 


module.exports = GameView