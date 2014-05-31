
class Slice extends motion.Bit
  type: 'slice'
  defaultHeight: 4
  init:->
    @vars()
    @createBit()
    @add2Dom()
  createBit:->
    @$bit = $ '<div class="bit">'
    @$el.append @$bit

  calcPosition:->
    toX   = @o.to[0]   or @o.to['x']   or 0
    fromX = @o.from[0] or @o.from['x'] or 0
    x = Math.abs toX - fromX

    toY    = @o.to[1]   or @o.to['y']   or 0
    fromY  = @o.from[1] or @o.from['y'] or 0
    y = Math.abs toY - fromY
    width = Math.sqrt x*x + y*y

    angle = Math.atan(y/x)*(180/Math.PI)
    if toX < fromX then angle = 180 - angle
    if toY < fromY then angle = - angle

    @$el.css
      'transform-origin': 'left center'
      'transform':        "rotate(#{angle}deg)"
      'width':  width
      'height': 1
      'position': 'absolute'
      'top':  fromY
      'left': fromX

  animate:(@o={})->
    @calcPosition()
    @needReset and @reset()
    @needReset = true
    @duration = @o.duration or 300
    @$bit.velocity(
        left: '50%'
        opacity: 100
      ,
        duration: @duration
        easeing: 'easeOutExpo'
    )

    @$el.velocity(
        opacity: 0
      ,
        duration: @duration/2
        delay: @duration/2
    )

  reset:->
    @$bit.velocity
        left: '-200%'
        opacity: 0
      ,
        duration: 1

    @$el.velocity
        opacity: 1
      ,
        duration: 1


window.Slice = Slice

slice = new Slice

setTimeout =>
  slice.animate
    from: [100,100]
    to:   [500,500]
, 1000

# timeout = null
# click = true
# click1 = null
# click2 = null
# $(window).on 'click', (e)->
#   if click
#     click1 = [e.pageX, e.pageY]
#     click2 = null
#     click = false
#   else
#     click2 = [e.pageX, e.pageY]
#     click = true

#   if click1 and click2
#     slice.animate
#       from: click1
#       to:   click2

#   clearTimeout timeout
#   timeout = setTimeout ->
#     click = true
#     click1 = null
#     click2 = null
#   , 1000











