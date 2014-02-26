var through = require("through");

function write(buffer) {
  this.queue(buffer.toString().toUpperCase());
}

function end() {
  this.queue(null);
}

var tr = through(write,end);
process.stdin.pipe(tr).pipe(process.stdout);


