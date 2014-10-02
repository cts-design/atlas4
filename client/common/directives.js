angular.module('app.directives', [])
.directive('sideBar', function() {
	return {
		restrict : 'E',
		replace : true,
		scope : {
			
		},
		controller : function($rootScope, $scope, $timeout) {
			$rootScope.$on('$stateChangeStart', function() {
				$scope.subMenu = '';
			})

			var closePromise = {};

			$scope.close = function() {
				closePromise = $timeout(function() {
					$scope.subMenu = '';
				}, 750);
			}

			$scope.open = function(subMenu) {
				$scope.subMenu = subMenu;
			}

			$scope.stopTimeout = function() {
				$timeout.cancel(closePromise);
			}
		},
		templateUrl : '/html/partials/admin_sidebar.html'
	}
})

.directive('adminTable', function() {
	return {
		restrict : 'E',
		replace : true,
		scope : {
			rows : '=',
			columns : '=',
			width : '@',
			color : '@',
			removable : '=',
			editable : '=',
			remove : '&',
			editState : '@',
			query : '&'
		},
		controller : function($scope, $element) {
			if(!$scope.skip)
				$scope.skip = 0;

			if(!$scope.limit)
				$scope.limit = 10;

			$scope.next = function() {
				$scope.skip += $scope.limit;

				$scope.query({
					skip : $scope.skip, 
					limit : $scope.limit
				});
			};

			$scope.back = function() {
				if($scope.skip - $scope.limit < 0) {
					$scope.skip = 0;
				} else {
					$scope.skip -= $scope.limit;
				}

				$scope.query({
					skip : $scope.skip, 
					limit : $scope.limit
				});
			};

			$scope.query({
				skip : $scope.skip, 
				limit : $scope.limit
			});
		},
		templateUrl : '/html/partials/admin_table.html'
	}
})