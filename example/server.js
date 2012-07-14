var express = require('express');
var app = express.createServer();
app.listen(8080);
var nowjs = require("../now.js");
var apiKey = "73f5782c2019878a";
var everyone = nowjs.initialize(app, { apiKey : apiKey });

app.use(express.static("./static/"));
everyone.now.distributeMessage = function(message) {
  everyone.now.receiveMessage(this.now.name, message);
};
