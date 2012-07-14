var express = require('express');
var app = express.createServer();
app.listen(8080);
var nowjs = require("./now.js");
var everyone = nowjs.initialize(
  {
    apiKey : "3083805b"
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
  console.log(message);
//  everyone.now.receiveMessage(message);
};
console.log(everyone);
setTimeout(function(){
  everyone.now.distributeMessage("SUP");
},3000);
