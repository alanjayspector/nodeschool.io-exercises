var net = require('net');
var strftime = require('strftime');

var server = net.createServer(function(socket) { 
    console.log('server connected');
      socket.on('end', function() {
            console.log('server disconnected');
        });
      socket.write(strftime("%Y-%m-%d %H:%M")+"\n");
      socket.end();
});
server.listen(process.argv[2], function() { 
    console.log('server bound on:' + process.argv[2]);
});
