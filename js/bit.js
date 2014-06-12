(function() {
  var Bit;

  Bit = (function() {
    Bit.prototype.defaultHeight = 0;

    Bit.prototype.defaultWidth = 0;

    function Bit(o) {
      this.o = o != null ? o : {};
      this.vars();
      if (typeof this.init === "function") {
        this.init();
      }
    }

    Bit.prototype.vars = function() {
      this.$el = $("<div class='motion-effect motion-effect--" + (this.type || 'null') + "' />");
      this.$el.css({
        overflow: 'hidden',
        width: this.o.width || this.defaultWidth,
        height: this.o.height || this.defaultHeight
      });
      this.$els = [];
      return this.$nests = [];
    };

    Bit.prototype.cloneBits = function(o) {
      var $el, $nest, $proto, i, _base, _i, _j, _name, _ref, _ref1, _results;
      if (o == null) {
        o = {};
      }
      $proto = o.$proto || $('<div />');
      _results = [];
      for (i = _i = 0, _ref = o.cnt || 10; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
        $el = $proto.clone();
        o["class"] && $el.addClass("" + (o["class"] || ''));
        o.css && $el.css(o.css);
        if (o.nest) {
          for (i = _j = 2, _ref1 = 2 + o.nest.length; 2 <= _ref1 ? _j < _ref1 : _j > _ref1; i = 2 <= _ref1 ? ++_j : --_j) {
            $nest = $("<div class='bit nest--" + i + " " + o.nest[i - 2]["class"] + "' />");
            if ((_base = this.$nests)[_name = i - 2] == null) {
              _base[_name] = [];
            }
            this.$nests[i - 2].push($nest);
            $el.append($nest);
          }
        }
        this.$els.push($el);
        this.$el.append($el);
        _results.push(this.$els);
      }
      return _results;
    };

    Bit.prototype.add2Dom = function() {
      return $(document.body).append(this.$el);
    };

    Bit.prototype.destroy = function() {
      return $(document.body).remove(this.$el);
    };

    return Bit;

  })();

  window.motion.Bit = Bit;

}).call(this);
