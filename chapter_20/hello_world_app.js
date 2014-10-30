var connect = require('connect');
var midwear01 = require('./hello_world');
var midwear02 = require('./welcome');
var helloWorldMiddleweare01 = require('./hello_world');
var port = Number(process.argv[2] || 8080);

var app = connect();

app.use( midwear01);
app.use( midwear02);
app.use( function( req, res, next) {
  res.end();
  next();
});

app.listen(port);
console.log("Listening port: ", port);

