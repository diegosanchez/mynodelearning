var http = require('http');

var app = http.createServer( handler );

var port = Number(process.argv[2] || 8080 );

app.listen( port );
console.log("Server listening on: ", port );

function handler(req, res) {
  var body = "";

  req.on( 'data', function(data) {
    body += data.toString();
  });

  req.on( 'end', function() {
    var number = parseInt(body.trim() );
    var result = JSON.stringify( Math.pow(number, 2) ) ;

    console.log( Date.now(), " - ", result );
    res.end( result );
  });
}
