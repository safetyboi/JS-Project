function GameView(ctx) {
        this.game = new Game();
        this.drawingContext = ctx;
    }

GameView.prototype.start = function() {
    // this.game.setObjects();
    setInterval(()=> {
        // this.game.setObjects(); //don't know if I'm going to need this method yet, if the object placement happens elsewhere
        this.game.draw(this.drawingContext);
    }, 20);
}

module.exports = GameView