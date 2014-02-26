(function() {

    'use strict';

    var fs = require('fs');
    var pathToFile = process.argv[2];
    fs.readFile(pathToFile, function(err, data) {
        if (err) {
            throw err;
        }

        var buffers = [];
        var i = 0;
        var last_slice = 0;
        for (; i < data.length; i++) {
            if (data[i] === 10 && last_slice != i) {
                buffers.push(data.slice(last_slice, i));
                last_slice = i + 1;

            }
        }

        buffers.push(data.slice(last_slice, data.length));

        buffers.forEach(function(buffer) {
            console.log(buffer);
        });

    });






})();
