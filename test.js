var nowjs = require('./now.js');
var proxy = require('./proxy.js');
var Proxy = require('node-proxy');
var everyone = nowjs.initialize({apiKey:'abcdefgh'});
nowjs.ready(function(){
  everyone.now.y = 5;
  everyone.now.z = {};
  everyone.now.z.f = 1;
  everyone.now.x = function(msg){
    console.log(msg);
  }
  console.log(everyone.now);
  setTimeout(function(){everyone.now.x("hello")},500);
});
