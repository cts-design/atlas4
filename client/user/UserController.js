angular.module('user')

.controller('UserController', function($scope, $state, $stateParams, UserFactory) {
	$scope.skip = 0;
	$scope.limit = 10;
	$scope.users = [];
	$scope.user = {};

	$scope.next = function() {
		$scope.skip += $scope.limit;
		query($scope.skip);
	}

	$scope.back = function() {
		if($scope.skip - $scope.limit < 0) {
			$scope.skip = 0;
		} else {
			$scope.skip -= $scope.limit;
		}

		query($scope.skip);
	}

	$scope.save = function(user) {
		UserFactory.save(user).$promise.then(function(server_user) {
			$scope.users.push(server_user);
			//$state.go('user.list');
		});
	}

	$scope.remove = function(user, index) {
		UserFactory.delete({ _id : user._id }).$promise.then(function(user) {
			$scope.users.splice(index, 1);
		});
	}

	function query(skip, limit) {
		var skip = skip || 0;
		var limit = limit || 10;

		UserFactory.query({ skip : skip, limit : limit })
		.$promise.then(function(users){
			$scope.users = users;
		});
	}

	function get() {
		$scope.user = UserFactory.query({ _id : $stateParams.id })
		.$promise.then(function(users) {
			$scope.user = users[0];
		});
	}



	query();
	get();
})