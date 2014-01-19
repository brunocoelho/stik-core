(function() {
  if (window.stik.$$manager){
    throw "Stik.js is already loaded. Check your requires ;)";
  }

  window.stik.$$manager = new window.stik.Manager({
    $urlState: new window.stik.UrlState()
  }, window.stik.DOMLibLoader.$currentDOMSelector());

  window.stik.controller = function(controller, action, executionUnit){
    window.stik.$$manager.$addController(controller, action, executionUnit);
  };

  window.stik.behavior = function(name, executionUnit){
    return this.$$manager.$addBehavior(name, executionUnit);
  };

  window.stik.bindLazy = function(){
    if (!this.$$manager.$buildContexts() & !this.$$manager.$applyBehaviors()) {
      throw "nothing to bind!";
    }
  };

  window.stik.boundary = function(boundary){
    this.$$manager.$addBoundary(
      boundary.as,
      boundary.from,
      boundary.to
    );
  };

  window.stik.boundary({
    as: "$courier",
    from: "controller|behavior",
    to: new window.stik.Courier()
  });
})();
