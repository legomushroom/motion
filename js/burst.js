(function() {
  var Burst, burst,
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
          translateX: left / 2,
          translateY: top / 2,
          rotateZ: rotateAngle + 90
        }, {
          duration: duration
        });
        rotateAngle += this.rotateStep;
        _results.push(angle += this.step);
      }
      return _results;
    };

    Burst.prototype.animate = function(position) {
      var $el, angle, centerX, centerY, i, left, rotateAngle, size, top, _i, _len, _ref;
      rotateAngle = 0;
      angle = 0;
      centerX = 0;
      centerY = 0;
      _ref = this.$els;
      for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
        $el = _ref[i];
        left = parseInt(centerX + (Math.cos(angle) * this.radius), 10);
        top = parseInt(centerY - (this.radius / 2) + (Math.sin(angle) * this.radius), 10);
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
          duration: 500
        });
        rotateAngle += this.rotateStep;
        angle += this.step;
      }
      return this.$el.velocity({
        rotateZ: 90
      }, {
        duration: 1400
      });
    };

    return Burst;

  })(motion.Bit);

  window.motion.Burst = Burst;

  burst = new Burst({
    cnt: 10,
    radius: 50
  });

  setInterval(function() {
    return burst.animate({
      x: 200,
      y: 200
    });
  }, 1000);

}).call(this);
