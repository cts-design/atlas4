angular.module('template', ['ui.router', 'ngResource'])
.config(function($stateProvider) {

	$stateProvider

	.state('template', {
		url : '/template',
		templateUrl : '/html/basic_layout.html'
	})

	.state('template.edit', {
		url : '/edit/{id}',
		templateUrl : '/html/template/edit.html',
		//controller : 'TemplateController'
	})

	.state('template.list', {
		url : '/list',
		templateUrl : '/html/template/list.html',
		controller : 'TemplateController'
	})

});