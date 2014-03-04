(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var Canvas = function() {

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

},{}],2:[function(require,module,exports){
var Content = function() {

};

module.exports = Content;

},{}],3:[function(require,module,exports){
var Interact = function() {

};

module.exports = Interact;

},{}],4:[function(require,module,exports){
(function () { 

  /* Module includes */
  var Request = require('./Request'),
      Canvas = require('./Canvas');

  var request = Request(),
      canvas = Canvas();

  var gameLoop = (function () {
    //window.setInterval(sayHi, 1000);
  }());

  function logResponse(response) {
    console.log(response);
  }

  canvas.create('background');
  canvas.create('foreground');

  request.get({
    'mood': 'playful',
    'type': 'text',
    'input': 'yes'
  }, logResponse);

}());

},{"./Canvas":1,"./Request":6}],5:[function(require,module,exports){
var Mood = function() {
  
  var _mood = [],
      _interval = 0;

  (function () {
    _mood = ['playful', 'depressed', 'zonked'];
  }());

  function setInterval() {
    _interval = Math.floor(Math.random() * ((1000 * 60 * 60) + 1000));
  }

  function getMood() {
    var index = Math.floor(Math.random() * 2); 
  }

  function getInterval() {
    return _interval;
  }
  
  return {
    getMood : getMood,
    getInterval : getInterval
  };

};

module.exports = Mood;

},{}],6:[function(require,module,exports){
var Request = function() {
  
  /* 
   * API Call format:
   * http://api.greg-considine.com/netanoids/<species>/<mood>/<type>/<input>
   */
  var _url = 'http://api.greg-considine.com/netanoids/0/';

  var get = function(o, callback) {
    var parameters = setParameters(o),
        xmlHttpRequest = new XMLHttpRequest();

    xmlHttpRequest.onreadystatechange = function () {
      if(xmlHttpRequest.readyState == 4 && xmlHttpRequest.status == 200) {
        callback(xmlHttpRequest.responseText);
      }
    }

    xmlHttpRequest.open('GET', _url + parameters, true);
    xmlHttpRequest.send();
  }
  
  function setParameters(o) {
    return o.mood + '/' + o.type + '/' + o.input; 
  }

  function setUrl(url) {
    _url = url;
  }

  function getUrl() {
    return _url;
  }

  return {
    get : get,
    setUrl : setUrl,
    getUrl : getUrl
  };

};

module.exports = Request;

},{}]},{},[1,2,3,4,5,6])