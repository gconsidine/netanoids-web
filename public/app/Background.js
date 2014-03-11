var Background = function() {
  var Canvas = require('./Canvas');
  
  var CONTENT_PADDING = 9;
  
  var _canvas,
      _startX,
      _startY,
      _hLength,
      _vLength,
      _shift,
      _depth,
      _bg;

  var contentX,
      contentY,
      contentWidth,
      contentHeight;

  (function() {
    _canvas = Canvas();

    _bg = _canvas.create('background');
    
    _startX = _bg.width * 0.01;
    _startY = _bg.height * 0.1;
    _hLength = _bg.width * 0.96;
    _vLength = _bg.height * 0.5;
    _depth = _bg.width * 0.01,
    _shift = _depth * Math.cos(Math.PI / 180);

    contentX = Math.floor(_startX + CONTENT_PADDING + _shift);
    contentY = Math.floor(_startY + CONTENT_PADDING + _shift);
    contentWidth = Math.floor(_hLength - (_shift * 2));
    contentHeight = Math.floor(_vLength - (_shift * 2)); 
  }());

  function update() {
    drawProjector(); 
  }

  function drawProjector() {
    var x = _startX,
        y = _startY;
    
    _bg.ctx.beginPath();

    // Square
    _bg.ctx.moveTo(x, y);
    _bg.ctx.lineTo(x += _hLength, y);
    _bg.ctx.lineTo(x, y += _vLength);
    _bg.ctx.lineTo(x -= _hLength, y);
    _bg.ctx.lineTo(x, y -= _vLength);

    // Square becomes cube
    _bg.ctx.lineTo(x += _shift, y -= _shift); 
    _bg.ctx.lineTo(x += _hLength, y);
    _bg.ctx.lineTo(x -= _shift, y += _shift);
    _bg.ctx.lineTo(x += _shift, y -= _shift);
    _bg.ctx.lineTo(x, y += _vLength);
    _bg.ctx.lineTo(x -= _shift, y += _shift);

    // Fill
    _bg.ctx.strokeStyle = 'black';
    _bg.ctx.lineWidth = 3;
    _bg.ctx.stroke();

    _bg.ctx.closePath();
    _bg.ctx.beginPath();
   
    // TV-like inset
    _bg.ctx.moveTo(x -= _shift, y -= _shift);
    _bg.ctx.lineTo(x, y = (y - _vLength) + _shift * 2);
    _bg.ctx.lineTo(x = (x - _hLength) + _shift * 2, y); 
    _bg.ctx.lineTo(x, y = (y + _vLength) - _shift * 2);
    _bg.ctx.lineTo(x = (x + _hLength) - _shift * 2, y);
    
    // Fill
    _bg.ctx.strokeStyle = 'black';
    _bg.ctx.lineWidth = 1;
    _bg.ctx.stroke();

    _bg.ctx.closePath();
  }

  return {
    x: contentX,
    y: contentY,
    width: contentWidth,
    height: contentHeight,
    update: update
  };
  
};

module.exports = Background;
