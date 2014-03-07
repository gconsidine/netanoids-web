(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{"./Interact":3}],2:[function(require,module,exports){
var Content = function() {
  var Mood = require('./Interact');

};

module.exports = Content;

},{"./Interact":3}],3:[function(require,module,exports){
var Interact = function() {

  var Mood = require('./Mood'),
      Request = require('./Request'),
      Canvas = require('./Canvas'),
      Content = require('./Content');

  var mood, 
      request, 
      canvas,
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
    canvas = Canvas();
    content = Content();

    _type = ['text', 'image', 'video'];

    setQuestions();
    setPositiveResponses();
    setNegativeResponses();
    setInterval();
    setType();
  }());

  function setQuestions() {
    var currentMood = Mood.getMood();
    
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
    var currentMood = Mood.getMood(); 

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
    var currentMood = Mood.getMood(); 

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
    window.setTimeout(_interact.update, _interact.getInterval());
  }
  
  return {
    getType: getType,
    getInterval:  getInterval,
    getPositiveResponse: getPositiveResponse,
    getNegativeResponse: getNegativeResponse,
    update: update,
    mood: mood,
    content: content,
    canvas: canvas,
    request: request
  };

};

module.exports = Interact;

},{"./Canvas":1,"./Content":2,"./Mood":5,"./Request":6}],4:[function(require,module,exports){
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

},{"./Interact":3}],5:[function(require,module,exports){
var Mood = function() {
  
  var _mood = [],
      _interval = 0;

  (function () {
    _mood = ['playful', 'depressed', 'zonked'];
    setInterval();
    setMood();
  }());

  function setInterval() {
    _interval = Math.floor(Math.random() * ((1000 * 60 * 60) + 1000));
  }

  function setMood() {
    var index = Math.floor(Math.random() * 2); 
    _mood = _mood[index]; 
  }

  function getMood() {
    return _mood[index];
  }

  function getInterval() {
    return _interval;
  }
  
  function update() {
    setInterval();
    setMood();
    window.setTimeout(_mood.update, _mood.getInterval());
  }
  
  return {
    getMood : getMood,
    getInterval : getInterval,
    update : update
  };

};

module.exports = Mood;

},{}],6:[function(require,module,exports){
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

},{}]},{},[1,2,3,4,5,6])