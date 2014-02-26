(function() {
  'use strict';
   var duplex = require('duplexer');
   var through = require('through');

    module.exports = function (counter) {
        var inputs = through(write,end);
        var counts = {};

        return duplex( inputs , counter );

        function write(row) {
          counts[row.country] =  ( counts[row.country] || 0 ) + 1;
        }

        function end() {
            counter.setCounts(counts);
        }

     };

})();
