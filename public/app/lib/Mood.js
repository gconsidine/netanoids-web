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
