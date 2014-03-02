(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function () { 
  var Request = require('./request');
  var request = Request();
  
  function logResponse(response) {
    console.log(response);
  }

  request.post({
    'species': 0,
    'mood': 'playful',
    'type': 'text',
    'input': 'yes'
  }, logResponse);

}());

},{"./request":2}],2:[function(require,module,exports){
var Request = function() {
  
  var _url = 'http://netanoids.greg-considine.com/api/',
      _parameters = '';

  var post = function(o, callback) {
    setParameters(o);    
    
    var xmlHttpRequest = new XMLHttpRequest();

    xmlHttpRequest.onreadystatechange = function () {
      if(xmlHttpRequest.readyState == 4 && xmlHttpRequest.status == 200) {
        console.log(xmlHttpRequest.responseText);
        callback(xmlHttpRequest.responseText);
      }
    }

    xmlHttpRequest.open('GET', _url + _parameters, true);
    xmlHttpRequest.send();
  }
  
  function setParameters(o) {
    _parameters = o.species + '/' + o.mood + '/' + o.type + '/' + o.input; 
  }

  function setUrl(url) {
    _url = url;
  }

  function getUrl() {
    return _url;
  }

  return {
    post : post,
    setUrl : setUrl,
    getUrl : getUrl
  }
};

module.exports = Request;

},{}]},{},[1,2])