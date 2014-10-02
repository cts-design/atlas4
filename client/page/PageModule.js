angular.module('page', ['ui.router', 'ngResource'])

.config(function($stateProvider, $urlRouterProvider){
	$urlRouterProvider.otherwise('/');
	//$httpProvider.interceptors.push('AuthInterceptor');

	$stateProvider
	.state('page', {
		url : '/page',
		templateUrl : '/html/basic_layout.html',
		controller : 'PageController',
	})

	/*
		If a valid id is passed to edit on ui-sref links it will read that parameter
	*/
	.state('page.edit', {
		url : '/edit/{id}',
		templateUrl : '/html/page/edit.html',
		controller : 'PageController'
	})
	
	.state('page.list', {
		url : '/list', 
		templateUrl : '/html/page/list.html',
		controller : 'PageController'
	})

})

.run(function($rootScope, $log) {
	$rootScope.$on('$stateChangeError', function(e, to, toParams, from, fromParams, error) {
		$log.error(error);
	})
})