var nowjs = require('./now.js');
var proxy = require('./proxy.js');
var everyone = nowjs.initialize({apiKey:'R+DPnfAq'});
nowjs.ready(function(){
  everyone.now.x = {};
  everyone.now.x.y = 5;
  console.log(everyone.now.x.y);
});
