# TODO
# normalize init and animate options
# change !property to property?
# add bits rate option


class Bubble extends motion.Bit

  type: 'bubble'

  init:()-> @add2Dom(); @

  vars:->
    super
    @radius  = @o.radius or 80
    @radiusX = @o.radiusX or @radius
    @radiusY = @o.radiusY or @radius

    @o.rate ?= .5
    @rate    = @o.rate
    if parseInt(@rate.toFixed(0),10) is 0 then @rate += .000001
    @rate    = @rate or .5

    @cloneBits
      class: 'bit'
      cnt:   1
    @bit = @$els[0]
    @$el.css
      width:  2*@radiusX or 200
      height: 2*@radiusY or 200

  animate:(o)->
    if o.left
      @$el.css
        left: o.left - @radius
    if o.top
      @$el.css
        top:  o.top - @radius
    @reset()

    @bit
      .velocity
          borderWidth: 0
          width:  '100%'
          height: '100%'
        ,
          duration: @o.duration
          delay: @o.delay
      
  reset:->
    @bit.velocity('stop')
      .velocity
          borderWidth:  (@radius/2)*@rate
          width:        @radius*@rate
          height:       @radius*@rate
        ,
          duration: 1


    

window.motion.Bubble = Bubble

size = 20
bubble0 = new Bubble
  radius: size
  duration: 300
  # delay: 300

size = 40
burst0 = new window.motion.Burst
  cnt: 5
  radius: size
  left: 500
  top:  500
  # initialRotation: -180
  # rate: .75
  # degree: 220

$(window).on 'click', (e)->
  bubble0.animate
    left: e.pageX
    top:  e.pageY
  setTimeout =>
    burst0.animate
      left: e.pageX
      top:  e.pageY
  , 200

