// const KeyMaster = require("./keymaster.js")
const Trash = require("./trash.js");
const Game = require("./game.js");
const GameView = require("./game_view.js");



window.addEventListener('DOMContentLoaded', function(){ //this should be a custom event for clicking the "Ready to Play" button
    
    const canvas = document.getElementById("game-canvas");
    canvas.width = Game.DIM_X;
    canvas.height = Game.DIM_Y;
    const canvasContext = canvas.getContext("2d");
    const gameview = new GameView(canvasContext);
    const howToPlayButton = document.getElementById("how-to-play")
    howToPlayButton.addEventListener('click', gameview.instructions.bind(gameview))
    const closeHowToPlay = document.getElementById("close-instructions")
    closeHowToPlay.addEventListener('click', gameview.closeInstructions.bind(gameview))
    const learningAreaModal = document.querySelectorAll(".learning-container")
    learningAreaModal.forEach(container => {
        container.addEventListener('click', gameview.showModal.bind(gameview, container.id))
    })
    // learningAreaModal.addEventListener('click', gameview.showModal.bind(gameview))
    const readyToPlayButton = document.getElementById("ready-to-play")
    readyToPlayButton.addEventListener('click', gameview.start.bind(gameview))
    const backToPracticeButton = document.getElementById("back-to-practice")
    backToPracticeButton.addEventListener('click', gameview.reset.bind(gameview))
    const muteButton = document.querySelector('.mute-button');
    muteButton.addEventListener('click', gameview.mute.bind(gameview));
    
    
    // const playAgainButton = document.getElementById("play-again")
    // playAgainButton.addEventListener('click', function() {
    //     gameview.replay.call(gameview);
    //     gameview.start.call(gameview);
    // })
    window.remainingTrash = gameview.game.remainingTrash;
    window.playerPos = gameview.game.player.pos;
    window.binsArray = gameview.game.binsArray;
    window.gameover = gameview.game.gameover;
    window.randomObj = gameview.game.randomObj;
})