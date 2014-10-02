angular.module('user', ['ui.router'])

.config(function($stateProvider) {
	$stateProvider

	.state('user', {
		url : '/user',
		templateUrl : '/html/basic_layout.html',
		controller : 'UserController'
	})

	.state('user.login', {
		url : '/login',
		templateUrl : '/html/user/login.html'
	})

	.state('user.register', {
		url : '/register',
		templateUrl : '/html/user/register.html'
	})

	.state('user.list', {
		url : '/list',
		templateUrl : '/html/user/list.html',
		controller : 'UserController'
	})

	.state('user.edit', {
		url : '/edit/{id}',
		templateUrl : '/html/user/edit.html',
		controller : 'UserController'
	})
})