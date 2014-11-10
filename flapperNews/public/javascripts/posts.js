function Post(data) {
  angular.copy(data, this);
}


Post.prototype.addComment = function (author, body) {
  this.comments.push( { author: author, body: body, upvotes: 0 });
};

Post.prototype.id = function() {
  return this.id;
}

app.factory('posts', [ '$http', function ($http) {
  var service = { all: [] };

  service.upVotes = function (post) {
    return $http.put('/posts/' + post._id + '/upvote' ).success( function(data) {
      post.upvotes = Number(data.upvotes);
    });
  }

  service.findById = function (id) {
    var result = service.all.filter( function ( e ) {
      return e.id == id;
    });

    console.log(result[0]);

    return result[0];
  }

  service.getAll = function(successCallBack) {
    var promise = $http.get( '/posts');
    var self = this;

    promise.success( function(data, status, headers, config) {
      angular.forEach( angular.fromJson(data), function( e ) {
        self.all.push( new Post(e) );
      });
    });

    return promise;

  };

  service.add = function( data ) {
    var promise = $http.post('/posts', data);
    var self = this;
    
    promise.success( function (data) {
      self.all.push( new Post(data) );
    });

    return promise;
  }

  return service;
}]);
