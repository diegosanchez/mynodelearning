var express = require('express');
var router = express.Router();

var path = require('path');

var UserFactory = require( path.join( __dirname, '..', 'model', 'user_factory') );

/* GET users listing. */
router.get('/', function(req, res) {
  res.render('users/index', { title: 'Users', users: UserFactory.all() } );
});

module.exports = router;
