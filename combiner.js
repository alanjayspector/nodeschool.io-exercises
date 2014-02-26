(function() {
  'use strict';
  var combine = require('stream-combiner');
  var split = require('split');
  var through = require('through');
  var zlib = require("zlib");
  var _ = require("underscore");

  //zlib.createGzip()
  /*  --- input
    {"type":"genre","name":"cyberpunk"}
    {"type":"book","name":"Neuromancer"}
    {"type":"book","name":"Snow Crash"}
    {"type":"genre","name":"space opera"}
    {"type":"book","name":"A Deepness in the Sky"}
    {"type":"book","name":"Void"}
  */

  /* ----- output
    {"name":"cyberpunk","books":["Neuromancer","Snow Crash"]}
    {"name":"space opera","books":["A Deepness in the SKy","Void"]}
  */

  

    module.exports = function () {
        var genres = [];
        return combine(
            split(),
            through( function(line) {
                if ( line.length === 0 || _.isUndefined(line) ) return;

                var input = JSON.parse(line);
                if (input.type === "genre") {
                    if ( genres.length > 0 ) {
                      this.queue( JSON.stringify(genres[genres.length-1]) + "\n" );
                    }
                    genres.push({ "name":input.name, "books": [] });
                } else if ( input.type === "book" ) {
                    genres[genres.length-1].books.push(input.name);
                }
              }, function(){
                   if (  genres.length > 0 ) {
                     this.queue( JSON.stringify(genres[genres.length-1]) + "\n" );
                   } 
                   this.queue(null);
                 } ),
              zlib.createGzip()
        );
    };


})();
