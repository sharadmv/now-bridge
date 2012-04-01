var Bridge = require('./bridge/bridge.js');
var bridge;
var proxy = require('./proxy.js');
var Now = function(){
  var r;
  var events = {};
  var now = {};
  var wrapper = proxy.wrap(['now'],now, 
    function(name){
    },
    function(name, value){
      console.log(now);
      bridge.publishService('now',now,function(obj){
        bridge.getService('now',function(obj){console.log(obj)});
      });
    },
    function(name){
      var temp = arguments;
      console.log("BLAH");
      bridge.getService('now',function(obj){
        var x = obj;
        for (var i in name){
          x = x[name[i]];
        }
        delete temp['0']
        x.apply(null,temp);
      });
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
