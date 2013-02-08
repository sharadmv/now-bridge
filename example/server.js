var express = require('express');
var app = express.createServer();
app.listen(8080);
var nowjs = require("../now.js");
var apiKey = "6feaf3a1eb263f5b";
var everyone = nowjs.initialize(app, { apiKey : apiKey });

app.use(express.static("./static/"));
/*nowjs.on('connect', function() {
  this.now.blah = "SUP";
});
*/
everyone.now.distributeMessage = function(message) {
  everyone.now.receiveMessage(this.now.name, message);
};
everyone.now.setValue = function(name, value) {
  this.now[name] = value;
}
