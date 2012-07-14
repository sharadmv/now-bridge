var Proxy = require('node-proxy');
var nowHandler = function(obj, funcHandler, varHandler, callHandler) {
  return {
    // Fundamental traps
    getOwnPropertyDescriptor: function(name) {
      var desc = Object.getOwnPropertyDescriptor(obj, name);
      // a trapping proxy's properties must always be configurable
      if (desc !== undefined) { desc.configurable = true; }
      return desc;
    },
    getPropertyDescriptor:  function(name) {
      var desc = Object.getPropertyDescriptor(obj, name); // not in ES5
      // a trapping proxy's properties must always be configurable
      if (desc !== undefined) { desc.configurable = true; }
      return desc;
    },
    getOwnPropertyNames: function() {
      return Object.getOwnPropertyNames(obj);
    },
    getPropertyNames: function() {
      return Object.getPropertyNames(obj);                // not in ES5
    },
    defineProperty: function(name, desc) {
      Object.defineProperty(obj, name, desc);
    },
    delete:       function(name) { return delete obj[name]; },   
    fix:          function() {
      if (Object.isFrozen(obj)) {
        return Object.getOwnPropertyNames(obj).map(function(name) {
          return Object.getOwnPropertyDescriptor(obj, name);
        });
      }
      // As long as obj is not frozen, the proxy won't allow itself to be fixed
      return undefined; // will cause a TypeError to be thrown
    },
   
    // derived traps
    has:          function(name) { return name in obj; },
    hasOwn:       function(name) { return Object.prototype.hasOwnProperty.call(obj, name); },
    get:          function(receiver, name) { 
      var p = Proxy.createFunction({}, function() { }, function() { });
      console.log(obj, name);
      if (name == 'inspect') {
        return obj[name];
      } else {
        return Proxy.createFunction(obj, function() {
          callHandler(name, arguments);
        }, 
        function() {
        }); 
      }
    },
    set:          function(receiver, name, val) { 
      if (typeof(val) == "function") {
        funcHandler(obj, receiver, name, val);
      } else {
        varHandler(obj, receiver, name, val);
      }
      return true; 
    }, // bad behavior when set fails in non-strict mode
    enumerate:    function() {
      var result = [];
      for (name in obj) { result.push(name); };
      return result;
    },
    keys: function() { return Object.keys(obj) }
  };
}

var proxy = {
  createNow : function(functionHandler, varHandler, callHandler) {
    var now = Proxy.create(nowHandler({}, functionHandler, varHandler, callHandler)) 
    return now;
  }
}
module.exports = proxy;
