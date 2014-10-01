angular.module('user')
.factory('UserFactory', function($resource) {
	return $resource('/user/:_id');
})