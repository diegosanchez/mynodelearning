app = angular.module( 'flapperNews', ['ui.router'] );

app.config( ['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: 'home.html',
      controller: 'MainCtrl'
    })
    .state('posts', {
      url: '/posts/{id}',
      templateUrl: 'posts.html',
      controller: 'PostCtrl'
    });

  $urlRouterProvider.otherwise('home');
}]);

app.controller( 'PostCtrl', ['$scope', '$stateParams', 'posts', function ( $scope, $stateParams, posts ) {

  var post = posts.find( $stateParams.id );

  $scope.post = post;


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
    posts.upVotes(post);
  }

  $scope.posts = posts.all;

  // Create initial data
  posts.addPost( 'new post',  'http://www.fi.uba.ar' );
  posts.addPost( 'untref',    'http://www.untref.gov.ar' );

  posts.comment( posts.all[0], "This is my comment" );
  posts.comment( posts.all[0], "This is another comment" );

  $scope.clearPostForm();

}]);
