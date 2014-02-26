(function() {

  'use strict';
  

/*
Buffers are similar to Arrays in that you can get and set values at particular offsets.

Write a program that takes the first buffer written to `process.stdin`,
updates all instances of . with ! and then logs out the updated buffer object.

Bonus points if you never call `.toString()` on your buffer!

HINTS:

Buffers have a `.write` method that can be used to a character to a specific offset.

The integer value of the ascii character . is 46.
33 for !

*/

  process.stdin.on("readable", function(chunk) {
    var buffer = process.stdin.read();
    if ( buffer === null ) {
      return;
    }
    var i;
    for ( i = 0; i < buffer.length; i++ ) {
        if ( buffer[i] === 46 ) {
          buffer[i] = 33;
        }
    }
      
    console.log(buffer);

  });




})();
