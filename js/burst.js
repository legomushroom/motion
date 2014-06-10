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
      this.cnt = this.o.cnt;
      this.cloneBits({
        "class": 'center wrap',
        cnt: this.cnt,
        nest: [
          {
            "class": 'center bit'
          }
        ]
      });
      this.setRotation();
      this.add2Dom();
      return this;
    };

    Burst.prototype.setRotation = function(reset) {
      var $el, angle, centerX, centerY, i, left, rotateAngle, rotateStep, step, top, _i, _j, _len, _len1, _ref, _ref1, _results;
      step = (2 * Math.PI) / this.cnt;
      rotateStep = 360 / this.cnt;
      rotateAngle = 0;
      angle = 0;
      centerX = 0;
      centerY = 0;
      _ref = this.$nests[0];
      for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
        $el = _ref[i];
        left = parseInt(centerX + (Math.cos(angle) * this.radius), 10);
        top = parseInt(centerY + (Math.sin(angle) * this.radius), 10);
        $el.velocity({
          rotateZ: rotateAngle + 90,
          opacity: 0,
          height: 40
        }, {
          duration: 1
        });
        rotateAngle += rotateStep;
        angle += step;
      }
      step = (2 * Math.PI) / this.cnt;
      rotateStep = 360 / this.cnt;
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
          translateX: left / 2,
          translateY: top / 2
        }, {
          duration: reset ? 1 : 400
        });
        rotateAngle += rotateStep;
        _results.push(angle += step);
      }
      return _results;
    };

    Burst.prototype.animate = function() {
      var $el, angle, centerX, centerY, i, left, rotateAngle, rotateStep, step, top, _i, _j, _len, _len1, _ref, _ref1;
      this.reset();
      step = (2 * Math.PI) / this.cnt;
      rotateStep = 360 / this.cnt;
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
          translateX: left,
          translateY: top
        }, {
          duration: 400
        });
        rotateAngle += rotateStep;
        angle += step;
      }
      _ref1 = this.$nests[0];
      for (i = _j = 0, _len1 = _ref1.length; _j < _len1; i = ++_j) {
        $el = _ref1[i];
        $el.velocity({
          height: 0,
          opacity: 100
        }, {
          duration: 400,
          delay: 100
        });
      }
      return this.$el.velocity({
        translateY: 30
      }, {
        delay: 100,
        duration: 400
      });
    };

    Burst.prototype.reset = function() {
      this.setRotation(true);
      return this.$el.velocity({
        translateY: 0
      }, {
        duration: 1
      });
    };

    return Burst;

  })(motion.Bit);

  window.motion.Burst = Burst;

  burst = new Burst({
    cnt: 4
  });

  setInterval((function(_this) {
    return function() {
      return burst.animate();
    };
  })(this), 1000);

}).call(this);
