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
