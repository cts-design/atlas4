angular.module('user')

.controller('UserController', function($scope, $state, $stateParams, UserFactory) {
	$scope.users = [];
	$scope.user = {};

	$scope.save = function(user) {
		$scope.saving = true;
		UserFactory.save(user).$promise.then(function(server_user) {
			$scope.saving = false;
			$state.go('user.list');
		});
	}

	$scope.remove = function(user, index) {
		UserFactory.delete({ _id : user._id }).$promise.then(function(user) {
			$scope.users.splice(index, 1);
		});
	}

	$scope.query = function(skip, limit) {
		var skip = skip || 0;
		var limit = limit || 10;

		UserFactory.query({ skip : skip, limit : limit })
		.$promise.then(function(users){
			$scope.users = users;
		});
	}

	if($stateParams.id) {
		$scope.user = UserFactory.get({ _id : $stateParams.id });
	}
})