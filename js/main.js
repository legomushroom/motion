(function() {
  var Motion;

  Motion = (function() {
    function Motion(o) {
      this.o = o != null ? o : {};
    }

    return Motion;

  })();

  window.motion = new Motion;

}).call(this);
