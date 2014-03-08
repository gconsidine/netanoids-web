var Mood = function() {
  
  var _mood,
      _interval;

  (function () {
    _moods = ['playful', 'depressed', 'zonked'];
    setInterval();
    setMood();
  }());

  function setInterval() {
    _interval = Math.floor(Math.random() * ((1000 * 60 * 60) + 1000));
  }

  function setMood() {
    var index = Math.floor(Math.random() * 2); 
    _mood = _moods[index]; 
  }

  function getMood() {
    return _mood;
  }

  function getInterval() {
    return _interval;
  }
  
  function update() {
    setInterval();
    setMood();
    window.setTimeout(update, getInterval());
  }
  
  return {
    getMood : getMood,
    getInterval : getInterval,
    update : update
  };

};

module.exports = Mood;