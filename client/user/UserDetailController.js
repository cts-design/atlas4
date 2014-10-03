angular.module('user')
.controller(function($scope, $state, $stateParams, UserFactory) {

	$scope.user = UserFactory.get({ _id : $stateParams.id});

	if($scope.user) {
		//Get other things associated with this user (responses, submissions, files)

		/*
		| This is where we would fetch all the responses of a user and allow admins to delete these
		*/
	}

});