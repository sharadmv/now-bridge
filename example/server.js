var express = require('express');
app = express.createServer();
app.use(express.static(__dirname));
app.listen(8080);
var nowjs = require('../now.js');
var everyone = nowjs.initialize({apiKey:'abcdefgh'});

everyone.now.distributeMessage = function(name, message){
  everyone.now.receiveMessage(name, message);
};
