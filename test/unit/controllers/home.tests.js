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
    
    it('Choose a Wallet', function(){
        expect(scope.message).toBe('Choose Your Wallet');
    });
    
    it('backup a Wallet', function(){
        
        //expect(scope.message).toBe('Choose Your Wallet');
    });
    
    it('import a Wallet', function(){
        //expect(scope.message).toBe('Choose Your Wallet');
    });

    it('Home Bitcoin Balance', function(){
        //expect(scope.message).toBe('Choose Your Wallet');
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