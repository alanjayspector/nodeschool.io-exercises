(function() {
  'use strict';

    var crypto = require('crypto');
    var zlib   = require('zlib');
    var tar    = require('tar');
    var through = require('through');
    var _ = require('underscore');
    var cipher_name = process.argv[2];
    var cipher_passphrase = process.argv[3];
    var gunzip = zlib.createGunzip();
    var parser = tar.Parse();
    var mdhash = crypto.createHash('md5');
    var streams = [];


    /* An encrypted, gzipped tar file will be piped in on process.stdin. To beat this
       challenge, for each file in the tar input, print a hex-encoded md5 hash of the
       file contents followed by a single space followed by the filename, then a
       newline.
    */

    parser.on('entry', function(entry) {
          streams.push( { 'type':entry.type, 'path':entry.path, 'hasher': crypto.createHash('md5') });
    });

    var the_final_pipe = through( function(data) {
          var current = _.last(streams);
          if ( current.type === 'File' ) {
            current.hasher.update(data);
          }
      },

      function() {
         var results = [];

        streams.forEach(function(stream) {
             if ( stream.type === 'File' ) {
                results.push(stream.hasher.digest('hex') + ' ' + stream.path );
             } 
        });
//        this.queue(results.join('\n'));
        console.log(results.join('\n'));
        this.queue(null);
      });
    
    process.stdin
          .pipe(crypto.createDecipher(cipher_name, cipher_passphrase))
          .pipe(gunzip)
          .pipe(parser)
          .pipe(the_final_pipe)
          .pipe(process.stdout);
                 

})();
