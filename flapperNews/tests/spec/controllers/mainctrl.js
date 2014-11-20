describe('Unit: MainCtrl', function() {
	beforeEach( module('flapperNews'));
	beforeEach( module( function( $provide ) {
		$provide.factory( 'posts', function () {
			return {
				all: [],
				add: function (post) {
					this.all.push(post);
				}
			}
		})
	}));

	var ctrl, scope;

	beforeEach( inject( function($controller, $rootScope) {
		scope = $rootScope.$new();
		ctrl = $controller('MainCtrl', {
			$scope: scope
		});
	}));

	it('should clear a form', function() {
		scope.clearPostForm();
		expect(scope.post).toEqual({});
	});

	it('clear form should not be submitable', function() {
		scope.clearPostForm();
		expect(scope.isSubmitEnabled()).toBe(false);
	});

	it('compleated form should be submitable', function() {
		scope.post.title = 'My title';
		scope.post.link = 'http://mylink.com';
		expect(scope.isSubmitEnabled()).toBe(true);
	});

	it('should add post', function() {
		scope.post.title = 'my title';
		scope.post.link = 'http://mytitle.com';
		scope.addPost();
		expect(scope.posts.length).toBeGreaterThan(0);
		
	});
});
