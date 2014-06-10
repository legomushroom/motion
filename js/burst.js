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
      if (this.radius == null) {
        this.radius = this.o.radius || 80;
      }
      this.cnt = this.o.cnt - 1;
      this.cloneBits({
        "class": 'bit',
        cnt: this.cnt
      });
      this.setRotation(1);
      this.add2Dom();
      return this;
    };

    Burst.prototype.setRotation = function(duration) {
      var $el, angle, centerX, centerY, i, left, rotateAngle, rotateStep, step, top, _i, _j, _len, _len1, _ref, _ref1, _results;
      if (duration == null) {
        duration = 400;
      }
      step = (2 * Math.PI) / (this.cnt + 1);
      rotateStep = 360 / (this.cnt + 1);
      rotateAngle = 0;
      angle = 0;
      centerX = 0;
      centerY = 0;
      _ref = this.$els;
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
        rotateAngle += rotateStep;
        angle += step;
      }
      rotateAngle = 0;
      angle = 0;
      centerX = 0;
      centerY = 0;
      _ref1 = this.$els;
      _results = [];
      for (i = _j = 0, _len1 = _ref1.length; _j < _len1; i = ++_j) {
        $el = _ref1[i];
        left = parseInt(centerX + (Math.cos(angle) * this.radius), 10);
        top = parseInt(centerY + (Math.sin(angle) * this.radius), 10);
        $el.velocity({
          translateX: 1.5 * left,
          translateY: 1.5 * top
        }, {
          duration: 1400
        });
        rotateAngle += rotateStep;
        _results.push(angle += step);
      }
      return _results;
    };

    return Burst;

  })(motion.Bit);

  window.motion.Burst = Burst;

  burst = new Burst({
    cnt: 5
  });

}).call(this);
