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
