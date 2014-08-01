function NavigationController($scope,$rootScope, $location,$timeout,$http,Session) {

	$scope.navClass = function (page) {
		var currentRoute = $location.path().substring(1) || 'home';
		return page === currentRoute ? 'active' : '';
	};

	$scope.logout = function() {
		Session.end();
	};

}