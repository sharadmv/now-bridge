var Proxy = require('node-proxy');
var proxy = require('./proxy.js');
var init = function(bridge) {
  var Now = function(name) {
    var scope = {};
    var methods = {};
    var serviceName = "now-service-"+name;
    var coreServiceName = "now-core-service-"+name;
    var coreChannelName = "now-core-channel-"+name;
    var coreHandler = {
      updateScope : function(name, value) {
        var client = bridge.context().clientId;
        if (!scope[client]) {
          scope[client] = {};
        }
        scope[client][name] = value;
      }
    }
    this.now = proxy.createNow(
      function(obj, receiver, name, val) {
        methods[name] = val;
        //obj[name] = val;
        obj[name] = function() {
          console.log("SUP");
          var client = bridge.context().clientId;
          val.apply({now:scope[client]}, arguments);
        }
        bridge.publishService(serviceName, obj);
      },
      function(obj, receiver, name, val) {
        obj[name] = val;
        bridge.getChannel(coreChannelName, function(channel) {
          channel.updateScope(name, val);
        });
      }, 
      function(func, args) {
        bridge.getChannel("now-channel-"+name, function(channel) {
          channel[func].apply(this, args);
        })
      }
    );
    bridge.publishService(coreServiceName, coreHandler);
  }
  var Group = function(name) {
    this.groupName = name;
    this.now = (new Now(name)).now; 
  }
  return Group;
}
module.exports = init;
