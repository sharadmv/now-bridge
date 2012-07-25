var Proxy = require('node-proxy');
var proxy = require('./proxy.js');
Object.size = function(obj) {
  var size = 0, key;
  for (key in obj) {
    if (obj.hasOwnProperty(key)) size++;
  }
  return size;
};
var init = function(bridge, trigger) {
  var Now = function(name, c) {
    var self = this;
    self.clients = {};
    var scope = {};
    var methods = {};
    var clients = c;
    var serviceName = "now-service-"+name;
    var coreServiceName = "now-core-service-"+name;
    var coreChannelName = "now-core-channel-"+name;
    var clientService = "now-core-client-"+name;
    var getScope = function(client) {
      var proxy = Proxy.create({
        get : function(receiver, name) {
          return scope[client][name]; 
        },
        set : function(receiver, name, value) {
          if (!scope[client]) {
            scope[client] = {};
          }
          scope[client][name] = value;
          var context = bridge.context();
          context.getService(clientService, function(service) {
            service.updateScope(name, value);
          });
        }
      });
      return proxy;
    }
    var coreHandler = {
      connect : function() {
        var client = bridge.context().clientId;
        self.clients[client] = bridge.context();
        clients[client] = bridge.context();
        trigger("connect", {user:{clientId:client}, now:getScope(client)});
      },
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
          var client = bridge.context().clientId;
          val.apply({user:{clientId:client}, now:getScope(client)}, arguments);
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
  var Group = function(name, clients) {
    this.groupName = name;
    var temp = (new Now(name, clients));
    this.now = temp.now; 
    this.count = function(cb) {
      if (typeof(cb) == "function") {
        cb(Object.size(temp.clients));
      }
      return Object.size(temp.clients);
    }
    this.addUser = function(id) {
      var context = clients[id];
    }
  }
  return Group;
}
module.exports = init;
