var fs = require("fs");
var path = require("path");

function writeRequestToFile() {
  var fileName = 'request_' + Date.now().toString() + '.req';
  var filePath = path.normalize( path.join( './cassette', fileName) );

  return function(req, res, next) {

    fs.mkdir( path.dirname( filePath ), function() {
        req.pipe( fs.createWriteStream( filePath ) );
    });

    next();
  }
}

module.exports = writeRequestToFile;

