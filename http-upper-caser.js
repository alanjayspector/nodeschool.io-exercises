var fs = require("fs");
var http = require("http");
var port = Number(process.argv[2]);
var map = require('through2-map');

   var server = http.createServer(function (req, res) {
  if (req.method === 'POST' ) {
      req.pipe(map(function (chunk) {
             return chunk.toString().toUpperCase();})).pipe(res);
  } else {
    res.end("SEND ME A POST");
  }

});


server.listen(port, function() {
    console.log('server bound on:' + port);
});

