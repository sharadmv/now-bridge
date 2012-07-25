var fs = require('fs');
var Bridge = require('bridge-js');
var bridge;
var proxy = require('./proxy.js');
var emitter = {};
var Group; 
var groups = {};
var clients = {};
var nowjs = {
  getGroup : function(group) {
    if (!groups[group]) {
      groups[group] = new Group(group, clients);
    }
    return groups[group];
  },
  getGroups : function(callback) {
  },
  initialize : function(server, properties) {
    server.get("/nowjs/now.js", function(req, res) {
      fs.readFile("../client/now.js", function(err, data){
        res.writeHead(200, {'Content-Type':'text/javascript'});
        data = data.toString('ascii').replace(/API_KEY/g, properties.apiKey); 
        res.write(data);
        res.end();
      }); 
    });
    bridge = new Bridge(properties);
    bridge.connect();
    Group = require('./group.js')(bridge, trigger);
    return new Group("everyone", clients);
  },
  on : function(event, callback) {
    if (!emitter.event) {
      emitter.event = [];
    }
    emitter.event.push(callback);
  }
}

var trigger = function(event, scope) {
  if (emitter.event) {
    for (var cb in emitter.event) {
      if (typeof(emitter.event[cb]) == "function") {
        emitter.event[cb].apply(scope, []);
      }
    }
  }
}
module.exports = nowjs;
