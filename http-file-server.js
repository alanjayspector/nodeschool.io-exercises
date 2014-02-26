fs = require("fs");
http = require("http");
port = Number(process.argv[2]);
fileLoc = process.argv[3];

var server = http.createServer(function (req, res) {
  fstream = fs.createReadStream(fileLoc);
  fstream.pipe(res);

});


server.listen(port, function() {
    console.log('server bound on:' + port);
});

