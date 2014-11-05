function UserFactory() {
  this.users = [];
};

UserFactory.prototype.add = function ( name, email) {
  this.users.push ( { name: name, email: email } );
}

UserFactory.prototype.all = function () {
  return this.users;
}


var local = new UserFactory();

local.add( 'diego', 'diego@test.com' );
local.add( 'juan',  'juan@test.com' );

module.exports = local;
