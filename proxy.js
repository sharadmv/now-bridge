var Proxy = require('node-proxy');

var wrap = function(name,entity,getter,setter,caller) {
  var n = name;
  return Proxy.createFunction({
      get:function(receiver, name){
        name = n.concat(name);
        return getter(name);  
      },
      set:function(receiver, name, value){
        name = n.concat(name);
        if (typeof(value) == "object") {
          return setter(name, value);
        } else {
          return setter(name, value);
        }
      },
      enumerate:function(){
        return Object.keys(entity);
      }
  },caller);
}
var wrapFunction = function(name, entity, caller) {
  var n = name;
  return Proxy.createFunction({
      get:function(receiver, name){
        name = n.concat(name);
        return getter(name);  
      },
      set:function(receiver, name, value){
        name = n.concat(name);
        if (typeof(value) == "object") {
          return setter(name, value);
        } else {
          return setter(name, value);
        }
      },
      enumerate:function(){
        return Object.keys(entity);
      }
  }
  , caller,
  function(){
  });
}
exports.wrap = wrap;
exports.wrapFunction = wrapFunction;
