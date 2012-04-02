var now = require('./now.js');
var everyone = now.initialize({apiKey:'abcdefgh'});
now.ready(function(){
  everyone.now.x = function(msg){
    console.log(msg);
  }
  everyone.now.x("HI");
});
