angular.module('page')

.controller('PageController', function($scope, $stateParams, $state, PageFactory) {
	$scope.page = '';

	$scope.save = function(page) {
		$scope.saving = true;
		PageFactory.save(page).$promise.then(function(server_page) {
			$scope.saving = false;
			$state.go('page.list');
		});
	}

	$scope.remove = function(page, index) {
		PageFactory.delete({ _id : page._id }).$promise.then(function(page) {
			$scope.pages.splice(index, 1);
		});
	}

	$scope.query = function(skip, limit) {
		var skip = skip || 0;
		var limit = limit || 10;

		PageFactory.query({ skip : skip, limit : limit })
		.$promise.then(function(pages){
			$scope.pages = pages;
		});
	}

	if($stateParams.id) {
		$scope.page = PageFactory.get({ _id : $stateParams.id });
	}
})