app = angular.module( 'flapperNews', ['ui.router'] );

app.config( ['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('home', {
      resolve: {
          postPromise: ['posts', function(posts) {
            return posts.getAll();
          }]
      },
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
    return $http.post( '/posts/' + post._id + '/comments', $scopte).
      success( function(data) {
        $scope.post.addComment( angular.fromJson(data));
      });
  };
}]);

app.controller( 'MainCtrl', ['$scope', 'posts', function ( $scope, posts ) {
  $scope.clearPostForm = function () {
    $scope.title = '';
    $scope.link = '';
  };

  $scope.addPost = function () {
    posts.add( $scope );
    $scope.clearPostForm();
  };

  $scope.upVotes = function (post) {
    posts.upVotes(post);
  }

  $scope.posts = posts.all;

  if ( posts.all.length != 0 )
    return;


  var newPost = null;


  $scope.clearPostForm();

}]);
