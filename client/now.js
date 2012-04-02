var bridge = new Bridge({apiKey:'abcdefgh'});
bridge.connect();
var n = {};
var scope = {};
var callback
var now={ready:function(c){
    callback = c;
}};
window.now = now;
bridge.ready(function(){
  bridge.getService('now',function(service){now = service;
    for (var i in now){
      scope[i] = now[i];
    }
    update();
    callback();
    setInterval(update,1000);
  });
});
var traverseScope = function(obj,newObj,update){
  var publish = false;
  for (var i in obj){
    if (!newObj[i]){
      publish = true;
      newObj[i] = obj[i];
      update[i] = obj[i];
    }
  }
  return publish;
}
var update = function(){
  if (traverseScope(now,scope,n)) {
    bridge.joinChannel('now',n);
  }
}
