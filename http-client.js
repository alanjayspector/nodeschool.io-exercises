http = require("http");

function get_request(url, callback) {
  http.get(url, function(response) {
    response.setEncoding("utf8");
    response.on("data", function(data) { callback(null,data) } )
    response.on("error", function(err) { callback(err,null) } )
  });
}

    get_request(process.argv[2], function( err, data ) {
        if ( err != null ) {
            console.error(err);
        } else  {
          console.log(data); 
        }
      }
    );

