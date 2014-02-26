(function() {
  'use strict';



    var cp = require('child_process');
    var duplex = require('duplexer');


    module.exports = function (cmd, args) {
         var command = cp.spawn(cmd , args );
         return duplex(command.stdin, command.stdout);
     };

})();
