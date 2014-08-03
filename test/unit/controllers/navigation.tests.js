"use strict";
describe("NavigationController", function(){
    var scope;//we"ll use this scope in our tests
	
	//mocks created for testing
	//mocking of wallet manager
	var mockSession = {
		end : function() {
		},
	};
	
    //mock Application to allow us to inject our own dependencies
	beforeEach(angular.mock.module('DecentralWallet'));
	beforeEach(function() {
		module(function ($provide) {
			$provide.value("Session", mockSession);
		});
	});
	
    //mock the controller for the same reason and include $rootScope and $controller
    beforeEach(angular.mock.inject(function($rootScope, $controller){
        //create an empty scope
        scope = $rootScope.$new();
        //declare the controller and inject our empty scope
        $controller("NavigationController", {$scope: scope});
    }));
	
    // tests start here
    
	/***
	This checks the navClass function
	$location.path() is called
	***/
	describe("navClass", function(){
		
		/***
		When navClass is called without a path and location
		is not specified, empty string is returned.
		***/
		it("empty empty", inject(function($location) {
			$location.path = function() {return ""};
			expect(scope.navClass("")).toBe("");
		}));
		
		/***
		When navClass is called without a path and location
		is not home, empty string is returned.
		***/
		it("empty nothome", inject(function($location) {
			$location.path = function() {return ""};
			expect(scope.navClass("nhome")).toBe("");
		}));
		
		/***
		When navClass is called without a path and location
		is home, "active" string is returned.
		***/
		it("empty home", inject(function($location) {
			$location.path = function() {return ""};
			expect(scope.navClass("home")).toBe("active");
		}));
		
		/***
		When navClass is called with a path and location
		is same, "active" string is returned.
		***/
		it("nonempty match", inject(function($location) {
			$location.path = function() {return "_path"};
			expect(scope.navClass("path")).toBe("active");
		}));
		
		/***
		When navClass is called with a path and location
		is not same, empty string is returned.
		***/
		it("nonempty notmatch", inject(function($location) {
			$location.path = function() {return "_path"};
			expect(scope.navClass("home")).toBe("");
		}));
	});

	
	/***
	This checks the logout function
	$Session.end() is called
	***/	
	it("logout", function(){
		spyOn(mockSession, "end");
		scope.logout();
		expect(mockSession.end).toHaveBeenCalled();
    });

});