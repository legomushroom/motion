(function() {
  var Slice, slice,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Slice = (function(_super) {
    __extends(Slice, _super);

    function Slice() {
      return Slice.__super__.constructor.apply(this, arguments);
    }

    Slice.prototype.type = 'slice';

    Slice.prototype.defaultHeight = 4;

    Slice.prototype.init = function() {
      this.vars();
      this.createBit();
      return this.add2Dom();
    };

    Slice.prototype.createBit = function() {
      this.$bit = $('<div class="bit">');
      return this.$el.append(this.$bit);
    };

    Slice.prototype.calcPosition = function() {
      var angle, fromX, fromY, toX, toY, width, x, y;
      toX = this.o.to[0] || this.o.to['x'] || 0;
      fromX = this.o.from[0] || this.o.from['x'] || 0;
      x = Math.abs(toX - fromX);
      toY = this.o.to[1] || this.o.to['y'] || 0;
      fromY = this.o.from[1] || this.o.from['y'] || 0;
      y = Math.abs(toY - fromY);
      width = Math.sqrt(x * x + y * y);
      angle = Math.atan(y / x) * (180 / Math.PI);
      if (toX < fromX) {
        angle = 180 - angle;
      }
      if (toY < fromY) {
        angle = -angle;
      }
      return this.$el.css({
        'transform-origin': 'left center',
        'transform': "rotate(" + angle + "deg)",
        'width': width,
        'height': 1,
        'position': 'absolute',
        'top': fromY,
        'left': fromX
      });
    };

    Slice.prototype.animate = function(o) {
      this.o = o != null ? o : {};
      this.calcPosition();
      this.needReset && this.reset();
      this.needReset = true;
      this.duration = this.o.duration || 300;
      this.$bit.velocity({
        left: '50%',
        opacity: 100
      }, {
        duration: this.duration,
        easeing: 'easeOutExpo'
      });
      return this.$el.velocity({
        opacity: 0
      }, {
        duration: this.duration / 2,
        delay: this.duration / 2
      });
    };

    Slice.prototype.reset = function() {
      this.$bit.velocity({
        left: '-200%',
        opacity: 0
      }, {
        duration: 1
      });
      return this.$el.velocity({
        opacity: 1
      }, {
        duration: 1
      });
    };

    return Slice;

  })(motion.Bit);

  window.Slice = Slice;

  slice = new Slice;

}).call(this);
