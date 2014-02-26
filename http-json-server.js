var fs = require("fs");
var http = require("http");
var url = require("url");
var _ =  require("underscore");

var port = Number(process.argv[2]);

  function parsetime(date) {
      return JSON.stringify({
        "hour": date.getHours(),
        "minute": date.getMinutes(),
        "second": date.getSeconds()

      });
  }

  function unixtime(date) {
    return JSON.stringify({
        "unixtime": date.getTime()
    });
  }


  var server = http.createServer(function (req, res) {
        res.writeHead(200, { 'Content-Type': 'application/json' });

        if (req.method != 'GET') {
          res.end(JSON.stringify({"error":"GET requests only."}));
        }
        request_url = url.parse(req.url, true);
        if ( ! _.has(request_url.query, "iso")) {
          res.end(JSON.stringify({"error":"ISO query parameter not provided."}));
        }

        var date = new Date(request_url.query.iso);
        console.log(date.valueOf());
        if (  _.isNaN(date.valueOf()) ) {
         res.end(JSON.stringify({"error":"ISO parameter is invalid:" + request_url.query.iso}));
        }

        if (request_url.pathname === '/api/parsetime' ) {
          res.end(parsetime(date));
        } else if ( request_url.pathname === '/api/unixtime' ) {
          res.end(unixtime(date));
        } else {
          res.end(JSON.stringify({"error":"Invalid API call:" + request_url.path}));
        }
});


server.listen(port, function() {
    console.log('server bound on:' + port);
});

