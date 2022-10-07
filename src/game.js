function Game() {
    this.remainingTrash = [] //some way to keep track of how much trash is still on the board. 'Gameover?' will read this array/int 
    this.create()
}

Game.DIM_X = 500;
Game.DIM_Y = 500;
Game.NUM_TRASH = 10;

Game.prototype.create = function(){
  while (this.remainingTrash < Game.NUM_TRASH){
    this.addTrash();
  }
}

Game.prototype.addTrash = function(){
  const trash = new Trash(this.randomPosition())
  this.remainingTrash.push(trash);
}

Game.prototype.randomPosition = function(){
  let x = Math.floor(Math.random() * (Game.DIM_X + 1));
  let y = Math.floor(Math.random() * (Game.DIM_Y + 1));
  return [x,y]
}

Game.prototype.draw = function(ctx){
    ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    this.asteroids.forEach((el) =>{
      el.draw(ctx);
    });
    ctx.fillRect(0, 0, Game.DIM_X, Game.Dim_Y);
  }

Game.prototype.gameOver = function() {
    return (this.remainingTrash.length === 0 ? true : false)
}

module.exports = Game