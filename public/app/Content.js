var Content = function() {
  Background = require('./Background');
  Actor = require('./Actor');
  
  var PROMPT_PADDING = 100,
      PROMPT_TIMEOUT = 1000 * 10; // 10 seconds

  var background,
      actor;
  
  var _promptY,
      _promptX;


  (function() {
    background = Background();  
    actor = Actor();

    _promptY = Math.floor(background.y + background.height + PROMPT_PADDING);
    _promptX = Math.floor(background.width / 2);
  }());

  function displayError() {
    displayResponse('I couldn\'t find it.  I tried.  Seriously.');
  }
 
  function display(response, o) {
    var json,
        div,
        html;
    
    clearContent();

    try {
      json = JSON.parse(response);
      console.log(json);
    } catch(e) {
      displayError();
      return false;
    }

    if(json.status === 'fail') {
      displayError();
      return false;
    }

    if(o.type === 'video') {

      html = '<iframe width="' + background.width + '" height="' + background.height 
           + '" src="http://www.youtube.com/embed/' + json.content + '?autoplay=1"' 
           + 'frameborder="0" allowfullscreen></iframe>';

    } else if(o.type === 'image') {

      html = '<img width="auto" height="' + background.height + '" src="' + decodeURIComponent(json.content) + '" />'

    } else if(o.type === 'text') {

      html = '<p><em>' + json.title + '</em></p><p>' + json.content + '</p>';

    }

    div = document.createElement('div');  
    div.id = 'content';
    div.style.height = background.height + 'px';
    div.style.width = background.width + 'px';
    div.setAttribute('style', 'width: ' + background.width + 'px; height: ' + background.height 
                     + 'px; text-align: center; position: absolute; top:' + background.y 
                     + 'px; left:' + background.x + 'px;');

    div.innerHTML = html;

    document.body.appendChild(div);
  }


  function displayQuestion(question, inputTrue, inputFalse) {
    clearPrompt();

    var div = document.createElement('div'),
        yesButton = document.createElement('button'),
        noButton = document.createElement('button'),
        html = '';

    div.id = 'prompt';
    div.setAttribute('style', 'position: absolute; top:' + _promptY + 'px; left:' + _promptX + 'px;');

    yesButton.onclick = inputTrue;
    yesButton.innerHTML = 'Yes';

    noButton.onclick = inputFalse;
    noButton.innerHTML = 'No';
    
    html = '<p>' + question + '</p>'

    div.innerHTML = html;
    div.appendChild(yesButton);
    div.appendChild(noButton);
    
    document.body.appendChild(div);

    window.setTimeout(clearPrompt, PROMPT_TIMEOUT);
  }

  function displayResponse(response) {
    clearPrompt();

    var div = document.createElement('div'),
        html = '';

    div.id = 'prompt';
    div.setAttribute('style', 'position: absolute; top:' + _promptY + 'px; left:' + _promptX + 'px;');
    
    html = '<p>' + response + '</p>'

    div.innerHTML = html;
    document.body.appendChild(div);

    window.setTimeout(clearPrompt, PROMPT_TIMEOUT);
  }
  
  function clearPrompt() {
    var body = document.body;
    var prompt = document.getElementById('prompt');
    
    if(prompt) {
      body.removeChild(prompt);
    }
  }

  function clearContent() {
    var body = document.body;
    var content = document.getElementById('content');
    
    if(content) {
      body.removeChild(content);
    }
  }

  return {
    display: display,
    displayQuestion: displayQuestion,
    displayResponse: displayResponse,
    clearContent: clearContent,
    clearPrompt: clearPrompt,
    background: background,
    actor: actor
  };

};

module.exports = Content;
