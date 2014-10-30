var child_process = require('child_process');

if ( process.argv.length < 3 ) {
  console.log("Usage");
  return;
}

var cmd = child_process.exec( process.argv[2], function (err, stdout, stderr) {
  if ( err ) {
    console.error( stderr );
    return;
  }

  console.log(stdout);

});


cmd.on("exit", function(code) {
  process.exit(code);
});
