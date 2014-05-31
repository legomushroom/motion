class Bit
  defaultHeight: 200
  defaultWidth:  200
  constructor:(@o={})->
    @vars()
    @init?()

  vars:->
    @$el  = $ "<div class='motion-effect motion-effect--#{@type or 'null'}' />"
    @$el.css
      overflow: 'hidden'
      width:  @o.width  or @defaultWidth
      height: @o.height or @defaultHeight
    @$els   = []
    @$nests = []

  cloneBits:(o={})->
    $proto = !o.$proto and $('<div>')
    for i in [0..o.cnt or 10]
      $el = $proto.clone()
      o.class and $el.addClass("#{o.class or ''}")
      o.css and $el.css o.css
      for i in [2...2+o.nest.length]
        $nest = $("<div class='bit nest--#{i} #{o.nest[i-2].class}' />")
        @$nests[i-2] ?= []
        @$nests[i-2].push $nest
        $el.append $nest
      @$els.push $el
      @$el.append $el

  add2Dom:-> $(document.body).append @$el
  destroy:-> $(document.body).remove @$el


window.motion.Bit = Bit