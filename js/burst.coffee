# TODO
# normalize init and animate options
# change !property to property?
# fix cnt


class Burst extends motion.Bit

  type: 'burst'

  init:()-> @add2Dom(); @

  vars:->
    super
    @radius  = @o.radius or 80
    @radiusX = @o.radiusX or @radius
    @radiusY = @o.radiusY or @radius
    @cnt     = @o.cnt
    @o.rate ?= .5
    @rate    = @o.rate
    if parseInt(@rate.toFixed(0),10) is 0 then @rate += .000001
    @rate    = @rate or .5


    @degree = @o.degree % 360 or 360
    @degreeRate = @degree/360

    @step = (@degreeRate*2*Math.PI)/(@cnt)
    @rotateStep = @degreeRate*360/(@cnt)
    

    @cloneBits
      class: 'bit'
      cnt: @cnt
    @$el.css
      width:  2*@radiusX or 200
      height: 2*@radiusY or 200

    @$el.velocity('stop')
      .velocity
        rotateZ: @o.initialRotation or 0
      ,
        duration: 1


  animate:(o)->
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
      
      size = @height or @radius
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
        complete:->
          @$el.hide()

      rotateAngle += @rotateStep
      angle += @step

    if o?.rotation or o?.rotationDuration
      @$el.velocity
          rotateZ:  o?.rotation or 90
        ,
          duration: o?.rotationDuration or 900

  reset:->
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
          translateX:  left*@rate
          translateY:  top*@rate
          marginTop: 0
          rotateZ: rotateAngle+90
          height: 0
        ,
          duration: 1
      rotateAngle += @rotateStep
      angle += @step

window.motion.Burst = Burst

size = 100
burst0 = new Burst
  cnt: 5
  radius: size
  left: 500
  top:  500
  initialRotation: -180
  rate: .75
  degree: 220

$(window).on 'click', (e)->
  burst0.animate
    left: e.pageX
    top:  e.pageY

