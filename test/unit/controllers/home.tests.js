'use strict';
 
describe('HomeController', function(){
    var scope;//we'll use this scope in our tests
 
    //mock Application to allow us to inject our own dependencies
    beforeEach(angular.mock.module('DecentralWallet'));

    //mock the controller for the same reason and include $rootScope and $controller
    beforeEach(angular.mock.inject(function($rootScope, $controller){
        //create an empty scope
        scope = $rootScope.$new();
        //declare the controller and inject our empty scope
        $controller('HomeController', {$scope: scope});
    }))
    // tests start here
    
    it('_Homeinit', function(){
        expect(scope.message).toBe('Choose Your Wallet');
		expect(scope.pageClass).toBe('page-home');
    });
    
    it('backup', function(){
		var getAddressesCalled = false;
		var	getNameCalled = false;
        scope.curWallet = {};
		scope.curWallet.getAddresses = function(){
			getAddressesCalled = true;
		};
		scope.curWallet.getName = function(){
			getNameCalled = true;
		};
		
		scope.backup();
		expect(getAddressesCalled).toBe(true);
		expect(getNameCalled).toBe(true);
    });
    
    it('import', function(){
        //expect(scope.message).toBe('Choose Your Wallet');
    });

	it("generateWallet undefined", function() {
		var WalletName;
		try {
			scope.generateWallet(WalletName);
		} catch(e) {
			expect(e.message).toBe("Improper Wallet Name");
		}	
	});
	
	it("generateWallet lengthzero", function() {
		var WalletName = "";
		try {
			scope.generateWallet(WalletName);
		} catch(e) {
			expect(e.message).toBe("Improper Wallet Name");
		}	
	});
	
	it('select undefined', function(){
        var WalletRef;
		try {
			scope.select(WalletRef);
		} catch(e) {
			expect(e.message).toBe("Undefined Wallet");
		}
	});
	
	it('select defined', function(){
        var WalletRef = "changed";
		scope.curWallet = "not changed";
		scope.select(WalletRef);
		expect(scope.curWallet).toBe("changed");
	});

    /*it('generate an Address', function(){
       WalletManager.setWalletR('sad');
        scope.generateAddress();
        var validate = function validate(address) {
            try{
                var bytes = new Bitcoin.Address.fromBase58Check(address);
                return true;
            }catch(e){
                return false;
            }
        }
    });*/
});