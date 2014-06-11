(function() {
  var Burst, burst1, burst2, burst3, size,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Burst = (function(_super) {
    __extends(Burst, _super);

    function Burst() {
      return Burst.__super__.constructor.apply(this, arguments);
    }

    Burst.prototype.type = 'burst';

    Burst.prototype.init = function() {
      this.setRotation(1);
      this.add2Dom();
      return this;
    };

    Burst.prototype.vars = function() {
      Burst.__super__.vars.apply(this, arguments);
      if (this.radius == null) {
        this.radius = this.o.radius || 80;
      }
      this.cnt = this.o.cnt - 1;
      this.step = (2 * Math.PI) / (this.cnt + 1);
      this.rotateStep = 360 / (this.cnt + 1);
      this.cloneBits({
        "class": 'bit',
        cnt: this.cnt
      });
      return this.$el.css({
        width: 2 * this.o.radius || 200,
        height: 2 * this.o.radius || 200
      });
    };

    Burst.prototype.setRotation = function(duration) {
      var $el, angle, centerX, centerY, i, left, rotateAngle, top, _i, _len, _ref, _results;
      if (duration == null) {
        duration = 400;
      }
      if (this.o.left) {
        this.$el.css({
          left: this.o.left - this.radius
        });
      }
      if (this.o.top) {
        this.$el.css({
          top: this.o.top - this.radius
        });
      }
      rotateAngle = 0;
      angle = 0;
      centerX = 0;
      centerY = 0;
      _ref = this.$els;
      _results = [];
      for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
        $el = _ref[i];
        left = parseInt(centerX + (Math.cos(angle) * this.radius), 10);
        top = parseInt(centerY + (Math.sin(angle) * this.radius), 10);
        $el.velocity({
          translateX: left / 6,
          translateY: top / 6,
          rotateZ: rotateAngle + 90
        }, {
          duration: duration
        });
        rotateAngle += this.rotateStep;
        _results.push(angle += this.step);
      }
      return _results;
    };

    Burst.prototype.animate = function(o) {
      var $el, angle, centerX, centerY, i, left, rotateAngle, size, top, _i, _len, _ref;
      this.reset();
      if (o != null ? o.left : void 0) {
        this.$el.css({
          left: o.left - this.radius
        });
      }
      if (o != null ? o.top : void 0) {
        this.$el.css({
          top: o.top - this.radius
        });
      }
      rotateAngle = 0;
      angle = 0;
      centerX = 0;
      centerY = 0;
      _ref = this.$els;
      for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
        $el = _ref[i];
        left = centerX + (Math.cos(angle) * this.radius);
        top = centerY - (this.radius / 2) + (Math.sin(angle) * this.radius);
        size = this.radius;
        if (left < 0) {
          left -= 1;
        } else {
          left += 1;
        }
        if (top < 0) {
          top -= 1;
        } else {
          top += 1;
        }
        $el.velocity({
          translateX: 1 * left,
          translateY: 1 * top,
          height: size,
          marginTop: -(size / 2)
        }, {
          duration: 400
        });
        rotateAngle += this.rotateStep;
        angle += this.step;
      }
      if ((o != null ? o.rotation : void 0) || (o != null ? o.rotationDuration : void 0)) {
        return this.$el.velocity({
          rotateZ: (o != null ? o.rotation : void 0) || 90
        }, {
          duration: (o != null ? o.rotationDuration : void 0) || 1200
        });
      }
    };

    Burst.prototype.reset = function() {
      var $el, i, _i, _len, _ref, _results;
      this.$el.velocity({
        rotateZ: 0
      }, {
        duration: 1
      });
      _ref = this.$els;
      _results = [];
      for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
        $el = _ref[i];
        _results.push($el.velocity({
          translateY: 0,
          translateX: 0,
          marginTop: 0,
          height: 0
        }, {
          duration: 1
        }));
      }
      return _results;
    };

    return Burst;

  })(motion.Bit);

  window.motion.Burst = Burst;

  size = 30;

  burst1 = new Burst({
    cnt: 5,
    radius: size + motion.helpers.rand(-(size / 2), size / 2),
    left: 500,
    top: 500
  });

  size = 40;

  burst2 = new Burst({
    cnt: 5,
    radius: size + motion.helpers.rand(-(size / 2), size / 2)
  });

  size = 20;

  burst3 = new Burst({
    cnt: 5,
    radius: size + motion.helpers.rand(-(size / 2), size / 2)
  });

  setTimeout((function(_this) {
    return function() {
      burst1.animate();
      setTimeout(function() {
        return burst2.animate({
          left: 540,
          top: 520
        });
      }, 200);
      return setTimeout(function() {
        return burst3.animate({
          left: 520,
          top: 480
        });
      }, 300);
    };
  })(this), 2000);

}).call(this);
