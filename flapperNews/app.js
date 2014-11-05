app = angular.module( 'flapperNews', [] );

app.controller( 'MainCtrl', ['$scope', 'posts', function ( $scope, posts ) {
  $scope.clearPostForm = function () {
    $scope.title = '';
    $scope.link = '';
  };

  $scope.addPost = function () {
    posts.addPost( $scope.title, $scope.link);
    $scope.clearPostForm();
  };

  $scope.upVotes = function (post) {
    posts.upVotes(post);
  }

  $scope.posts = posts.all;

  // Create initial data
  posts.addPost( 'new post',  'http://www.fi.uba.ar' );
  posts.addPost( 'untref',    'http://www.untref.gov.ar' );

  $scope.clearPostForm();

}]);
