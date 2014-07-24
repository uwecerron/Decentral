'use strict';

cApp.service('Session', function($rootScope,$location,DecentralStorage,WalletManager) {

	this.initialize = function() {
		DecentralStorage.save("session","session",1);
		DecentralStorage.get(DecentralStorage.WALLETDATABASE, function(database) {
			if(database) {
				var rawData = database[DecentralStorage.WALLETDATABASE];
				WalletManager.init(rawData);
				$rootScope.$apply(function() {
					//$scope.page++;
					//var mnemonic = new Mnemonic(128);
					//console.log(mnemonic.toWords().join(' '));
					//$scope.mnemonic = mnemonic.toWords().join(' ');
					$location.path("/Home");
				});
			}
			else {
				console.log("failed to retrieve");
			}
		});
	},
	
	this.isAuthenticated = function() {
		console.log("in auth");
		var _init = this.initialize;
		DecentralStorage.getSync("session",function(database){
			console.log(database["session"]["session"]);
			if(database["session"]["session"] == 1)
			{
				console.log("init");
				_init();
			}
		});
	},
	
	this.end = function() {
		DecentralStorage.savePlus("session","session",0,
		function(){
			$rootScope.$apply(function() {
				$location.path("/login");
			});
		});
		WalletManager.reset();		
	}

});
