(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{"./Canvas":3}],2:[function(require,module,exports){
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
    canvas.setAttribute('style', 'position:absolute;');

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
  Background = require('./Background');
  Actor = require('./Actor');
  
  var PROMPT_PADDING = 100,
      PROMPT_TIMEOUT = 1000 * 10; // 10 seconds

  var background,
      actor;
  
  var _promptY,
      _promptX;


  (function() {
    background = Background();  
    actor = Actor();

    _promptY = Math.floor(background.y + background.height + PROMPT_PADDING);
    _promptX = Math.floor(background.width / 2);
  }());

  function displayError() {
    displayResponse('I couldn\'t find it.  I tried.  Seriously.');
  }
 
  function display(response, o) {
    var json,
        div,
        html;
    
    clearContent();

    try {
      json = JSON.parse(response);
      console.log(json);
    } catch(e) {
      displayError();
      return false;
    }

    if(json.status === 'fail') {
      displayError();
      return false;
    }

    if(o.type === 'video') {

      html = '<iframe width="' + background.width + '" height="' + background.height 
           + '" src="http://www.youtube.com/embed/' + json.content + '?autoplay=1"' 
           + 'frameborder="0" allowfullscreen></iframe>';

    } else if(o.type === 'image') {

      html = '<img width="auto" height="' + background.height + '" src="' + decodeURIComponent(json.content) + '" />'

    } else if(o.type === 'text') {

      html = '<p><em>' + json.title + '</em></p><p>' + json.content + '</p>';

    }

    div = document.createElement('div');  
    div.id = 'content';
    div.style.height = background.height + 'px';
    div.style.width = background.width + 'px';
    div.setAttribute('style', 'width: ' + background.width + 'px; height: ' + background.height 
                     + 'px; text-align: center; position: absolute; top:' + background.y 
                     + 'px; left:' + background.x + 'px;');

    div.innerHTML = html;

    document.body.appendChild(div);
  }


  function displayQuestion(question, inputTrue, inputFalse) {
    clearPrompt();

    var div = document.createElement('div'),
        yesButton = document.createElement('button'),
        noButton = document.createElement('button'),
        html = '';

    div.id = 'prompt';
    div.setAttribute('style', 'position: absolute; top:' + _promptY + 'px; left:' + _promptX + 'px;');

    yesButton.onclick = inputTrue;
    yesButton.innerHTML = 'Yes';

    noButton.onclick = inputFalse;
    noButton.innerHTML = 'No';
    
    html = '<p>' + question + '</p>'

    div.innerHTML = html;
    div.appendChild(yesButton);
    div.appendChild(noButton);
    
    document.body.appendChild(div);

    window.setTimeout(clearPrompt, PROMPT_TIMEOUT);
  }

  function displayResponse(response) {
    clearPrompt();

    var div = document.createElement('div'),
        html = '';

    div.id = 'prompt';
    div.setAttribute('style', 'position: absolute; top:' + _promptY + 'px; left:' + _promptX + 'px;');
    
    html = '<p>' + response + '</p>'

    div.innerHTML = html;
    document.body.appendChild(div);

    window.setTimeout(clearPrompt, PROMPT_TIMEOUT);
  }
  
  function clearPrompt() {
    var body = document.body;
    var prompt = document.getElementById('prompt');
    
    if(prompt) {
      body.removeChild(prompt);
    }
  }

  function clearContent() {
    var body = document.body;
    var content = document.getElementById('content');
    
    if(content) {
      body.removeChild(content);
    }
  }

  return {
    display: display,
    displayQuestion: displayQuestion,
    displayResponse: displayResponse,
    clearContent: clearContent,
    clearPrompt: clearPrompt,
    background: background,
    actor: actor
  };

};

module.exports = Content;

},{"./Actor":1,"./Background":2}],5:[function(require,module,exports){
var Interact = function() {

  var Mood = require('./Mood'),
      Request = require('./Request'),
      Content = require('./Content');

  var MIN_TIME = 1000 * 15,       // 15 seconds
      MAX_TIME = 1000 * 60 * 1.5; // 1 minute 30 seconds 

  var _questions,
      _negativeResponses,
      _positiveResponses,
      _types,
      _type,
      _interval,
      _response,
      _prompted;

  var mood, 
      request, 
      content;

  (function () {
    mood = Mood();
    request = Request();
    content = Content();

    _types = ['text', 'image', 'video'];

    setQuestions();
    setPositiveResponses();
    setNegativeResponses();
    setInterval();
    setType();
    
    content.background.update();
    content.actor.update(mood.getMood());
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
          text: 'You probably don\'t, but, want to read something I found?', 
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
  
  function setResponses() {
    setPositiveResponses();
    setNegativeResponses();
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
    var index = Math.floor(Math.random() * 3); 
    _type = _types[index]; 
  }

  function setInterval() {
    _interval = Math.floor(Math.random() * MAX_TIME + MIN_TIME);
  }

  function getType() {
    return _type;
  }

  function getInterval() {
    return _interval;
  }
  
  function startMoodLoop() {
    updateMood();
  }

  function startInteractionLoop() {
    window.setTimeout(updateInteraction, Math.floor(Math.random() * MAX_TIME + MIN_TIME));
  }

  function updateInteraction() {
    setInterval();
    setType();

    console.log('Interaction', getType(), getInterval());

    content.displayQuestion(_questions[getType()], inputTrue, inputFalse);

    window.setTimeout(updateInteraction, getInterval());
  }

  function updateMood() {
    mood.update(updateMood);
    console.log('Mood', mood.getMood(), mood.getInterval());
    content.actor.update(mood.getMood());
    setResponses();
    setQuestions();
  }

  function inputTrue() {
    userResponse(true); 
  }

  function inputFalse() {
    userResponse(false); 
  }

  function userResponse(input) {
    content.displayResponse(getPositiveResponse());

    if(input) {
      request.get({
        mood: mood.getMood(),
        type: getType(),
        input: 'yes'
      }, content.display);
    } else {
      content.displayResponse(getNegativeResponse());
    }
  }
  
  return {
    getType: getType,
    getInterval:  getInterval,
    getPositiveResponse: getPositiveResponse,
    getNegativeResponse: getNegativeResponse,
    startInteractionLoop: startInteractionLoop,
    startMoodLoop: startMoodLoop,
    userResponse: userResponse,
    mood: mood,
    content: content,
    request: request
  };

};

module.exports = Interact;

},{"./Content":4,"./Mood":7,"./Request":8}],6:[function(require,module,exports){
(function () { 
  var Interact = require('./Interact');

  var interact;

  var GAME_UPDATE_INTERVAL = 33;
  
  (function () {
    interact = Interact(); 

    interact.startMoodLoop();
    interact.startInteractionLoop();

    window.setInterval(gameLoop, GAME_UPDATE_INTERVAL);
  }());

  function gameLoop() {
    interact.content.actor.animate(interact.mood.getMood());
  }

  return {
    interact: interact
  };

}());

},{"./Interact":5}],7:[function(require,module,exports){
var Mood = function() {
  var MIN_TIME = 1000 * 60,     // 1 minute
      MAX_TIME = 1000 * 60 * 3; // 3 minutes

  var _mood,
      _interval;

  (function () {
    _moods = ['playful', 'depressed', 'zonked'];
    setInterval();
    setMood();
  }());

  function setInterval() {
    _interval = Math.floor(Math.random() * MAX_TIME + MIN_TIME);
  }

  function setMood() {
    var index = Math.floor(Math.random() * 3); 
    _mood = _moods[index]; 
  }

  function getMood() {
    return _mood;
  }

  function getInterval() {
    return _interval;
  }
  
  function update(callback) {
    setInterval();
    setMood();
    window.setTimeout(callback, getInterval());
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
        callback(xmlHttpRequest.responseText, o);
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