# TODO
# normalize init and animate options
# change !property to property?
# get rid of wrapper
# add bits height option


class Burst extends motion.Bit

  type: 'burst'

  init:()-> @add2Dom(); @

  vars:->
    super
    @radius ?= @o.radius or 80
    @radiusX ?= @o.radiusX or @radius
    @radiusY ?= @o.radiusY or @radius
    @cnt     = @o.cnt-1
    
    @degree = @o.degree % 360
    @degreeRate = @degree/360

    @step = (@degreeRate*2*Math.PI)/(@cnt+1)
    @rotateStep = @degreeRate*360/(@cnt+1)
    

    @cloneBits
      class: 'bit'
      cnt: @cnt
    @$el.css
      width:  2*@o.radiusX or 200
      height: 2*@o.radiusY or 200

    @$el.velocity('stop')
      .velocity
        rotateZ: @o.initialRotation or 0
      ,
        duration: 1


  animate:(o)->
    console.log o.radius
    @reset()

    if o?.left
      @$el.css
        left: o.left - @radiusX
    if o?.top
      @$el.css
        top: o.top - @radiusY

    rotateAngle = 0
    angle = 0
    centerX = 0
    centerY = 0
    for $el, i in @$els
      left  = centerX+(Math.cos(angle)*(@radiusX))
      top   = centerY-(@radius/2)+(Math.sin(angle)*(@radiusY))
      
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
      left  = parseInt(centerX+(Math.cos(angle)*(@radiusX)),10)
      top   = parseInt(centerY+(Math.sin(angle)*(@radiusY)),10)
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
  initialRotation: -180
  degree: 220

$(window).on 'click', (e)->
  burst0.animate
    left: e.pageX
    top:  e.pageY

