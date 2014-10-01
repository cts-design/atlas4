angular.module('page')

.controller('PageController', function($scope, PageFactory) {
	$scope.page = '';
	$scope.skip = 0;
	$scope.limit = 10;

	$scope.createPage = function() {
		
	}

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

	function query(skip, limit) {
		var skip = skip || 0;
		var limit = limit || 10;

		PageFactory.query({ skip : skip, limit : limit })
		.$promise.then(function(pages){
			$scope.pages = pages;
		});
	}

	query();

	$scope.$watch('page.title', function(value) {
		if(value)
			$scope.page.slug = value.replace(' ', '_');
	});
})