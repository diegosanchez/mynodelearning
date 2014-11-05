app.factory('posts', [ function () {
  var service = {};

  service.all= [];

  service.addPost = function ( title, link) {
    service.all.push( {title: title, link: link, upvotes: 0, comments: [] });
  };

  service.upVotes = function (post) {
    post.upvotes += 1;
  }

  service.comment = function (post, comment) {
    post.comments.push( comment );
  }

  service.find = function (id) {
    var result = service.all.filter( function ( e ) {
      return e.title == id;
    });

    return result[0];
  }

  return service;
}]);
