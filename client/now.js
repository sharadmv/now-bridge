var nowjs = {ready:function(ready){this.onready = ready}};
(function (url, nowjs, callback) {
    // adding the script tag to the head as suggested before
   var head = document.getElementsByTagName('head')[0];
   var script = document.createElement('script');
   script.type = 'text/javascript';
   script.src = url;

   // then bind the event to the callback function 
   // there are several events for cross browser compatibility
   script.onreadystatechange = callback;
   script.onload = callback;

   // fire the loading
   head.appendChild(script);
})("http://getbridge.com/js/bridge.min.js",nowjs, function() {
  var published = false;
  var loaded = false;
  var ready;
  var methods = [];
  var myMethods = {};
  var bridge = new Bridge({
    apiKey : "3083805b"
  });
  bridge.connect();
  bridge.getService("now-service-everyone", function(n) {
    now = n;
    published = true;
  });

  var onNew = function(prop) {
    myMethods[prop] = now[prop];
    methods.push(prop);
    bridge.joinChannel("now-channel-everyone", myMethods);
  }

  var traverseScope = function() {
    console.log("traversing");
    if (published) {
      if (!loaded) {
        for (var prop in now) {
          if (prop.charAt(0) != "_") {
            methods.push(prop);
          }
        }
        nowjs.onready();
        loaded = true;
      } else {
        for (var prop in now) {
          if (methods.indexOf(prop) == -1 && prop.charAt(0) != "_") {
            onNew(prop);
          }
        }
      }
    }
  }
  setInterval(traverseScope, 1000);
  traverseScope();

});
