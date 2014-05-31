// var plugin = function(){
//     return function(style){
//         var nodes = this.nodes, i,
//             l, len, newSelector, newSelectors,
//             regex, selector, _i;
//         style.define('utilus_is_function', function(i, selector) {
//           selector = selector.toString();
//           if (selector == null) {
//             selector = '';
//           }
//           regex = /\s?((?:\.|\#|::?|__|--|\s|\|\s?|\~\s?|\>\s?|\+\s?)((?:[a-z*\\=\'\"\!\$\^\d]|\-(?!\-))+)|(\[(.+?)\]))(\((.+?)?\))?/gi;
//           newSelectors = selector.match(regex);
//           len = newSelectors.length;
//           newSelector = '';
//           if (i == null ) i = 1;
//           i = parseInt(i, 10);
//           i = i < 0 ? -i : i;
//           i = i >= len ? len - 1 : i;
//           l = len - i;
//           for (i = _i = 0; 0 <= l ? _i < l : _i > l; i = 0 <= l ? ++_i : --_i) {
//             newSelector += newSelectors[i];
//           }
// 					return new nodes.Unit(newSelector);
//         });
  
//     };
// };
// module.exports = plugin;






// // return 