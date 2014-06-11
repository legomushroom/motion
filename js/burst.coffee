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
    rotateAngle = 0
    angle = 0
    centerX = 0
    centerY = 0
    for $el, i in @$els
      left  = parseInt(centerX+(Math.cos(angle)*(@radius)),10)
      top   = parseInt(centerY+(Math.sin(angle)*(@radius)),10)
      $el.velocity
        translateX:  left/2
        translateY:  top/2
        rotateZ: rotateAngle+90
      ,
        duration: duration

      rotateAngle += @rotateStep
      angle += @step

  animate:(position)->
    rotateAngle = 0
    angle = 0
    centerX = 0
    centerY = 0
    for $el, i in @$els
      left  = parseInt(centerX+(Math.cos(angle)*(@radius)),10)
      top   = parseInt(centerY-(@radius/2)+(Math.sin(angle)*(@radius)),10)
      
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
        duration: 500

      rotateAngle += @rotateStep
      angle += @step

    @$el.velocity
        rotateZ: 90
      ,
        duration: 1400

window.motion.Burst = Burst

burst = new Burst
  cnt: 10
  radius: 50

setInterval ->
  burst.animate
    x: 200
    y: 200
, 1000


# $(window).on 'click', (e)->
#   console.log e.pageX
#   console.log e.pageY
