var fs = require('fs');
var express = require('express');
var app = express.createServer();
app.listen(8080);
var nowjs = require("../now.js");
var everyone = nowjs.initialize(
  {
    apiKey : "73f5782c2019878a"
  }
);

app.use(express.static("./static/"));
app.get("/now.js", function(req, res) {
  fs.readFile("../client/now.js", function(err, data){
    res.writeHead(200, {'Content-Type':'text/javascript'});
    res.write(data);
    res.end();
  }); 
});
everyone.now.distributeMessage = function(message) {
  everyone.now.receiveMessage(this.now.name, message);
};
