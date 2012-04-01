var Bridge = require('./bridge/bridge.js');
var bridge;
var proxy = require('./proxy.js');
var Now = function(){
  var r;
  var events = {};
  var now = {};
  var wrapper = proxy.wrap(now, 
    function(name){
      console.log("GETTING now."+name);
    },
    function(name, value){
      console.log("SETTING now."+name+" = "+value);
    }
  ); 
  var everyone = {now:wrapper};
  this.initialize=function(params, callback){
    bridge = new Bridge(params);
    bridge.connect();
    bridge.ready(function(){
      if (typeof(r)==="function"){
        r();
      }
      bridge.publishService('now');
    });
    return everyone;
  },
  this.ready=function(callback) {
    r = callback;
  }
  this.on = function(e, callback){
    events[e] = callback;
  }
}
module.exports = new Now();
