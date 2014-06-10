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
        translateX:  left/5
        translateY:  top/5
        rotateZ: rotateAngle+90
      ,
        duration: duration

      rotateAngle += @rotateStep
      angle += @step

  animate:->
    rotateAngle = 0
    angle = 0
    centerX = 0
    centerY = 0
    for $el, i in @$els
      left  = parseInt(centerX+(Math.cos(angle)*(@radius)),10)
      top   = parseInt(centerY+(Math.sin(angle)*(@radius)),10)
      
      size = 10
      if left < 0 then left -= size
      else left += size
      if top < 0 then top -= size
      else top += size
      $el.velocity
        translateX:  left
        translateY:  top
        height: 140
        marginTop: -70
      ,
        duration: 500

      rotateAngle += @rotateStep
      angle += @step

window.motion.Burst = Burst

burst = new Burst
  cnt: 5
  radius: 100

setInterval =>
  burst.animate()
, 1000


# $(window).on 'click', (e)->
#   console.log e.pageX
#   console.log e.pageY
