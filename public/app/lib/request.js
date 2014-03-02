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
