
class Spark extends motion.Bit
  type: 'spark'

  init:()-> @add2Dom(); @

  vars:->
    super
    @cnt     = @o.cnt
    

  animate:->

  reset:->
