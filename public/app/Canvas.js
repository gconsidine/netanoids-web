var Canvas = function() {
  var Mood = require('./Interact');

  var _width = document.documentElement.clientWidth,
      _height = document.documentElement.clientHeight;
  
  function create(id) {
    var canvas = document.createElement('canvas'),
        context = canvas.getContext('2d');

    canvas.width = _width;
    canvas.height = _height;
    canvas.id = id;

    document.body.insertBefore(canvas, document.body.childNodes[0]);

    return {
      'id' : id,
      'ctx' : context,
      'canvas' : canvas
    }
  }

  return {
    create: create
  };

};

module.exports = Canvas;
