now = {};
(function (url, callback) {
   var head = document.getElementsByTagName('head')[0];
   var script = document.createElement('script');
   script.type = 'text/javascript';
   script.src = url;

   script.onreadystatechange = callback;
   script.onload = callback;

   head.appendChild(script);
})("http://getbridge.com/js/bridge.min.js", function() {
  var published = false;
  var loaded = false;
  var ready;
  var core;
  var methods = {};
  var values = {};
  var myMethods = {};
  var bridge = new Bridge({
    apiKey : "API_KEY"
  });
  bridge.connect();
  var coreHandler = {
    updateScope : function(name, value) {
      now[name] = value;
      values[name] = value;
    }
  }
  bridge.joinChannel("now-core-channel-everyone", coreHandler, true);
  bridge.storeService("now-core-client-everyone", coreHandler);
  bridge.getService("now-core-service-everyone", function(c) {
    core = c;
    core.connect();
    bridge.getService("now-service-everyone", function(n) {
      temp = {};
      for (var i in now) {
        temp[i] = now[i];
      }
      now = n;
      for (var i in now) {
        if (i.charAt(0) != "_") {
          methods[i] = now[i];
        }
      }
      for (var i in temp) {
        now[i] = temp[i];
        onNew(i);
      }
      published = true;
    });
  });

  var onNew = function(prop) {
    if (typeof(now[prop]) == "function") {
      myMethods[prop] = now[prop];
      //methods[prop] = now[prop];
      bridge.joinChannel("now-channel-everyone", myMethods, true);
      core.updateScope(prop, now[prop]);
    } else {
      values[prop] = now[prop];
      core.updateScope(prop, now[prop]);
    }
  }

  var traverseScope = function() {
    if (!published) {
    } else {
      for (var prop in now) {
        if ((values[prop] != now[prop] && myMethods[prop] != now[prop]) && prop.charAt(0) != "_") {
          onNew(prop);
        }
        if (!values[prop] && !myMethods[prop] && prop.charAt(0) != "_") {
          onNew(prop);
        }
      }
    }
  }
  setInterval(function(){traverseScope()}, 100);
  traverseScope();

});
