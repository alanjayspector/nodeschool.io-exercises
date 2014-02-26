(function() {

    'use strict';
    var _ = require("underscore");

    process.stdin.once("data", function(data) {
        if (_.isNull(data)) {
            return;
        }

        var UA = new Uint8Array(data.length);
        var i = 0;

        for (i; i < data.length; i++) {
            UA[i] = data.readUInt8(i);
        }

        console.log(JSON.stringify(UA));

    });



})();
