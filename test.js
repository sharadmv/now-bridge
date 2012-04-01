var nowjs = require('./now.js');
var proxy = require('./proxy.js');
var Proxy = require('node-proxy');
var everyone = nowjs.initialize({apiKey:'abcdefgh'});
nowjs.ready(function(){
  everyone.now.x = console.log;
  everyone.now.x("HI","Amma");
});
