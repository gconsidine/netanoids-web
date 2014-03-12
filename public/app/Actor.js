var Actor = function() {
  var Canvas = require('./Canvas');

  var ACTOR_HEIGHT = 20,
      BOTTOM_PADDING = 30,
      CLEAR_SIZE = 150,
      RECT_OFFSET = 75;

  var _canvas,
      _startX,
      _startY,
      _colors,
      _bumpLimits,
      _bumpLimit,
      _bumpUp,
      _bump;

  (function() {
    _canvas = Canvas();
    _fg = _canvas.create('actor');
    
    _bumpLimits = {
      playful: 2, 
      depressed: 0, 
      zonked: 5
    };

    _colors = {
      playful: 'purple', 
      depressed: 'darkblue', 
      zonked: 'pink'
    };

    _startX = _fg.width / 2;
    _startY = _fg.height - BOTTOM_PADDING; 
    _bumpUp = false;
    _bump = 0;
  }());
  
  function draw(mood, color) {
    _fg.ctx.clearRect(_startX - RECT_OFFSET, _startY - RECT_OFFSET, CLEAR_SIZE, CLEAR_SIZE);

    _fg.ctx.beginPath();
    _fg.ctx.arc(_startX, _startY - ACTOR_HEIGHT - _bump, ACTOR_HEIGHT, 0, 2 * Math.PI, false);

    _fg.ctx.strokeStyle = color;
    _fg.ctx.fillStyle = color;
    _fg.ctx.lineWidth = 3;
    _fg.ctx.stroke();
    _fg.ctx.fill();

    _fg.ctx.closePath();
  }

  function update(mood) {
    draw(mood);
    _bumpLimit = getBumpLimit(mood);
  }

  function getBumpLimit(mood) {
    return _bumpLimits[mood];  
  }

  function getColorFromMood(mood) {
    return _colors[mood]; 
  }

  function animate(mood) {
    var color = '';

    // Animate up and down
    if(_bumpUp && _bump < _bumpLimit) {
      _bump++;
    } else if(!_bumpUp && _bump > -_bumpLimit) {
      _bump--;
    } else if(!_bumpUp && _bump <= -_bumpLimit) {
      _bumpUp = true;
    } else {
      _bumpUp = false;
    }

    // Psychedelicized
    if(mood === 'zonked') {
      color = getRandomColor();
    } else {
      color = getColorFromMood(mood);
    }

    draw(mood, color);
  }

  function getRandomColor() {
    colorInt = Math.floor(Math.random() * Math.pow(16, 4) * 100);
    colorHex = colorInt.toString(16);

    if(colorHex.length < 6) {
      for(var i = colorHex.length; i < 6; i++) {
        colorHex = '0' + colorHex;
      }
    }
    
    return '#' + colorHex;
  }
  
  return {
    update: update,
    animate: animate
  };
 
};

module.exports = Actor;
