var now = require('./now.js');
var everyone = now.initialize({apiKey:'abcdefgh'});
  everyone.now.distributeMessage = function(name, message){
    console.log("CALLING");
    everyone.now.receiveMessage(name, message);
  }
