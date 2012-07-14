var Bridge = require('bridge');
var bridge;
var proxy = require('./proxy.js');
var emitter = {};
var Group; 
var groups = {};
var nowjs = {
  getGroup : function(group) {
  },
  getGroups : function(callback) {
  },
  initialize : function(properties) {
    bridge = new Bridge(properties);
    bridge.connect();
    Group = require('./group.js')(bridge);
    return new Group("everyone");
  },
  on : function(event, callback) {
    if (!emitter.event) {
      emitter.event = [];
    }
    emitter.event.push(callback);
  }
}

var trigger = function(event) {
  if (emitter.event) {
    for (var cb in emitter.event) {
      if (typeof(cb) == "function") {
        cb();
      }
    }
  }
}
module.exports = nowjs;
