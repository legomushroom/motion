class Burst extends motion.Bit

  type: 'burst'

  init:()->
    @setRotation(1)
    @add2Dom()
    @
  
  vars:->
    super
    @radius ?= @o.radius or 80
    @cnt     = @o.cnt-1
    @step = (2*Math.PI)/(@cnt+1)
    @rotateStep = 360/(@cnt+1)
    @cloneBits
      class: 'bit'
      cnt: @cnt

    @$el.css
      width:  2*@o.radius or 200
      height: 2*@o.radius or 200

  setRotation:(duration=400)->
    if @o.left
      @$el.css
        left: @o.left - @radius
    if @o.top
      @$el.css
        top: @o.top - @radius

    rotateAngle = 0
    angle = 0
    centerX = 0
    centerY = 0
    for $el, i in @$els
      left  = parseInt(centerX+(Math.cos(angle)*(@radius)),10)
      top   = parseInt(centerY+(Math.sin(angle)*(@radius)),10)
      $el.velocity
        translateX:  left/6
        translateY:  top/6
        rotateZ: rotateAngle+90
      ,
        duration: duration

      rotateAngle += @rotateStep
      angle += @step

  animate:(o)->
    @reset()
    if o?.left
      @$el.css
        left: o.left - @radius
    if o?.top
      @$el.css
        top: o.top - @radius

    rotateAngle = 0
    angle = 0
    centerX = 0
    centerY = 0
    for $el, i in @$els
      left  = centerX+(Math.cos(angle)*(@radius))
      top   = centerY-(@radius/2)+(Math.sin(angle)*(@radius))
      
      size = @radius
      if left < 0 then left -= 1
      else left += 1
      if top < 0 then top -= 1
      else top += 1
      $el.velocity
        translateX:  1*left
        translateY:  1*top
        height: size
        marginTop: -(size/2)
      ,
        duration: 400

      rotateAngle += @rotateStep
      angle += @step

    if o?.rotation or o?.rotationDuration
      @$el.velocity
          rotateZ:  o?.rotation or 90
        ,
          duration: o?.rotationDuration or 1200

  reset:->
    @$el.velocity
      rotateZ: 0
    ,
      duration: 1
    for $el, i in @$els
      $el.velocity
        translateY: 0
        translateX: 0
        marginTop:  0
        height:     0
      ,
        duration: 1

window.motion.Burst = Burst

size = 30
burst1 = new Burst
  cnt: 5
  radius: size + motion.helpers.rand(-(size/2),(size/2))
  left: 500
  top:  500

size = 40
burst2 = new Burst
  cnt: 5
  radius: size + motion.helpers.rand(-(size/2),(size/2))

size = 20
burst3 = new Burst
  cnt: 5
  radius: size + motion.helpers.rand(-(size/2),(size/2))

setTimeout =>
  burst1.animate()

  setTimeout =>
    burst2.animate
      left: 540
      top:  520
      # rotation: 90
  , 200
  setTimeout =>
    burst3.animate
      left: 520
      top:  480
      # rotation: 120
  , 300
, 2000

# setInterval ->
#   burst.animate
#     left: 200
#     top: 200
# , 2000


# $(window).on 'click', (e)->
#   burst.animate
#     left: e.pageX
#     top:  e.pageY
#     rotation: 90
