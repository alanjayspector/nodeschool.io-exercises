(function() {

'use strict';

var trumpet = require('trumpet');
var through = require('through');



  var tr      = trumpet();
  var stream  = tr.select('.loud').createStream();

  stream.pipe(through(function write(buffer) {
    this.queue(buffer.toString().toUpperCase());
  })).pipe(stream);

  process.stdin.pipe(tr).pipe(process.stdout);
})();


