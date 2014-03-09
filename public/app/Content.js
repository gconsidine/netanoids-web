var Content = function() {
  Background = require('./Background');
  Actor = require('./Actor');
  
  var background,
      actor;

  (function() {
    background = Background();  
    actor = Actor();
  }());

  function displayVideo() {
    var div = document.createElement('div');  
    div.id = 'video';
    div.style.height = background.height + 'px';
    div.style.width = background.width + 'px';
    div.setAttribute('style', 'position: absolute; top:' + background.y + 'px; left:' + background.x + 'px;');

    div.innerHTML = '<iframe width="' + background.width + '" height="' + background.height 
                  + '" src="http://www.youtube.com/embed/OO-vG8oPhhM?autoplay=1"' 
                  + 'frameborder="0" allowfullscreen></iframe>';

    document.body.appendChild(div);
  }

  return {
    displayVideo: displayVideo,
    background: background,
    actor: actor
  };
};

module.exports = Content;
