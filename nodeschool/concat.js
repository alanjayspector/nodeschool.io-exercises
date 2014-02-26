var concat = require('concat-stream');
var _ = require("underscore");

function write(data) {
   var str = data.toString();
   console.log(str.split('').reverse().join(''));
}
   process.stdin.pipe(concat(write));
 
   
