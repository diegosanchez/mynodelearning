app.factory('posts', [ function () {
  var service = {};

  service.all= [];

  service.addPost = function ( title, link) {
    service.all.push( {title: title, link: link, upvotes: 0 });
  };

  service.upVotes = function (post) {
    post.upvotes += 1;
  }

  return service;
}]);
