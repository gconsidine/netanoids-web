(function () { 

  /* Module includes */
  var Request = require('./request'),
      Canvas = require('./canvas');

  var request = Request(),
      canvas = Canvas();
  
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
