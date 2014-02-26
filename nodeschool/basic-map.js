(function() {

    'use strict';

    function doubleAll(numbers) {

        return numbers.map(function(currentValue, index, array) {
            return currentValue * 2;
        });

    }

    module.exports = doubleAll;
})();
