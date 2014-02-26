(function() {

  'use strict';

/*
 *
  The argument given to you from `process.argv[2]` will be a path to a file.

  Read this file and split it by newline characters ('\n'). You should log
  one Buffer per line.

  Bonus points if you never use `.toString()`.

      Buffers have a `.slice` method that can be used to grab a sub-selection as a view (no memcpy).

      Extra bonus points if you avoid using fs.readFileSync.
*/

    var fs = require('fs');
    var pathToFile = process.argv[2];
    fs.readFile(pathToFile, function(err,data) {
      if (err) {
          throw err;
      }

      var buffers = [];
      var i = 0;
      var last_slice = 0;
      for ( ; i < data.length; i++ ) {
        if ( data[i] === 10 && last_slice != i ) {
          buffers.push( data.slice( last_slice, i ) );
          last_slice = i+1; 

        }
      }
      
      buffers.push( data.slice( last_slice, data.length ) );
      
      buffers.forEach(function(buffer) {
          console.log(buffer);
      });

    });






})();
