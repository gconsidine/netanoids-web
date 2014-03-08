var Background = function() {
  var Canvas = require('./Canvas');

  var canvas,
      startX,
      startY,
      hLength,
      vLength;
  
  var _bg;
  
  (function() {
    canvas = Canvas();

    _bg = canvas.create('background');
    
    startX = _bg.width * 0.01;
    startY = _bg.height * 0.1;
    hLength = _bg.width * 0.9;
    vLength = _bg.height * 0.5;
  }());

  function draw() {
    drawProjector(); 
  }

  function drawProjector() {
    var x = startX,
        y = startY,
        depth = _bg.width * 0.01,
        shift = depth * Math.cos(Math.PI / 180);

    _bg.ctx.beginPath();

    // Square
    _bg.ctx.moveTo(x, y);
    _bg.ctx.lineTo(x += hLength, y);
    _bg.ctx.lineTo(x, y += vLength);
    _bg.ctx.lineTo(x -= hLength, y);
    _bg.ctx.lineTo(x, y -= vLength);

    // Square becomes cube
    _bg.ctx.lineTo(x += shift, y -= shift); 
    _bg.ctx.lineTo(x += hLength, y);
    _bg.ctx.lineTo(x -= shift, y += shift);
    _bg.ctx.lineTo(x += shift, y -= shift);
    _bg.ctx.lineTo(x, y += vLength);
    _bg.ctx.lineTo(x -= shift, y += shift);


    // Fill
    _bg.ctx.strokeStyle = 'black';
    _bg.ctx.lineWidth = 3;
    _bg.ctx.stroke();

    _bg.ctx.closePath();
    _bg.ctx.beginPath();
   
    // TV-like inset
    _bg.ctx.moveTo(x -= shift, y -= shift);
    _bg.ctx.lineTo(x, y = (y - vLength) + shift * 2);
    _bg.ctx.lineTo(x = (x - hLength) + shift * 2, y); 
    _bg.ctx.lineTo(x, y = (y + vLength) - shift * 2);
    _bg.ctx.lineTo(x = (x + hLength) - shift * 2, y);
    
    // Fill
    _bg.ctx.strokeStyle = 'black';
    _bg.ctx.lineWidth = 1;
    _bg.ctx.stroke();
  }

  return {
    x: startX,
    y: startY,
    width: hLength,
    height: vLength,
    draw: draw
  };
  
};

module.exports = Background;
