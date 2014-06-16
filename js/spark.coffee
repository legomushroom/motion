
class Spark extends motion.Bit
  type: 'spark'

  init:()-> 
    @add2Dom(); @
    @animate()

  vars:->
    super
    @cnt     = @o.cnt or 5
    @rand = motion.helpers.rand
    @cloneBits
      class: 'bit'
      cnt: @cnt

    @$el.css
      width:  2*@radiusX or 200
      height: 2*@radiusY or 200

  animate:->
    for $el, i in @$els
      height = 50 + @rand(0,50)
      x = motion.helpers.rand -30, 30
      $el
        .velocity('stop')
        .velocity
            top: 0
            height: height
            translateX: x
            rotateZ: x
            opacity: 0
          ,
            delay: i*@rand(50, 150) + @rand(50, 100)

  reset:->


setTimeout ->
  new Spark
, 500