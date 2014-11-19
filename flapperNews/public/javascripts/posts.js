
app.factory('posts', [ '$http', function ($http) {
  var service = { all: [] };

  service.upVotes = function (post) {
    return $http.put('/posts/' + post._id + '/upvote' ).success( function(data) {
      post.upvotes = Number(data.upvotes);
    });
  }

  service.findById = function (id) {
    var result = service.all.filter( function ( e ) {
      return e._id == id;
    });

    return result[0];
  }

  service.getAll = function(successCallBack) {
    var promise = $http.get( '/posts');
    var self = this;

    promise.success( function(data, status, headers, config) {
      self.all = data;
    });

    return promise;

  };

  service.add = function( data ) {
    var promise = $http.post('/posts', data);
    var self = this;
    
    promise.success( function (data) {
      self.all.push( data );
    });

    return promise;
  };

  service.get = function(id) {
    return $http.get('/posts/' + id );
  }

  return service;
}]);
