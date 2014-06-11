(function() {
  motion.helpers = {
    rand: function(min, max) {
      return Math.floor((Math.random() * ((max + 1) - min)) + min);
    }
  };

}).call(this);
