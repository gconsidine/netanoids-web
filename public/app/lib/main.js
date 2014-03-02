(function () { 
  var Request = require('./request');
  var request = Request();
  
  function logResponse(response) {
    console.log(response);
  }

  request.post({
    'species': 0,
    'mood': 'playful',
    'type': 'text',
    'input': 'yes'
  }, logResponse);

}());
