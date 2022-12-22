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
    this.allPossibleTrash = allPossibleTrash
}

Game.DIM_X = 500;
Game.DIM_Y = 500;
Game.NUM_TRASH = 10;
Game.SPAWN_X = 450;
Game.SPAWN_Y = 450;

const allPossibleTrash = [
  {name: "Cling Wrap", cssId: "cling-wrap", type: "landfillBin", look: "images/clingwrap.png", binLook: "images/new-landfill-bin.png", blurb: "Cling-wrap goes in the landfill bin."},
  {name: "Styrofoam", cssId: "styrofoam", type: "landfillBin", look: "images/styrofoam.png", binLook: "images/new-landfill-bin.png", blurb: "Styrofoam goes in the landfill bin."},
  {name: "Shiny Food Wrapper", cssId: "shiny-food-wrapper", type: "landfillBin", look: "images/shiny-food-wrapper.png", binLook: "images/new-landfill-bin.png", blurb: "Shiny food wrappers go in the landfill bin."},
  {name: "Meat Scrap", cssId: "meat-scrap", type: "landfillBin", look: "images/meat-scrap.png", binLook: "images/new-landfill-bin.png", blurb: "Meat-scraps go in the landfill bin."},
  {name: "Broken Glass", cssId: "broken-glass", type: "landfillBin", look: "images/broken-glass.png", binLook: "images/new-landfill-bin.png", blurb: "Broken glass goes in the landfill bin."},
  // {name: "diaper", type: "landfillBin", look: ".images/diaper.png"},
  {name: "Teabag", cssId: "teabag", type: "compostBin", look: "images/teabag.png", binLook: "images/new-compost-bin.png", blurb: "Teabags can go in the compost bin!"},
  // {name: "hairAndfur", type: "compostBin", look: ".images/clingwrap.png"},
  {name: "Fireplace Ashes", cssId: "fireplace-ashes", type: "compostBin", look: "images/ashes.png", binLook: "images/new-compost-bin.png", blurb: "Fireplace ashes can go in the compost bin!"},
  {name: "CoffeeGrounds/Filters", cssId: "coffeeground-filters", type: "compostBin", look: "images/coffee-filter.png", binLook: "images/new-compost-bin.png", blurb: "Coffee grounds and filters can go in the compost bin!"},
  {name: "Soiled Paper/Cardboard", cssId: "soiled-paper-cardboard", type: "compostBin", look: "images/soiled-cardboard.png", binLook: "images/new-compost-bin.png", blurb: "Soiled paper and cardboard can go in the compost bin!"},
  // {name: "shreddedPaperAndCardboard", type: "compostBin", look: ".images/clingwrap.png"},
  {name: "Batteries", cssId: "batteries", type: "cautionBin", look: "images/battery.png", binLook: "images/new-caution-bin.png", blurb: "Caution! Batteries must be taken to an approved drop-off site!"},
  {name: "Sharps", cssId: "sharps", type: "cautionBin", look: "images/needle.png", binLook: "images/new-caution-bin.png", blurb: "Caution! Needles, syringes, and other 'sharps' must be taken to an approved drop-off site!"},
  {name: "LightBulbs", cssId: "lightbulbs", type: "cautionBin", look: "images/lightbulb.png", binLook: "images/new-caution-bin.png", blurb: "Caution! Lightbulbs must be taken to an approved drop-off site!"},
  {name: "Compressed Gas", cssId: "compressed-gas", type: "cautionBin", look: "images/compressed-gas.png", binLook: "images/new-caution-bin.png", blurb: "Caution! Compressed gas must be taken to an approved drop-off site!"},
  {name: "Electronics", cssId: "electronics", type: "cautionBin", look: "images/used-electronics.png", binLook: "images/new-caution-bin.png", blurb: "Caution! Used electronics must be taken to an approved drop-off site!"},
  {name: "Medicine", cssId: "medicine", type: "cautionBin", look: "images/pills.png", binLook: "images/new-caution-bin.png", blurb: "Caution! Medicine must be taken to an approved drop-off site!"},
  {name: "Paint", cssId: "paint", type: "cautionBin", look: "images/paint-can.png", binLook: "images/new-caution-bin.png", blurb: "Caution! Paint must be taken to an approved drop-off site!"},
  {name: "Plastic Bottles", cssId: "plastic-bottles", type: "recyclingBin", look: "images/plastic-bottle.png", binLook: "images/recycling-bin.png", blurb: "Plastic bottles go in the recycling bin."},
  {name: "Metal Containers", cssId: "metal-containers", type: "recyclingBin", look: "images/empty-can.png", binLook: "images/recycling-bin.png", blurb: "Metal containers go in the recycling bin."},
  {name: "Unbroken Glass", cssId: "unbroken-glass", type: "recyclingBin", look: "images/empty-glass-bottle.png", binLook: "images/recycling-bin.png", blurb: "Glass can go in the recycling bin as long as it's not broken."},
  {name: "Cardboard", cssId: "cardboard", type: "recyclingBin", look: "images/cardboard-box.png", binLook: "images/recycling-bin.png", blurb: "Cardboard can go in the recycling bin, as long as it's not soiled."},
  {name: "Paper", cssId: "paper", type: "recyclingBin", look: "images/papers.png", binLook: "images/recycling-bin.png", blurb: "Paper can go in the recycling bin, as long as it's not soiled."}
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