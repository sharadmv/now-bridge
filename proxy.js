var Proxy = require('node-proxy');
exports.wrap = function(entity,getter,setter) {
  return Proxy.create({
    get:function(receiver, name){
      getter(name);
      return entity[name];
    },
    set:function(receiver, name, value){
      setter(name, value);
      entity[name] = value;
    },
    enumerate:function(){
      var props = [];
      for (name in entity){props.push(name);};
      return props;
    },
    iterate:function(){
      var props = entity.enumerate(), i = 0;
      return {
        next:function(){
          if (i===props.length) throw StopIteration;
          return props[i++]
        }
      };
    }
  });
}
