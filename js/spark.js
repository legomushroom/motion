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
      this;
      return this.animate();
    };

    Spark.prototype.vars = function() {
      Spark.__super__.vars.apply(this, arguments);
      this.cnt = this.o.cnt || 5;
      this.rand = motion.helpers.rand;
      this.cloneBits({
        "class": 'bit',
        cnt: this.cnt
      });
      return this.$el.css({
        width: 2 * this.radiusX || 200,
        height: 2 * this.radiusY || 200
      });
    };

    Spark.prototype.animate = function() {
      var $el, height, i, x, _i, _len, _ref, _results;
      _ref = this.$els;
      _results = [];
      for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
        $el = _ref[i];
        height = 50 + this.rand(0, 50);
        x = motion.helpers.rand(-30, 30);
        _results.push($el.velocity('stop').velocity({
          top: 0,
          height: height,
          translateX: x,
          rotateZ: x,
          opacity: 0
        }, {
          delay: i * this.rand(50, 150) + this.rand(50, 100)
        }));
      }
      return _results;
    };

    Spark.prototype.reset = function() {};

    return Spark;

  })(motion.Bit);

  setTimeout(function() {
    return new Spark;
  }, 500);

}).call(this);
