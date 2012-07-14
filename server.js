var express = require('express');
var app = express.createServer();
app.listen(8080);
var nowjs = require("./now.js");
var everyone = nowjs.initialize(
  {
    apiKey : "73f5782c2019878a"
  }
);

app.use(express.static("./client/"));
everyone.now.distributeMessage = function(message) {
  everyone.now.receiveMessage(this.now.name, message);
};
