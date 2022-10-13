const Player = require("./player.js");
const Trash = require("./trash.js")
const CompostBin = require("./compost_bin.js")
const RecyclingBin = require("./recycling_bin.js")
const LandfillBin = require("./landfill_bin.js")
const CautionBin = require("./caution_bin.js")

function Game() {
    // this.allPossibleTrash = allPossibleTrash
    this.remainingTrash = [] //some way to keep track of how much trash is still on the board. 'Gameover?' will read this array/int 
    this.create()
    this.player = new Player(this.randomPosition()) //I don't necessarily think the player's position should be randomized for this game
    this.compostBin = new CompostBin(this.randomPosition())
    this.recyclingBin = new RecyclingBin(this.randomPosition())
    this.landfillBin = new LandfillBin(this.randomPosition())
    this.cautionBin = new CautionBin(this.randomPosition())
    this.binsArray = [this.compostBin, this.recyclingBin, this.landfillBin, this.cautionBin]
}

Game.DIM_X = 500;
Game.DIM_Y = 500;
Game.NUM_TRASH = 10;
Game.SPAWN_X = 450;
Game.SPAWN_Y = 450;

const allPossibleTrash = [
  {name: "Cling Wrap", type: "landfillBin", look: "images/clingwrap.png"},
  {name: "Styrofoam", type: "landfillBin", look: "images/styrofoam.png"},
  {name: "Shiny Food Wrapper", type: "landfillBin", look: "images/shiny-food-wrapper.png"},
  {name: "Meat Scrap", type: "landfillBin", look: "images/meat-scrap.png"},
  {name: "Broken Glass", type: "landfillBin", look: "images/broken-glass.png"},
  // {name: "diaper", type: "landfillBin", look: ".images/diaper.png"},
  {name: "Teabag", type: "compostBin", look: "images/teabag.png"},
  // {name: "hairAndfur", type: "compostBin", look: ".images/clingwrap.png"},
  {name: "Fireplace Ashes", type: "compostBin", look: "images/ashes.png"},
  {name: "CoffeeGrounds/Filters", type: "compostBin", look: "images/coffee-filter.png"},
  {name: "Soiled Paper/Cardboard", type: "compostBin", look: "images/soiled-cardboard.png"},
  // {name: "shreddedPaperAndCardboard", type: "compostBin", look: ".images/clingwrap.png"},
  {name: "Batteries", type: "cautionBin", look: "images/battery.png"},
  {name: "Sharps", type: "cautionBin", look: "images/needle.png"},
  {name: "LightBulbs", type: "cautionBin", look: "images/lightbulb.png"},
  {name: "Compressed Gas", type: "cautionBin", look: "images/compressed-gas.png"},
  {name: "Electronics", type: "cautionBin", look: "images/used-electronics.png"},
  {name: "Medicine", type: "cautionBin", look: "images/pills.png"},
  {name: "Paint", type: "cautionBin", look: "images/paint-can.png"},
  {name: "Plastic Bottles", type: "recyclingBin", look: "images/plastic-bottle.png"},
  {name: "Metal Containers", type: "recyclingBin", look: "images/empty-can.png"},
  {name: "Unbroken Glass", type: "recyclingBin", look: "images/empty-glass-bottle.png"},
  {name: "Cardboard", type: "recyclingBin", look: "images/cardboard-box.png"},
  {name: "Paper", type: "recyclingBin", look: "images/papers.png"}
]


Game.prototype.create = function(){
  while (this.remainingTrash.length < Game.NUM_TRASH){ 
    this.addTrash();
  }
}

Game.prototype.addTrash = function(){
  let trash = new Trash(this.randomPosition(), this.randomObj()) //this should take a second arg, 'this.randomObj'
  this.remainingTrash.push(trash);
}

Game.prototype.randomPosition = function(){
  let x = Math.floor(Math.random() * (Game.SPAWN_X + 5));
  let y = Math.floor(Math.random() * (Game.SPAWN_Y + 5));
  return [x,y]
}

Game.prototype.randomObj = function(){
  // let that = this;
  // debugger
  let uniqueTrash = allPossibleTrash[Math.floor(Math.random() * allPossibleTrash.length)];
  if (this.remainingTrash.length !== 0) {
    // console.log(this.remainingTrash);
    let alreadyIncluded = this.remainingTrash.some(object=>{
      return Object.values(object.obj).includes(uniqueTrash.name)
  })
    if (alreadyIncluded) {
      return this.randomObj()
    } else {
      return uniqueTrash
    }
  } else {
      return uniqueTrash
  }
      
  }
  // if (!this.remainingTrash.includes(uniqueTrash.name)) { //will this work for object identity?
  // return uniqueTrash
  
  // } else {
  //   this.randomObj()
  // }
  // return uniqueTrash;


Game.prototype.updateRemainingTrash = function() {
    // debugger
    //has access to binsArray
    //has access to remainingTrash
    //should therefore be able to check every piece of trash, and manipulate bin.contents and remainingTrash accordingly
    let that = this;
    that.binsArray.forEach(bin=> { //for every bin
        for(let i = 0; i < that.remainingTrash.length; i++){
            let trash = that.remainingTrash[i];
            if (bin.isCollideWithTrash(trash) && !trash.grabbable && trash.throwawayable) {
                const copy = structuredClone(trash); //create a copy of the trash
                bin.eatTrash(copy); //update the bin's .contents array to hold the copy
                that.remainingTrash.splice(i, 1) //remove the original from the remainingTrash array, so that it no longer renders in the game.draw method
              }
        }
    })
  
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


Game.prototype.gameover = function() {
    return (this.remainingTrash.length === 0 ? true : false)
}

module.exports = Game