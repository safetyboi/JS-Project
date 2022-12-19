const Game = require("./game.js");
const Trash = require("./trash.js");

function GameView(ctx) {
        this.game = new Game();
        this.intervalID = undefined;
        this.theme = new Audio('music/OHMA.wav');
        this.dummyTrash = new Trash()
        this.drawingContext = ctx;
        this.magnifiedImg = document.getElementById('search-box-image')
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

      this.theme.play();
      this.theme.loop =true;
    
    
    // clearInterval();
    // document.getElementById('game-screen').setAttribute('display','flex');
    document.getElementById("how-to-play").classList.add('hidden');
    document.getElementById('instructions').classList.add('hidden');
    document.getElementById("game-canvas").classList.remove('hidden');
    document.getElementById("game-screen").classList.remove('hidden');
    // document.getElementById("ready-to-play").classList.add('hidden');
    document.getElementById("ready-to-play").classList.add('hidden');
    document.getElementById("learning-area").classList.add('hidden');
    document.getElementById("learning-area").style.display = 'none';
    document.getElementById("search-box").style.display = 'flex';
   
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

    this.intervalID = setInterval(()=> {
            this.executeMoves();
            this.game.remainingTrash.forEach(ele=>{ele.isCollideWithPlayer(this.game.player.pos)}); //should check continuously to see if each piece of trash is colliding with the player, updating its grabbable attribute accordingly
            this.game.remainingTrash.forEach(ele=>{ele.isCollideWithTrashBin(this.game.binsArray)})
            this.magnify();
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

GameView.prototype.magnify = function() {
  for(let i = 0; i < this.game.remainingTrash.length; i++) {
    let trash = this.game.remainingTrash[i]
    if (trash.grabbable){
      this.magnifiedImg.src = trash.obj.look;
      return //is this the proper way to exit a loop, or will it still hit the other condition at the bottom
    }
  }
  this.magnifiedImg.src = "images/magnifying-glass.png"
}


GameView.prototype.instructions = function() {
  document.getElementById('how-to-play').classList.add('hidden');
  document.getElementById('instructions').classList.remove('hidden');
}

GameView.prototype.endscreen = function() {
    if (this.game.gameover()) {
        
        document.getElementById("search-box").style.display = 'none';

        document.getElementById("game-canvas").classList.add('hidden');
        document.getElementById("main-title").classList.add('hidden');
        document.getElementById("end-stats").classList.remove('hidden');
        // document.getElementById("play-again").classList.remove('hidden');
        document.getElementById("back-to-practice").classList.remove('hidden');
        clearInterval(this.intervalID);
        this.displayStats();

    }
}

GameView.prototype.replay = function() {
    document.getElementById("end-stats").classList.add('hidden'); //not working
    // document.getElementById("end-stats").style.display = 'none';
    document.getElementById("play-again").classList.add('hidden');
    document.getElementById("back-to-practice").classList.add('hidden');
    document.getElementById("main-title").classList.remove('hidden');
    // document.getElementById("learning-area").removeAttribute('id','hidden')
}

GameView.prototype.reset = function() {
    document.getElementById('learning-area').style.display = 'flex';
    document.getElementById("main-title").classList.remove('hidden');
    document.getElementById("end-stats").classList.add('hidden');
    // document.getElementById("play-again").classList.add('hidden');
    document.getElementById("back-to-practice").classList.add('hidden');
    document.getElementById("ready-to-play").classList.remove('hidden');
    document.getElementById("how-to-play").classList.remove('hidden');
 
    const compostContents = document.getElementById('compost-bin-contents');
    const recyclingContents = document.getElementById('recycling-bin-contents');
    const landfillContents = document.getElementById('landfill-bin-contents');
    const cautionContents = document.getElementById('caution-bin-contents');
    const allBins = [compostContents, recyclingContents, landfillContents, cautionContents];

    allBins.forEach(bin => {
      if (bin.hasChildNodes()) {
          while (bin.hasChildNodes()) {
            bin.removeChild(bin.firstChild);
          }
      }
    })

}  

GameView.prototype.displayStats = function() {
  this.theme.pause();
  this.theme.currentTime = 0;
  const music = new Audio('music/DrumRoll.wav');
    music.play();

  const compostContents = document.getElementById('compost-bin-contents');
  const recyclingContents = document.getElementById('recycling-bin-contents');
  const landfillContents = document.getElementById('landfill-bin-contents');
  const cautionContents = document.getElementById('caution-bin-contents');
  
  const compost = document.getElementById('compost-bin');
  const recycling = document.getElementById('recycling-bin');
  const landfill = document.getElementById('landfill-bin');
  const caution = document.getElementById('caution-bin');

  compost.classList.remove('hidden');
  recycling.classList.remove('hidden');
  landfill.classList.remove('hidden');
  caution.classList.remove('hidden');

  const allBins = [compostContents, recyclingContents, landfillContents, cautionContents];
    for(let i = 0; i<allBins.length; i++) {
      this.game.binsArray[i].contents.forEach(item=> {
        let li = document.createElement("li")
        li.textContent = item.obj.name;
        if(item.obj.type === binsArray[i].type) {
          li.classList.add('right-choice')
        } else {
          li.classList.add('wrong-choice')
        }
        allBins[i].append(li)
      })
    }
  }

 


module.exports = GameView