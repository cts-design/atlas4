angular.module('page')
.factory('PageFactory', function($resource) {
	return $resource('/page/:id');
})