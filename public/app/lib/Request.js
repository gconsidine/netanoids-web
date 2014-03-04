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
