const Player = require("./player.js");
const Trash = require("./trash.js")
const CompostBin = require("./compost_bin.js")
const RecyclingBin = require("./recycling_bin.js")
const LandfillBin = require("./landfill_bin.js")
const CautionBin = require("./caution_bin.js")

function Game() {
    this.remainingTrash = [] //some way to keep track of how much trash is still on the board. 'Gameover?' will read this array/int 
    this.create()
    this.player = new Player(this.randomPosition()) //I don't necessarily think the player's position should be randomized for this game
    this.compostBin = new CompostBin(this.randomPosition())
    this.recyclingBin = new RecyclingBin(this.randomPosition())
    this.landfillBin = new LandfillBin(this.randomPosition())
    this.cautionBin = new CautionBin(this.randomPosition())
}

Game.DIM_X = 500;
Game.DIM_Y = 500;
Game.NUM_TRASH = 10;


Game.prototype.create = function(){
  while (this.remainingTrash.length < Game.NUM_TRASH){
    this.addTrash();
  }
}

Game.prototype.addTrash = function(){
  let trash = new Trash(this.randomPosition())
  this.remainingTrash.push(trash);
}

Game.prototype.randomPosition = function(){
  let x = Math.floor(Math.random() * (Game.DIM_X + 5));
  let y = Math.floor(Math.random() * (Game.DIM_Y + 5));
  return [x,y]
}


Game.prototype.draw = function(ctx){
     ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    this.player.draw(ctx);
    this.cautionBin.draw(ctx);
    this.compostBin.draw(ctx);
    this.landfillBin.draw(ctx);
    this.recyclingBin.draw(ctx);
    
   
    this.remainingTrash.forEach((el) =>{
      el.draw(ctx);
    });
    // ctx.fillRect(0, 0, Game.DIM_X, Game.Dim_Y);
  }

Game.prototype.gameOver = function() {
    return (this.remainingTrash.length === 0 ? true : false)
}

module.exports = Game