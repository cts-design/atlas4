angular.module('page', ['ui.router', 'ngResource'])

.config(function($stateProvider, $urlRouterProvider){
	$urlRouterProvider.otherwise('/');
	//$httpProvider.interceptors.push('AuthInterceptor');

	$stateProvider
	.state('page', {
		url : '/page',
		templateUrl : '/html/basic_layout.html',
		controller : 'PageController',
		/*resolve : {
			authenticated : function($q) {
				var deferred = $q.defer();
				deferred.reject('Administrator not logged in');
				return deferred.promise;
			}
		}*/
	})

	/*
		If a valid id is passed to edit on ui-sref links it will read that parameter
	*/
	.state('page.edit', {
		url : '/edit',
		templateUrl : '/html/page/edit.html'
	})
	
	.state('page.list', {
		url : '/list', 
		templateUrl : '/html/page/list.html',
		// controller : 'PageListController'
	})

})

.run(function($rootScope, $log) {
	$rootScope.$on('$stateChangeError', function(e, to, toParams, from, fromParams, error) {
		$log.error(error);
	})
})