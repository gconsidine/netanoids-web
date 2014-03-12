var Interact = function() {

  var Mood = require('./Mood'),
      Request = require('./Request'),
      Content = require('./Content');

  var MIN_TIME = 1000 * 15,       // 15 seconds
      MAX_TIME = 1000 * 60 * 1.5; // 1 minute 30 seconds 

  var _questions,
      _negativeResponses,
      _positiveResponses,
      _types,
      _type,
      _interval,
      _response,
      _prompted;

  var mood, 
      request, 
      content;

  (function () {
    mood = Mood();
    request = Request();
    content = Content();

    _types = ['text', 'image', 'video'];

    setQuestions();
    setPositiveResponses();
    setNegativeResponses();
    setInterval();
    setType();
    
    content.background.update();
    content.actor.update(mood.getMood());
  }());

  function setQuestions() {
    var currentMood = mood.getMood();
    
    switch(currentMood){
      case 'playful':
        _questions = {
          text: 'Hiya, want to read something?', 
          image: 'Yo, want to look at a cool picture?', 
          video: 'Ayo.  Want to see a video I like?'
        };
        break;
      case 'depressed':
        _questions = {
          text: 'You probably don\'t, but, want to read something I found?', 
          image: 'This picture bums me out... Want to look?', 
          video: 'This video would be good on a rainy day. Want to watch?'
        };

        break;
      case 'zonked':
        _questions = {
          text: 'Text.  I have it.  Do you want it?', 
          image: 'Oh, this picture. WAT.', 
          video: '::dances:: -- Want to see what I see?'
        };
        break;
    }
  }
  
  function setResponses() {
    setPositiveResponses();
    setNegativeResponses();
  }

  function setPositiveResponses() {
    var currentMood = mood.getMood(); 

    switch(currentMood){
      case 'playful':
         _positiveResponses = {
          text: '::squeee:: One sec. I\'ll read it to you', 
          image: 'Yay. Just a sec, let me project it', 
          video: 'Awesome.  I\'ll put it up on the projector'
        };
        break;
      case 'depressed':
        _positiveResponses = {
          text: 'Oh? Ok. I guess I\'ll read it.', 
          image: 'Ok. Don\'t get upset if you don\'t like it.', 
          video: 'Eh. Ok.  I\'ll project it, I guess.'
        };

        break;
      case 'zonked':
        _positiveResponses = {
          text: '::giggles:: Okay, okay.  Let me read. ::clears throat::', 
          image: '::stares off into the distance:: ... Oh! I\'ll turn on the projector!', 
          video: 'Hooray!  I think I can get this to work.  One sec.'
        };
        break;
    }
  }

  function setNegativeResponses() {
    var currentMood = mood.getMood(); 

    switch(currentMood){
      case 'playful':
         _negativeResponses = {
          text: 'Pffffft.  Fine, fine.  No prob.', 
          image: '::shrug:: No biggie.', 
          video: 'That\'s cool.'
        };
        break;
      case 'depressed':
        _negativeResponses = {
          text: '::thousand-yard stare::', 
          image: 'Whatever.', 
          video:'I didn\'t really feel like playing it anyway.'
        };
        break;
      case 'zonked':
        _negativeResponses = {
          text: 'Ok, let me go gra... oh. OH. That\'s fine.', 
          image: '::stares:: Hm? Oh. ::shrug::', 
          video: 'But... But... ::sigh:: Okay.'
        };
        break;
    }   
  }

  function getPositiveResponse() {
    return _positiveResponses[getType()]; 
  }

  function getNegativeResponse() {
     return _negativeResponses[getType()]; 
  }

  function setType() {
    var index = Math.floor(Math.random() * 3); 
    _type = _types[index]; 
  }

  function setInterval() {
    _interval = Math.floor(Math.random() * MAX_TIME + MIN_TIME);
  }

  function getType() {
    return _type;
  }

  function getInterval() {
    return _interval;
  }
  
  function startMoodLoop() {
    updateMood();
  }

  function startInteractionLoop() {
    window.setTimeout(updateInteraction, Math.floor(Math.random() * MAX_TIME + MIN_TIME));
  }

  function updateInteraction() {
    setInterval();
    setType();

    console.log('Interaction', getType(), getInterval());

    content.displayQuestion(_questions[getType()], inputTrue, inputFalse);

    window.setTimeout(updateInteraction, getInterval());
  }

  function updateMood() {
    mood.update(updateMood);
    console.log('Mood', mood.getMood(), mood.getInterval());
    content.actor.update(mood.getMood());
    setResponses();
    setQuestions();
  }

  function inputTrue() {
    userResponse(true); 
  }

  function inputFalse() {
    userResponse(false); 
  }

  function userResponse(input) {
    content.displayResponse(getPositiveResponse());

    if(input) {
      request.get({
        mood: mood.getMood(),
        type: getType(),
        input: 'yes'
      }, content.display);
    } else {
      content.displayResponse(getNegativeResponse());
    }
  }
  
  return {
    getType: getType,
    getInterval:  getInterval,
    getPositiveResponse: getPositiveResponse,
    getNegativeResponse: getNegativeResponse,
    startInteractionLoop: startInteractionLoop,
    startMoodLoop: startMoodLoop,
    userResponse: userResponse,
    mood: mood,
    content: content,
    request: request
  };

};

module.exports = Interact;
