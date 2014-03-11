var Mood = function() {
  
  var _mood,
      _interval;

  (function () {
    _moods = ['playful', 'depressed', 'zonked'];
    setInterval();
    setMood();
  }());

  function setInterval() {
    _interval = Math.floor(Math.random() * ((100 * 60 * 60) + 1000));
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
