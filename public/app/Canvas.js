var Canvas = function() {

  var width,
      height;

  (function() {
    width = document.documentElement.clientWidth,
    height = document.documentElement.clientHeight;
  }());
  
  function create(id) {
    var canvas = document.createElement('canvas'),
        context = canvas.getContext('2d');

    canvas.width = width;
    canvas.height = height;
    canvas.id = id;

    document.body.insertBefore(canvas, document.body.childNodes[0]);

    return {
      id: id,
      ctx: context,
      canvas: canvas,
      width: width,
      height: height
    }
  }

  return {
    create: create
  };

};

module.exports = Canvas;
