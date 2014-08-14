"use strict";
cApp.controller("NavigationController", function($scope,$location,Session) {

	/***
	Controller to show currently selected page
	View location is view\header.html
	Checks all the pages on navbar and if it is equal to the input page, makes that page active
	***/
	$scope.navClass = function (page) {
		var currentRoute = $location.path().substring(1) || "home";
		return page === currentRoute ? "active" : "";
	};

	/***
	Controller to logout
	View location is view\header.html
	Session is called and does all the work
	***/
	$scope.logout = function() {
		Session.end();
	};

}); // end of NavigationController