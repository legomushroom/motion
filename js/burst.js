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
      var _base;
      Burst.__super__.vars.apply(this, arguments);
      this.radius = this.o.radius || 80;
      this.radiusX = this.o.radiusX || this.radius;
      this.radiusY = this.o.radiusY || this.radius;
      this.cnt = this.o.cnt;
      if ((_base = this.o).rate == null) {
        _base.rate = .5;
      }
      this.rate = this.o.rate;
      if (parseInt(this.rate.toFixed(0), 10) === 0) {
        this.rate += .000001;
      }
      this.rate = this.rate || .5;
      this.degree = this.o.degree % 360 || 360;
      this.degreeRate = this.degree / 360;
      this.step = (this.degreeRate * 2 * Math.PI) / this.cnt;
      this.rotateStep = this.degreeRate * 360 / this.cnt;
      this.cloneBits({
        "class": 'bit',
        cnt: this.cnt
      });
      this.$el.css({
        width: 2 * this.radiusX || 200,
        height: 2 * this.radiusY || 200
      });
      return this.$el.velocity('stop').velocity({
        rotateZ: this.o.initialRotation || 0
      }, {
        duration: 1
      });
    };

    Burst.prototype.animate = function(o) {
      var $el, angle, centerX, centerY, i, left, rotateAngle, size, top, _i, _len, _ref;
      this.reset();
      if (o != null ? o.left : void 0) {
        this.$el.css({
          left: o.left - this.radiusX
        });
      }
      if (o != null ? o.top : void 0) {
        this.$el.css({
          top: o.top - this.radiusY
        });
      }
      rotateAngle = 0;
      angle = 0;
      centerX = 0;
      centerY = 0;
      _ref = this.$els;
      for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
        $el = _ref[i];
        left = centerX + (Math.cos(angle) * this.radiusX);
        top = centerY - (this.radius / 2) + (Math.sin(angle) * this.radiusY);
        size = this.height || this.radius;
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
          delay: (o != null ? o.delay : void 0) || 0,
          complete: function() {
            return this.$el.hide();
          }
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
        left = parseInt(centerX + (Math.cos(angle) * this.radiusX), 10);
        top = parseInt(centerY + (Math.sin(angle) * this.radiusY), 10);
        $el.velocity('stop').velocity({
          translateX: left * this.rate,
          translateY: top * this.rate,
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

  size = 100;

  burst0 = new Burst({
    cnt: 5,
    radius: size,
    left: 500,
    top: 500,
    initialRotation: -180,
    rate: .75,
    degree: 220
  });

  $(window).on('click', function(e) {
    return burst0.animate({
      left: e.pageX,
      top: e.pageY
    });
  });

}).call(this);
