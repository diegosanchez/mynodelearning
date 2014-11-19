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
      resolve: {
        post: ['$stateParams', 'posts', function ($stateParams, posts) {
          return posts.get($stateParams.id).then( function(response) {
            return response.data;
          });
        }]
      },
      url: '/posts/{id}',
      templateUrl: 'partials/posts.html',
      controller: 'PostCtrl'
    });

  $urlRouterProvider.otherwise('home');
}]);

app.controller( 'PostCtrl', ['$scope', '$http', 'post', function ( $scope, $http, post ) {

  console.log("PostCtrl: ", post);
  $scope.post = post;

  $scope.upVotes = function (comment) {
    var url = '/posts/' + comment.post + '/comments/' + comment._id + '/upvote';
    return $http.put( url).success( function( response) {
      comment.upvotes = Number(response.upvotes);
    });
  }

  $scope.addComment = function () {
    return $http.post( '/posts/' + post._id + '/comments', $scope.comment).
      success( function(data) {
        $scope.post.comments.push( angular.fromJson(data));
      });
  };

}]);

app.controller( 'MainCtrl', ['$scope', 'posts', function ( $scope, posts ) {
  $scope.posts = posts.all;

  $scope.clearPostForm = function () {
    $scope.post = {};
  };

  $scope.addPost = function () {
    posts.add( $scope.post );
  };

  $scope.upVotes = function (post) {
    posts.upVotes(post);
  }

  $scope.isSubmitEnabled = function() {
    return $scope.post.title == "" || $scope.post.link == "";
  }

  $scope.clearPostForm();
}]);
