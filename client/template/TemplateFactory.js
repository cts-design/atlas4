angular.module('template')
.factory('TemplateFactory', function($resource) {
	return $resource('/api/v1/template/:_id');
});