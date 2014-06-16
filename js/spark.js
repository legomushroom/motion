(function() {
  var Spark,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Spark = (function(_super) {
    __extends(Spark, _super);

    function Spark() {
      return Spark.__super__.constructor.apply(this, arguments);
    }

    Spark.prototype.type = 'spark';

    Spark.prototype.init = function() {
      this.add2Dom();
      return this;
    };

    Spark.prototype.vars = function() {
      Spark.__super__.vars.apply(this, arguments);
      return this.cnt = this.o.cnt;
    };

    Spark.prototype.animate = function() {};

    Spark.prototype.reset = function() {};

    return Spark;

  })(motion.Bit);

}).call(this);
