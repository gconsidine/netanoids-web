(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var Actor = function() {
  var Canvas = require('./Canvas');

};

module.exports = Actor;

},{"./Canvas":3}],2:[function(require,module,exports){
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

},{"./Canvas":3}],3:[function(require,module,exports){
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

},{}],4:[function(require,module,exports){
var Content = function() {
  var Mood = require('./Interact');

};

module.exports = Content;

},{"./Interact":5}],5:[function(require,module,exports){
var Interact = function() {

  var Mood = require('./Mood'),
      Request = require('./Request'),
      Content = require('./Content'),
      Background = require('./Background'),
      Actor = require('./Actor');

  var mood, 
      request, 
      content;

  var _questions = [],
      _negativeResponses = [],
      _positiveResponses = [],
      _type = [],
      _interval = 0,
      _response = false,
      _prompted = false;

  (function () {
    mood = Mood();
    request = Request();
    content = Content();
    actor = Actor();
    background = Background();

    _type = ['text', 'image', 'video'];

    setQuestions();
    setPositiveResponses();
    setNegativeResponses();
    setInterval();
    setType();
    background.draw();
  }());

  function setQuestions() {
    var currentMood = mood.getMood();
    
    switch(currentMood){
      case 'playful':
        _questions = {
          text: 'Hiya, want to read something?', 
          image: 'Yo, want to look at a cool picture?', 
          video: 'Ayo.  Want to see a video I like?'
        };
        break;
      case 'depressed':
        _questions = {
          text: 'You probably don\'t but, want to read something I found?', 
          image: 'This picture bums me out... Want to look?', 
          video: 'This video would be good on a rainy day. Want to watch?'
        };

        break;
      case 'zonked':
        _questions = {
          text: 'Text.  I have it.  Do you want it?', 
          image: 'Oh, this picture. WAT.', 
          video: '::dances:: -- Want to see what I see?'
        };
        break;
    }
  }

  function setPositiveResponses() {
    var currentMood = mood.getMood(); 

    switch(currentMood){
      case 'playful':
         _positiveResponses = {
          text: '::squeee:: One sec. I\'ll read it to you', 
          image: 'Yay. Just a sec, let me project it', 
          video: 'Awesome.  I\'ll put it up on the projector'
        };
        break;
      case 'depressed':
        _positiveResponses = {
          text: 'Oh? Ok. I guess I\'ll read it.', 
          image: 'Ok. Don\'t get upset if you don\'t like it.', 
          video: 'Eh. Ok.  I\'ll project it, I guess.'
        };

        break;
      case 'zonked':
        _positiveResponses = {
          text: '::giggles:: Okay, okay.  Let me read. ::clears throat::', 
          image: '::stares off into the distance:: ... Oh! I\'ll turn on the projector!', 
          video: 'Hooray!  I think I can get this to work.  One sec.'
        };
        break;
    }
  }

  function setNegativeResponses() {
    var currentMood = mood.getMood(); 

    switch(currentMood){
      case 'playful':
         _negativeResponses = {
          text: 'Pffffft.  Fine, fine.  No prob.', 
          image: '::shrug:: No biggie.', 
          video: 'That\'s cool.'
        };
        break;
      case 'depressed':
        _negativeResponses = {
          text: '::thousand-yard stare::', 
          image: 'Whatever.', 
          video:'I didn\'t really feel like playing it anyway.'
        };
        break;
      case 'zonked':
        _negativeResponses = {
          text: 'Ok, let me go gra... oh. OH. That\'s fine.', 
          image: '::stares:: Hm? Oh. ::shrug::', 
          video: 'But... But... ::sigh:: Okay.'
        };
        break;
    }   
  }

  function getPositiveResponse() {
    return _positiveResponses[getType()]; 
  }

  function getNegativeResponse() {
     return _negativeResponses[getType()]; 
  }

  function setType() {
    var index = Math.floor(Math.random() * 2); 
    _type = _type[index]; 
  }

  function setInterval() {
    _interval = Math.floor(Math.random() * ((100 * 60 * 60) + 1000));
  }

  function getType() {
    return _type;
  }

  function getInterval() {
    return _interval;
  }
  
  function promptUser() {
  }

  function handleInput() {
  }

  function update() {
    setInterval();
    setType();
    window.setTimeout(update, getInterval());
  }
  
  return {
    getType: getType,
    getInterval:  getInterval,
    getPositiveResponse: getPositiveResponse,
    getNegativeResponse: getNegativeResponse,
    update: update,
    mood: mood,
    content: content,
    backgournd: background,
    actor: actor,
    request: request
  };

};

module.exports = Interact;

},{"./Actor":1,"./Background":2,"./Content":4,"./Mood":7,"./Request":8}],6:[function(require,module,exports){
(function () { 
  var Interact = require('./Interact');

  var _interact;

  var GAME_UPDATE_INTERVAL = 33;
  
  (function () {
    _interact = Interact(); 

    _interact.mood.update();
    _interact.update();

    window.setInterval(gameLoop, GAME_UPDATE_INTERVAL);
  }());

  function gameLoop() {

  }

}());

},{"./Interact":5}],7:[function(require,module,exports){
var Mood = function() {
  
  var _mood,
      _interval;

  (function () {
    _moods = ['playful', 'depressed', 'zonked'];
    setInterval();
    setMood();
  }());

  function setInterval() {
    _interval = Math.floor(Math.random() * ((1000 * 60 * 60) + 1000));
  }

  function setMood() {
    var index = Math.floor(Math.random() * 2); 
    _mood = _moods[index]; 
  }

  function getMood() {
    return _mood;
  }

  function getInterval() {
    return _interval;
  }
  
  function update() {
    setInterval();
    setMood();
    window.setTimeout(update, getInterval());
  }
  
  return {
    getMood : getMood,
    getInterval : getInterval,
    update : update
  };

};

module.exports = Mood;

},{}],8:[function(require,module,exports){
var Request = function() {
  
  var BASE_URL = 'http://api.greg-considine.com/netanoids/0/';

  var get = function(o, callback) {
    var parameters = setParameters(o),
        xmlHttpRequest = new XMLHttpRequest();

    xmlHttpRequest.onreadystatechange = function () {
      if(xmlHttpRequest.readyState == 4 && xmlHttpRequest.status == 200) {
        callback(xmlHttpRequest.responseText);
      }
    }

    xmlHttpRequest.open('GET', BASE_URL + parameters, true);
    xmlHttpRequest.send();
  }
  
  function setParameters(o) {
    return o.mood + '/' + o.type + '/' + o.input; 
  }

  return {
    get : get
  };

};

module.exports = Request;

},{}]},{},[1,2,3,4,5,6,7,8])