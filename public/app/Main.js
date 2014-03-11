var global = (function () { 
  var Interact = require('./Interact');

  var interact;

  var GAME_UPDATE_INTERVAL = 33;
  
  (function () {
    interact = Interact(); 

    interact.startMoodLoop();
    interact.startInteractionLoop();

    window.setInterval(gameLoop, GAME_UPDATE_INTERVAL);
  }());

  function gameLoop() {

  }

  return {
    interact: interact
  };

}());
