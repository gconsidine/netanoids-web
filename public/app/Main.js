(function () { 
  var Interact = require('./Interact');

  var _interact;

  var GAME_UPDATE_INTERVAL = 33;
  
  (function () {
    _interact = Interact(); 

    _interact.mood.update();
    _interact.update();

    window.setInterval(gameLoop, GAME_UPDATE_INTERVAL);
  }());

  function gameLoop() {

  }

}());