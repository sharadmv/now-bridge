var nowjs = {ready:function(ready){this.onready = ready}};
(function (url, nowjs, callback) {
    // adding the script tag to the head as suggested before
   var head = document.getElementsByTagName('head')[0];
   var script = document.createElement('script');
   script.type = 'text/javascript';
   script.src = url;

   script.onreadystatechange = callback;
   script.onload = callback;

   head.appendChild(script);
})("http://getbridge.com/js/bridge.min.js",nowjs, function() {
  var published = false;
  var loaded = false;
  var ready;
  var methods = [];
  var values = {};
  var myMethods = {};
  var bridge = new Bridge({
    apiKey : "73f5782c2019878a"
  });
  bridge.connect();
  var coreHandler = {
    updateScope : function(name, value) {
      now[name] = value;
      values[name] = value;
    }
  }
  bridge.joinChannel("now-core-channel-everyone", coreHandler);
  bridge.getService("now-core-service-everyone", function(core) {
    window.core = core;
    bridge.getService("now-service-everyone", function(n) {
      now = n;
      published = true;
    });
  });

  var onNew = function(prop) {
    if (typeof(now[prop]) == "function") {
      myMethods[prop] = now[prop];
      methods.push(prop);
      bridge.joinChannel("now-channel-everyone", myMethods);
    } else {
      values[prop] = now[prop];
      core.updateScope(prop, now[prop]);
    }
  }

  var traverseScope = function() {
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
          if (!values[prop] && methods.indexOf(prop) == -1 && prop.charAt(0) != "_") {
            onNew(prop);
          }
        }
      }
    }
  }
  setInterval(traverseScope, 1000);
  traverseScope();

});
