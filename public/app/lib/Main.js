(function () { 

  /* Module includes */
  var Request = require('./Request'),
      Canvas = require('./Canvas');

  var request = Request(),
      canvas = Canvas();

  var gameLoop = (function () {
    //window.setInterval(sayHi, 1000);
  }());

  function logResponse(response) {
    console.log(response);
  }

  canvas.create('background');
  canvas.create('foreground');

  request.get({
    'mood': 'playful',
    'type': 'text',
    'input': 'yes'
  }, logResponse);

}());
