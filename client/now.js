var bridge = new Bridge({apiKey:'abcdefgh'});
bridge.connect();
bridge.ready(function(){
  var scope = {};
  var now = {};
  //now traversal
  setInterval(function(){
    traverseScope(now,scope);  
  });
});
var traverseScope = function(obj,newObj){
  for (var i in obj){
  }
}
