var async = require('async');
var request = require('request');

var url = 'http://127.0.0.1:8080';

function issue( data ) {
  return function ( next ) {
    console.log( "Posted: ", new Date());
    request.post( { url: url, body: data.toString() }, handler(next) );
  }
}

function handler( next ) {
  return function( err, res, body ) {
    if ( err === null) {
      console.log( "Result: ", body, 
          ". status code: ", res.statusCode, 
          " time(", new Date(), ")" );
      console.log();
    }
    next( err, body);
  }
}


var reqs = [];

for( var i = 0; i < 1000; ++i) {
  reqs.push( issue( i ) );
}

async.series( reqs );

