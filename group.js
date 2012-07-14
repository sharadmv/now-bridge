var Proxy = require('node-proxy');
var proxy = require('./proxy.js');
var init = function(bridge) {
  var Now = function(name) {
    var methods = {_dummy:function(){}};
    var serviceName = "now-service-"+name;
    this.now = proxy.createNow(
      function(obj, receiver, name, val) {
        obj[name] = val;
        bridge.publishService(serviceName, obj);
        /*
        (function(obj, receiver, name, val) {
          obj[name] = Proxy.createFunction({
            get : function(receiver, name) {
              if (name == "now") {
                return {now:"AMAZING"};
              } else if (name == "apply") {
                return Function.apply.call;
              }
              return;
            },
            set : function(receiver, name, value) {
              return true;
            }
          }, function() {
            var args = arguments;
            bridge.getChannel(channelName, function(channel) {
              channel[name].apply(this, args);
            });
          }, function() {
          });
          methods[name] = function() {
            var args = [];
            for (var i in arguments) {
              args.push(arguments[i]);
            }
            val.apply(this, args);
          }
          bridge.joinChannel(channelName, obj);
        })(obj, receiver, name, val);
        */
      },
      function(obj, receiver, name, val) {
        obj[name] = val;
      }
    );
  }
  var Group = function(name) {
    this.groupName = name;
    this.now = (new Now(name)).now; 
  }
  return Group;
}
module.exports = init;
