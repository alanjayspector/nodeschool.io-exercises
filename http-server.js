var through = require("through");
var http = require("http");
var port = Number(process.argv[2]);


  var server = http.createServer(function (req, res) {
      if ( req.method === 'POST' ) {

        req.pipe(through(function(buf) {
           this.queue(buf.toString().toUpperCase());
         } )).pipe(res);
      } else {
          res.end("Send me a POST.");
      }

  });


server.listen(port, function() {
    console.log('server bound on:' + port);
});

