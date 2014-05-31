class Burst extends motion.Bit

  type: 'burst'

  init:->
    @radius ?= @o.radius or 80
    @cnt     = @radius/9
    @cloneBits
      class: 'center wrap'
      cnt: @cnt
      nest: [
        class: 'center bit'
      ]
    @setRotation()
    @add2Dom()
    @

  setRotation:(reset)->
    step = (2*Math.PI)/@cnt
    rotateStep = 360/@cnt
    rotateAngle = 0
    angle = 0
    centerX = 0
    centerY = 0
    for $el, i in @$nests[0]
      left  = parseInt(centerX+(Math.cos(angle)*(@radius)),10)
      top   = parseInt(centerY+(Math.sin(angle)*(@radius)),10)
      $el.velocity
          rotateZ: rotateAngle+90
          opacity: 0
          height: 40
        ,
          duration: 1

      rotateAngle += rotateStep
      angle += step

    step = (2*Math.PI)/@cnt
    rotateStep = 360/@cnt
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
        ,
          duration: if reset then 1 else 400

      rotateAngle += rotateStep
      angle += step

  animate:->
    @reset()
    step = (2*Math.PI)/@cnt
    rotateStep = 360/@cnt
    rotateAngle = 0
    angle = 0
    centerX = 0
    centerY = 0
    for $el, i in @$els
      left  = parseInt(centerX+(Math.cos(angle)*(@radius)),10)
      top   = parseInt(centerY+(Math.sin(angle)*(@radius)),10)
      $el.velocity
          translateX:  left
          translateY:  top
        ,
          duration: 400
          # complete:=>

      rotateAngle += rotateStep
      angle += step

    for $el, i in @$nests[0]
      $el.velocity
        height: 0
        opacity: 100
      ,
        duration: 400
        delay: 100

    @$el.velocity
        translateY: 30
      ,
        delay: 100
        duration: 400

  reset:->
    @setRotation(true)
    @$el.velocity
        translateY: 0
      ,
        duration: 1


window.motion.Burst = Burst

# burst = new Burst
# setInterval =>
#   burst.animate()
# , 2000


# $(window).on 'click', (e)->
#   console.log e.pageX
#   console.log e.pageY
