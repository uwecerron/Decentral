 function InitController($scope,Wallet, WalletManager, DecentralStorage) {


	var sampleAddresses=[{"id":"1","name":"name 1","address":"description 1","balance":"field3 1","token":"field4 1"},
         {"id":"1","name":"name 1","address":"description 1","balance":"field3 1","token":"field4 1"},
          {"id":"1","name":"2 1","address":"description 1","balance":"field3 1","token":"field4 1"},
           {"id":"1","name":"name 1","address":"description 1","balance":"field3 1","token":"field4 1"},
            {"id":"1","name":"name 1","address":"description 1","balance":"field3 1","token":"field4 1"},
             {"id":"1","name":"name 1","address":"description 1","balance":"field3 1","token":"field4 1"},
              {"id":"1","name":"name 1","address":"description 1","balance":"field3 1","token":"field4 1"},
               {"id":"1","name":"name 1","address":"description 1","balance":"field3 1","token":"field4 1"},
                {"id":"1","name":"name 1","address":"description 1","balance":"field3 1","token":"field4 1"},
                 {"id":"1","name":"name 1","address":"description 1","balance":"field3 1","token":"field4 1"},
                  {"id":"1","name":"name 1","address":"description 1","balance":"field3 1","token":"field4 1"},
             {"id":"1","name":"neeeeame 1","address":"description 1","balance":"field3 1","token":"field4 1"}];
	
	
	var sampleTransactions = [
        {"id":"1","from":"sad","to":"hash 2","amount":"tran hash","token":"2"},
          {"id":"1","from":"qqw","to":"hash 2","amount":"tran hash","token":"5"},
            {"id":"1","from":"weef","to":"hash 2","amount":"tran hash","token":"6"},
              {"id":"1","from":"hash6","to":"hash 2","amount":"tran hash","token":"1"},
                {"id":"1","from":"ffffhasffh5","to":"hash 2","amount":"tran hash","token":"2"},
                  {"id":"1","from":"zzzzhash8","to":"hash 2","amount":"tran hash","token":"3"},
                    {"id":"1","from":"aaaahash9","to":"hash 2","amount":"tran hash","token":"1"}
         
    ];
	
	var sampleAssets = [
		{Name: "XYZ Corp", BTC: "25",Address:"mhRYQjHSu4QQRr8yi5m2eiSznsUt4HrJSy", Units: "10"},
		{Name: "Land", BTC: "50",Address:"mhRYQjHSu4QQRr8yi5m2eiSznsUt4HrJSy", Units: "15"},
		{Name: "Burger King", BTC: "100",Address:"mhRYQjHSu4QQRr8yi5m2eiSznsUt4HrJSy", Units: "5"}
	];
	
	DecentralStorage.clear();
	var initializationStuff = function() {
	
		var initWalletManager = function() {
			var ret = DecentralStorage.retriveWallets();
			var inner = function() {			
				WalletManager.init();
				$scope.wallets = WalletManager.getWallets();
				WalletManager.addWallet(new Wallet("herro"));
				WalletManager.addWallet(new Wallet("herro2"));
				if(WalletManager.getCurrentWallet().getTransactions().length == 0) {
					for(var index in sampleTransactions) {
						WalletManager.getCurrentWallet().addTransaction(sampleTransactions[index]);
					}
					WalletManager.updateCurrent();
				}
				if(WalletManager.getCurrentWallet().getAllAssets().length == 0) {
					for(var index in sampleAssets) {
						WalletManager.getCurrentWallet().addAsset(sampleAssets[index]);
					}
					WalletManager.updateCurrent();
				}
				if(WalletManager.getCurrentWallet().getAddresses().length == 0) {
					for(var index in sampleAddresses) {
						WalletManager.getCurrentWallet().addAddress(sampleAddresses[index]);
					}
					WalletManager.updateCurrent();
				}
				
				//console.log(WalletManager.getCurrentWallet());
				//console.log(wallet1);
				//WalletManager.updateAll();
			};
			setTimeout(inner, 400);
			//WalletManager.removeWallet(1);
		};
		setTimeout(initWalletManager, 500);
	}
	initializationStuff();
	

};