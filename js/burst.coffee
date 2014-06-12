# TODO
# normalize init and animate options
# change !property to property?
# get rid of wrapper
# add bits height option


class Burst extends motion.Bit

  type: 'burst'

  init:()->
    @add2Dom(); @

    
  
  vars:->
    super
    @radius ?= @o.radius or 80
    @cnt     = @o.cnt-1
    @step = (1*Math.PI)/(@cnt+1)
    @rotateStep = 180/(@cnt+1)

    @cloneBits
      class: 'bit'
      cnt: @cnt
    @$el.css
      width:  2*@o.radius or 200
      height: 2*@o.radius or 200

    @$el.velocity('stop')
      .velocity
        rotateZ: @o.initialRotation or 0
      ,
        duration: 1

    rotateAngle = 0
    angle = 0
    centerX = 0
    centerY = 0
    for $el, i in @$els
      left  = parseInt(centerX+(Math.cos(angle)*(@radius)),10)
      top   = parseInt(centerY+(Math.sin(angle)*(@radius)),10)
      $el.velocity('stop')
        .velocity
          translateX:  left/2
          translateY:  top/2
          marginTop: 0
          rotateZ: rotateAngle+90
          height: 20
        ,
          duration: 1
      rotateAngle += @rotateStep
      angle += @step




  animate:(o)->
    console.log o.radius
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
      if left < 0 then left -= 2
      else left += 2
      if top < 0 then top -= 2
      else top += 2
      $el.velocity
        translateX:  1*left
        translateY:  1*top
        height: size
        marginTop: -(size/2)
      ,
        duration: 300
        delay: o?.delay or 0

      rotateAngle += @rotateStep
      angle += @step

    if o?.rotation or o?.rotationDuration
      @$el.velocity
          rotateZ:  o?.rotation or 90
        ,
          duration: o?.rotationDuration or 900

  reset:->
    

    # @$el.css
    #   transform: "translateX(#{@o.left - @radius}px) translateY(#{@o.top - @radius}px)" 

    @$el.velocity('stop')
      .velocity
        rotateZ: @o.initialRotation or 0
      ,
        duration: 1

    rotateAngle = 0
    angle = 0
    centerX = 0
    centerY = 0
    for $el, i in @$els
      left  = parseInt(centerX+(Math.cos(angle)*(@radius)),10)
      top   = parseInt(centerY+(Math.sin(angle)*(@radius)),10)
      $el.velocity('stop')
        .velocity
          translateX:  left/2
          translateY:  top/2
          marginTop: 0
          rotateZ: rotateAngle+90
          height: 0
        ,
          duration: 1
      rotateAngle += @rotateStep
      angle += @step

window.motion.Burst = Burst

size = 80
burst0 = new Burst
  cnt: 5
  radius: size
  left: 500
  top:  500
  initialRotation: 45

$(window).on 'click', (e)->
  burst0.animate
    left: e.pageX
    top:  e.pageY

