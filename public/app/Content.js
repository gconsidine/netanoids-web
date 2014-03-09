var Content = function() {
  
  function displayVideo(o) {
    /*
    var div = document.createElement('div');

    div.id = 'video';
    div.setAttribute('style', 'width: ' + Math.floor(o.width) + 'px; height: ' + Math.floor(o.height) + 'px');

    div.innerHTML = '<iframe width="560" height="315" src="//www.youtube.com/embed/OO-vG8oPhhM?list=PL5gcv_l9e7VWkjF3ft6Cv6E9N5jyIIlp_" frameborder="0" allowfullscreen></iframe>';
    djcument.body.insertBefore(div, document.getElementsByTagName('script')[0]);
    */
  }

  return {
    displayVideo: displayVideo
  };
};

module.exports = Content;
