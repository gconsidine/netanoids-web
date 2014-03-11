var Actor = function() {
  var Canvas = require('./Canvas');

  var ACTOR_HEIGHT = 20,
      BOTTOM_PADDING = 30;

  var _canvas,
      _startX,
      _startY,
      _colors;

  (function() {
    _canvas = Canvas();
    _fg = _canvas.create('actor');

    _colors = {
      playful: 'green', 
      depressed: 'black', 
      zonked: 'pink'
    };

    _startX = _fg.width / 2;
    _startY = _fg.height - BOTTOM_PADDING; 
  }());
  
  function draw(mood) {
    color = getColorFromMood(mood);

    _fg.ctx.beginPath();
    _fg.ctx.moveTo(_startX, _startY);
    _fg.ctx.arc(_startX, _startY - ACTOR_HEIGHT, ACTOR_HEIGHT, 0, 2 * Math.PI, false);

    _fg.ctx.strokeStyle = color;
    _fg.ctx.fillStyle = color;
    _fg.ctx.lineWidth = 3;
    _fg.ctx.stroke();
    _fg.ctx.fill();

    _fg.ctx.closePath();
  }

  function update(mood) {
    draw(mood);
  }

  function getColorFromMood(mood) {
    return _colors[mood]; 
  }
  
  return {
    update: update
  };
 
};

module.exports = Actor;
