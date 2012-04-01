var Proxy = require('node-proxy');

var wrap = function(name,entity,getter,setter) {
  var n = name;
  return Proxy.create({
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
  });
}
exports.wrap = wrap;
