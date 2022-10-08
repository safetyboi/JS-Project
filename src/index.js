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
    gameview.start();
})