angular.module('page')
.factory('PageFactory', function($resource) {
	return $resource('/api/v1/page/:_id');
})