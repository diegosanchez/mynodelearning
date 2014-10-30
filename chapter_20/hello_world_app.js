var connect = require('connect');
var midwear01 = require('./hello_world');
var midwear02 = require('./welcome');
var midwear03 = require('./http_header');
var midwear04 = require('./write_request');

var helloWorldMiddleweare01 = require('./hello_world');
var port = Number(process.argv[2] || 8080);

var app = connect();

app.use( midwear03('X-Powered-By', 'Node') );
app.use( midwear04() );

// Flush
app.use( function( req, res, next) {
  res.end();
  next();
});

app.listen(port);
console.log("Listening port: ", port);

