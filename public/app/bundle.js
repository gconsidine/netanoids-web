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
(function () { 

  /* Module includes */
  var Request = require('./request'),
      Canvas = require('./canvas');

  var request = Request(),
      canvas = Canvas();
  
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

},{"./canvas":1,"./request":3}],3:[function(require,module,exports){
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

},{}]},{},[1,2,3])