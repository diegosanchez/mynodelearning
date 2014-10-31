var http = require('http');

var app = http.createServer( handler );

var port = Number(process.argv[2] || 8080 );

app.listen( port );
console.log("Server listening on: ", port );

function handler(req, res) {
  console.log( "Incomming: " , new Date() );
  req.pipe(res);
}
