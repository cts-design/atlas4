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
			next : '&',
			back : '&',
			remove : '&',
			skip : '=',
			limit : '=',
			editState : '@'
		},
		link : function(scope, element, attrs) {
			if(scope.width)
				element.width = scope.width;

			scope.removeFn = function(row, index) {
				scope.$parent.remove(row, index);
			}
		},
		templateUrl : '/html/partials/admin_table.html'
	}
})