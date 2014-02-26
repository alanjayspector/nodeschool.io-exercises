(function() {

  'use strict';
   function repeat(operation, num ) {
     if ( num > 0 ) {
       num--;
       operation();
       return repeat(operation,num);
     }

   };

   module.exports = repeat;


})();
