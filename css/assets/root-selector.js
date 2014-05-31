utils = require('../../node_modules/gulp-stylus/node_modules/stylus/lib/utils')

var plugin = function(){
    return function(style){
        
        style.define('root-selector', function() {
          return this.selectorStack.slice(0,1).toString();
        });

        style.define('rewind-selector', function(i) {
          var stack = this.selectorStack,
              len   = stack.length, i;
          // parse int from i in case of '1a'
          // string was specified
          i = parseInt(i, 10);
          // if i is undefined/NaN or 0
          // then set i to 1
          // i = (!i) ? 1 : i;
          (!i) && (i = 1);

          // if i < 0 then change sign
          // takes care of negative i
          // if somebody will define rewind-selector(-2)
          // i = i < 0 ? -i : i;
          (i < 0) && (i = -i);
          // if i is too big, return root(the last available) selector
          i = i >= len ? len - 1 : i;
          // slice selector stack to
          // get current selector
          stack = stack.slice(0,len-i);
          // return comiled current selector
          return utils.compileSelectors(stack);
        });
  
    };  
};
module.exports = plugin;

