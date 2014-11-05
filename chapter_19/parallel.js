var async = require('async');
var request = require('request');

var url = 'http://127.0.0.1:8080';

function issue( data ) {
  return function ( next ) {
    request.post( { url: url, body: data.toString() }, handler(next) );
  }
}

function handler( next ) {
  return function( err, res, body ) {
    next( err, body);
  }
}


var reqs = [];

for( var i = 0; i < 1000; ++i) {
  reqs.push( issue( i ) );
}

console.log( "Start: ", new Date() );

async.parallel( reqs, function( err, results) {
  if ( err ) {
    throw err;
  }

  console.log( "Result count: ", results.length );

  console.log( "Finish: ", new Date() );

} );

