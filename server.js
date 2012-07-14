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
nowjs.on("connect", function() {
  console.log("Joined: " + this.now.name);
});

nowjs.on("disconnect", function() {
  console.log("Left: " + this.now.name);
});
everyone.now.distributeMessage = function(message) {
  everyone.now.receiveMessage(message);
  everyone.now.x = message;
};
console.log("HEY");
