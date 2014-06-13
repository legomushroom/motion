(function() {
  var Bubble, bubble0, burst0, size,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Bubble = (function(_super) {
    __extends(Bubble, _super);

    function Bubble() {
      return Bubble.__super__.constructor.apply(this, arguments);
    }

    Bubble.prototype.type = 'bubble';

    Bubble.prototype.init = function() {
      this.add2Dom();
      return this;
    };

    Bubble.prototype.vars = function() {
      var _base;
      Bubble.__super__.vars.apply(this, arguments);
      this.radius = this.o.radius || 80;
      this.radiusX = this.o.radiusX || this.radius;
      this.radiusY = this.o.radiusY || this.radius;
      if ((_base = this.o).rate == null) {
        _base.rate = .5;
      }
      this.rate = this.o.rate;
      if (parseInt(this.rate.toFixed(0), 10) === 0) {
        this.rate += .000001;
      }
      this.rate = this.rate || .5;
      this.cloneBits({
        "class": 'bit',
        cnt: 1
      });
      this.bit = this.$els[0];
      return this.$el.css({
        width: 2 * this.radiusX || 200,
        height: 2 * this.radiusY || 200
      });
    };

    Bubble.prototype.animate = function(o) {
      if (o.left) {
        this.$el.css({
          left: o.left - this.radius
        });
      }
      if (o.top) {
        this.$el.css({
          top: o.top - this.radius
        });
      }
      this.reset();
      return this.bit.velocity({
        borderWidth: 0,
        width: '100%',
        height: '100%'
      }, {
        duration: this.o.duration,
        delay: this.o.delay
      });
    };

    Bubble.prototype.reset = function() {
      return this.bit.velocity('stop').velocity({
        borderWidth: (this.radius / 2) * this.rate,
        width: this.radius * this.rate,
        height: this.radius * this.rate
      }, {
        duration: 1
      });
    };

    return Bubble;

  })(motion.Bit);

  window.motion.Bubble = Bubble;

  size = 20;

  bubble0 = new Bubble({
    radius: size,
    duration: 300
  });

  size = 40;

  burst0 = new window.motion.Burst({
    cnt: 5,
    radius: size,
    left: 500,
    top: 500
  });

  $(window).on('click', function(e) {
    bubble0.animate({
      left: e.pageX,
      top: e.pageY
    });
    return setTimeout((function(_this) {
      return function() {
        return burst0.animate({
          left: e.pageX,
          top: e.pageY
        });
      };
    })(this), 200);
  });

}).call(this);
