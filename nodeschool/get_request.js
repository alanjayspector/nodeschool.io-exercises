http = require("http");
module.exports = function(url, callback) {
  http.get(url, function(response) {
    response.setEncoding("utf8");
  var body = '';

  response.on('data', function (chunk) {
    body += chunk;
  });

  response.on('end', function () {
    callback(null, {url:url, body:body});
  });
 

});
};


