get_request = require("./get_request.js");

get_request(process.argv[2], function(err,data) {
  console.log(data.body.length);
  console.log(data.body);
});



