"use strict";
describe("AddressesController", function(){
    var scope;//we"ll use this scope in our tests
	
	//mocks created for testing
	
	var mockWallet = {
		getAddresses : function() {
			return [];
		}
	};
	
    //mock Application to allow us to inject our own dependencies
	beforeEach(angular.mock.module('DecentralWallet'));
	beforeEach(inject(function(WalletManager) {
		WalletManager.getCurrentWallet = function() {
			return {getAddresses : function(){}};
		};
		
		/*WalletManager = {
			getCurrentWallet : function() {
				return mockWallet;
			}
		}*/
	}));
	
	
    //mock the controller for the same reason and include $rootScope and $controller
    beforeEach(angular.mock.inject(function($rootScope, $controller){
        //create an empty scope
        scope = $rootScope.$new();
        //declare the controller and inject our empty scope
        $controller("AddressesController", {$scope: scope});
    }));
	
    // tests start here
    
	
	/***
	This checks initial variables
	***/	
	it("_addressesinit", function(){
		try{
		}catch(e){
		}
		//scope.search();
		//expect(scope.sortingOrder).toBe('name');
		//expect(scope.reverse).toBe(false);
		//expect(scope.filteredItems).toBe([]);
		//expect(scope.groupedItems).toBe( []);
		//expect(scope.itemsPerPage).toBe(5);
		//expect(scope.pagedItems).toBe([]);
		//expect(scope.currentPage).toBe(0);
    });

});