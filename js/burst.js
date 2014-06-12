(function() {
  var Burst, burst0, size,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Burst = (function(_super) {
    __extends(Burst, _super);

    function Burst() {
      return Burst.__super__.constructor.apply(this, arguments);
    }

    Burst.prototype.type = 'burst';

    Burst.prototype.init = function() {
      this.add2Dom();
      return this;
    };

    Burst.prototype.vars = function() {
      Burst.__super__.vars.apply(this, arguments);
      this.cloneBits({
        "class": 'bit',
        cnt: this.cnt
      });
      return this.$el.css({
        width: 2 * this.o.radius || 200,
        height: 2 * this.o.radius || 200
      });
    };

    Burst.prototype.animate = function(o) {
      var $el, angle, centerX, centerY, i, left, rotateAngle, size, top, _i, _len, _ref;
      console.log(o.radius);
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
          left -= 2;
        } else {
          left += 2;
        }
        if (top < 0) {
          top -= 2;
        } else {
          top += 2;
        }
        $el.velocity({
          translateX: 1 * left,
          translateY: 1 * top,
          height: size,
          marginTop: -(size / 2)
        }, {
          duration: 300,
          delay: (o != null ? o.delay : void 0) || 0
        });
        rotateAngle += this.rotateStep;
        angle += this.step;
      }
      if ((o != null ? o.rotation : void 0) || (o != null ? o.rotationDuration : void 0)) {
        return this.$el.velocity({
          rotateZ: (o != null ? o.rotation : void 0) || 90
        }, {
          duration: (o != null ? o.rotationDuration : void 0) || 900
        });
      }
    };

    Burst.prototype.reset = function() {
      var $el, angle, centerX, centerY, i, left, rotateAngle, top, _i, _len, _ref, _results;
      if (this.radius == null) {
        this.radius = this.o.radius || 80;
      }
      this.cnt = this.o.cnt - 1;
      this.step = (2 * Math.PI) / (this.cnt + 1);
      this.rotateStep = 360 / (this.cnt + 1);
      this.$el.velocity('stop').velocity({
        rotateZ: this.o.initialRotation || 0
      }, {
        duration: 1
      });
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
        $el.velocity('stop').velocity({
          translateX: left / 2,
          translateY: top / 2,
          marginTop: 0,
          rotateZ: rotateAngle + 90,
          height: 0
        }, {
          duration: 1
        });
        rotateAngle += this.rotateStep;
        _results.push(angle += this.step);
      }
      return _results;
    };

    return Burst;

  })(motion.Bit);

  window.motion.Burst = Burst;

  size = 80;

  burst0 = new Burst({
    cnt: 5,
    radius: size,
    left: 500,
    top: 500,
    initialRotation: 45
  });

  $(window).on('click', function(e) {
    return burst0.animate({
      left: e.pageX,
      top: e.pageY
    });
  });

}).call(this);
