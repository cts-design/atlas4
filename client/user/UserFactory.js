angular.module('user')
.factory('UserFactory', function($resource) {
	return $resource('/api/v1/user/:_id');
})