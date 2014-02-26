var split = require("split");
var through = require("through");
var line_ctr = 0;

process.stdin
        .pipe(split())
        .pipe(through(function (line) {
      
            line_ctr++;
            if ( (line_ctr % 2) === 0) {
              this.queue(line.toString().toUpperCase() + "\n");
            } else {
              this.queue(line.toString().toLowerCase() + "\n");
           }
        })).pipe(process.stdout);

