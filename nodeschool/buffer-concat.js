(function() {

    'use strict';


    var buffers = []; 

    process.stdin.on("data", function(data) {
        if ( data === null ) {
          return;
        }
        buffers.push(data);
    });

    process.stdin.on("end", function() {
      console.log(Buffer.concat(buffers));
    });


})();
