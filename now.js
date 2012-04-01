var Bridge = require('./bridge/bridge.js');
var bridge;
var proxy = require('./proxy.js');
var Now = function(){
  var r;
  var events = {};
  var now = {};
  var nowWrapper = {};
  var wrapper = proxy.wrap(['now'],nowWrapper,
    function(name){
      var temp = now;
      var temp2 = nowWrapper;
      for (var i = 1;i<name.length-1;i++){
        temp = temp[name[i]];    
        temp2 = temp2[name[i]];
      }
      var val = temp[name[name.length-1]];
      if (typeof(val) == 'function') {
        return temp2[name[name.length-1]];
      }
      return temp[name[name.length-1]]
    },
    function(name, value){
      var temp = now;
      var temp2 = nowWrapper;
      for (var i = 1;i<name.length-1;i++){
        temp = temp[name[i]];    
        temp2 = temp2[name[i]];
      }
      if (typeof(value) != "function"){
        temp[name[name.length-1]] = value;
        temp2[name[name.length-1]] = value;
      } else {
        temp[name[name.length-1]] = value;
        temp2[name[name.length-1]] = function(){
          var argus = arguments;
          bridge.getService('now',function(obj){
            var temp = obj;
            for (var i = 1;i<name.length-1;i++){
              temp = temp[name[i]];    
            }
            args = [];
            for (var i in argus){
              args.push(argus[i]);
            }
            temp[name[name.length-1]].apply(null,args);
          });
        }
      }
      bridge.publishService('now',now,function(obj){bridge.getService('now',function(obj){})});
      return true;
    },
    function() {
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
