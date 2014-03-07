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
