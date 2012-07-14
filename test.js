var express = require('express');
var app = express.createServer();
app.listen(1337);
app.use(express.static("./static/"));
