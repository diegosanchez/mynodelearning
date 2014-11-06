function Post(title, link) {
  this.title      = title || "";
  this.link       = link || ""; 
  this.upvotes    = 0;
  this.comments   = [];
}

Post.prototype.addComment = function (author, body) {
  this.comments.push( { author: author, body: body, upvotes: 0 });
}

app.factory('posts', [ '$http', function ($http) {
  var service = {};

  service.all = [];

  service.upVotes = function (post) {
    post.upvotes += 1;
  }

  service.findById = function (id) {
    var result = service.all.filter( function ( e ) {
      console.log( e.id, id);
      return e.id == id;
    });

    console.log( result[0] );
    return result[0];
  }

  $http.get('/posts').
    success( function(data, status, headers, config) {
      service.all = angular.fromJson(data);
    }).
    error( function(data, status, headers, config) {
      console.error(status);
    });

  return service;
}]);
