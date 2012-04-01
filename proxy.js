var Proxy = require('node-proxy');

var wrap = function(name,entity,getter,setter,func) {
  var n = name;
  return Proxy.create({
    get:function(receiver, name){
      getter(n.concat(name));
      return entity[name];
    },
    set:function(receiver, name, value){
      var temp = n.concat(name);
      val = value;
      if (typeof(value)=="object"){
        setter(temp, value);
        val = wrap(temp, value, getter, setter);
        entity[name] = val;
      } else if (typeof(value)=="function"){
        console.log(temp);
        entity[name]=Proxy.createFunction(value, function(){
          var app = [];
          var t = [];
          t.push(temp);
          for (var key in arguments){
            app.push(arguments[key]);
            t.push(arguments[key]);
          }
          func.apply(null, t);
          value.apply(null, app);
        });
      }
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
exports.wrap = wrap;
