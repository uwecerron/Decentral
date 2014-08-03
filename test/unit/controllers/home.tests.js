/***
To do list
*download()
*scope.import()
*anything involving rootScope
*settimeout initialize function
*anything dealing with dom
***/
"use strict";
describe("HomeController", function(){
    var scope;//we"ll use this scope in our tests
	
	//mocks created for testing
	//mocking of single wallet instance
	var mockWallet = {
		getName : function(){return "mockWalletName";},
		getAddresses : function(){return "mockAddresses";},
		generatePublicAddress : function(){return "";}
	};
	
	//mocking of wallet manager
	var mockWalletManager = {
		getCurrentWallet : function() {
			return mockWallet;
		},
		getWallets : function() {
			return [];
		},
		updateCurrent : function() {
		},
		setWalletR : function() {
		},
		addWallet : function() {
		}
	};
	
    //mock Application to allow us to inject our own dependencies
	beforeEach(angular.mock.module('DecentralWallet'));
	beforeEach(function() {
		module(function ($provide) {
			$provide.value("WalletManager", mockWalletManager);
		});
	});
	
    //mock the controller for the same reason and include $rootScope and $controller
    beforeEach(angular.mock.inject(function($rootScope, $controller){
        //create an empty scope
        scope = $rootScope.$new();
        //declare the controller and inject our empty scope
        $controller("HomeController", {$scope: scope});
    }));
	
    // tests start here
	
	/***
	Everything here belongs to checking when the page is first initialized
	***/
    it("_Homeinit", function(){
        expect(scope.message).toBe("Choose Your Wallet");
		expect(scope.pageClass).toBe("page-home");
		expect(scope.currentAddress).toBe(	"1Yj564jDqoB6L7hg5ETYKhqRsB65WrWPB")
		expect(scope.curWallet).toBe(mockWalletManager.getCurrentWallet());
		expect(scope.wallets.length).toBe(0);
    });
    
	/***
	This checks the backup function
	$scope.curWallet.getAddresses() is called
	$scope.curWallet.getName() is called
	***/	
	it("backup", function(){
		spyOn(scope.curWallet, "getAddresses");
		spyOn(scope.curWallet, "getName");
		scope.backup();
		expect(scope.curWallet.getAddresses).toHaveBeenCalled();
		expect(scope.curWallet.getName).toHaveBeenCalled();
    });
	
	/***
	This checks the generateAddress method
	WalletManager.updateCurrent() is called
	$scope.curWallet.generatePublicAddress() is called
	***/
	it("generateAddress", function() {
		spyOn(mockWalletManager,"updateCurrent");
		spyOn(scope.curWallet,"generatePublicAddress");
		scope.generateAddress();
		expect(mockWalletManager.updateCurrent).toHaveBeenCalled();
		expect(scope.curWallet.generatePublicAddress).toHaveBeenCalled();
	});

	/***
	This checks the generateWallet method
	undefined input should throw an error
	***/
	it("generateWallet undefined", function() {
		var WalletName;
		var message = "";
		try {
			scope.generateWallet(WalletName);
		} catch(e) {
			message = e.message;
		} finally {
			expect(message).toBe("Improper Wallet Name");
		}
	});
	
	/***
	This checks the generateWallet method
	length zero string input should throw an error
	***/
	it("generateWallet lengthzero", function() {
		var WalletName = "";
		var message = "";
		try {
			scope.generateWallet(WalletName);
		} catch(e) {
			message = e.message;
		} finally {
			expect(message).toBe("Improper Wallet Name");
		}
	});
	
	/***
	This checks the generateWallet method
	good input no error thrown
	WalletManager.addWallet() is called
	WalletManager.getWallets() is called
	WalletManager.getCurrentWallet() is called
	***/
	it("generateWallet named", function() {
		var WalletName = "Named";
		spyOn(mockWalletManager,"addWallet");
		spyOn(mockWalletManager,"getWallets");
		spyOn(mockWalletManager,"getCurrentWallet");
		scope.generateWallet(WalletName);
		expect(mockWalletManager.addWallet).toHaveBeenCalled();
		expect(mockWalletManager.getWallets).toHaveBeenCalled();
		expect(mockWalletManager.getCurrentWallet).toHaveBeenCalled();
	});
	
	/***
	This checks the select method
	undefined input should throw an error
	***/
	it("select undefined", function(){
        var WalletRef;
		var message = "";
		try {
			scope.select(WalletRef);
		} catch(e) {
			message = e.message;
		} finally {
			expect(message).toBe("Undefined Wallet");
		}
	});
	
	/***
	This checks the select method
	good input should not throw an error
	expects input to be stored in scope.curWallet
	WalletManager.setWalletR is called
	***/
	it("select defined", function(){
        var WalletRef = "changed";
		scope.curWallet = "not changed";
		spyOn(mockWalletManager,"setWalletR");
		scope.select(WalletRef);
		expect(scope.curWallet).toBe("changed");
		expect(mockWalletManager.setWalletR).toHaveBeenCalled();
	});

});