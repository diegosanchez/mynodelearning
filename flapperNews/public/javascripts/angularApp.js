app = angular.module( 'flapperNews', ['ui.router'] );

app.config( ['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: 'partials/home.html',
      controller: 'MainCtrl'
    })
    .state('posts', {
      url: '/posts/{id}',
      templateUrl: 'partials/posts.html',
      controller: 'PostCtrl'
    });

  $urlRouterProvider.otherwise('home');
}]);

app.controller( 'PostCtrl', ['$scope', '$stateParams', 'posts', function ( $scope, $stateParams, posts ) {

  var post = posts.findById( $stateParams.id );

  $scope.post = post;

  $scope.upVotes = function (comment) {
    console.log( 'PostCtrl', 'upVotes' );
    comment.upvotes += 1;
  }

  $scope.addComment = function () {
    $scope.post.addComment( 'yo', $scope.body );
  }

}]);

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
    console.log( 'MainCtrl', 'upVotes' );
    posts.upVotes(post);
  }

  $scope.posts = posts.all;

  if ( posts.all.length != 0 )
    return;


  var newPost = null;

  // Create initial data
  // newPost = posts.addPost( 'new post',  'http://www.fi.uba.ar' );
  // newPost.addComment( 'diego', 'Muy bueno');
  // newPost.addComment( 'juan', 'Malo' );

  // posts.addPost( 'untref',    'http://www.untref.gov.ar' );

  $scope.clearPostForm();

}]);
