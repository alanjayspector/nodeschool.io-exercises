(function() {
    'use strict';
    var http = require('http');
    var fs = require('fs');
    var path = require('path');
    var mime = require('mime');
    var _ = require('underscore');
    var cache = {};
    var port = Number(process.argv[2]);

    if (_.isNaN(port)) {
        throw ("port must be a valid integer.");
    }

    function send404(response) {
        response.writeHead(404, {
            'Content-Type': 'text/plain'
        });
        response.write('Error 404: resource not found.');
        response.end();
    }

    function sendFile(response, filePath, fileContents) {
        response.writeHead(200, {
            "content-type": mime.lookup(path.basename(filePath))
        });
        response.end(fileContents);
    }


    function serveStatic(response, cache, absPath) {
        if (_.has(cache, absPath) ) {
            sendFile(response, absPath, cache[absPath]);
        } else {
            fs.exists(absPath, function(exists) {
                if (exists) {
                    fs.readFile(absPath, function(err, data) {
                        if (err) {
                            send404(response);
                        } else {
                            cache[absPath] = data;
                            sendFile(response, absPath, data);
                        }
                    });
                } else {
                    send404(response);
                }
            });
        }
    }



    var server = http.createServer(function(request, response) {
        var filePath = false;

        if (request.url === '/') {
            filePath = 'public/index.html';
        } else {
            filePath = 'public' + request.url;
        }

        var absPath = './' + filePath;
        serveStatic(response, cache, absPath);


    });


    server.listen(port, function() {
        console.log('server bound on:' + port);
    });


    var chatServer = require('./lib/chat_server');
    chatServer.listen(server);

})();
