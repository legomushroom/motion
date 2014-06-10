class Burst extends motion.Bit

  type: 'burst'

  init:()->
    @radius ?= @o.radius or 80
    @cnt     = @o.cnt-1
    @cloneBits
      class: 'bit'
      cnt: @cnt

    @setRotation(1)
    @add2Dom()
    @

  setRotation:(duration=400)->
    step = (2*Math.PI)/(@cnt+1)
    rotateStep = 360/(@cnt+1)
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

      rotateAngle += rotateStep
      angle += step
    rotateAngle = 0
    angle = 0
    centerX = 0
    centerY = 0
    for $el, i in @$els
      left  = parseInt(centerX+(Math.cos(angle)*(@radius)),10)
      top   = parseInt(centerY+(Math.sin(angle)*(@radius)),10)
      $el.velocity
        translateX:  1.5*left
        translateY:  1.5*top
      ,
        duration: 1400

      rotateAngle += rotateStep
      angle += step

window.motion.Burst = Burst

burst = new Burst
  cnt: 5

# setInterval =>
#   burst.animate()
# , 1000


# $(window).on 'click', (e)->
#   console.log e.pageX
#   console.log e.pageY
