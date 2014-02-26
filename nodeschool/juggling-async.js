get_request = require("./get_request.js");
var urls = process.argv.slice(2);
var urls_count = urls.length;
var url_bodies  = {}; 

  function print_request(err, data) {
    url_bodies[data.url] = data.body; 
    urls_count--;
    if ( urls_count === 0 ) {
      urls.forEach(function(url) {
        console.log(url_bodies[url]);
      });
    }
  }


  urls.forEach( function(url) {
    get_request(url, print_request); });





