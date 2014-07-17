 function InitController($rootScope, $scope,$location,Wallet, WalletManager, DecentralStorage,Blockchaininfo) {

var storage= DecentralStorage;
$scope.submit=function(){
	console.log($scope.password);
    DecentralStorage.save('security','password',$scope.password);
    $scope.css='error';
    WalletManager.isAuthenticated=true;
    $location.path("/Home")
}

	var good = function() {
		DecentralStorage.get(DecentralStorage.WALLETDATABASE, function(database) {
			if(database) {
				var rawData = database[DecentralStorage.WALLETDATABASE];
				WalletManager.init(rawData);
				$rootScope.$apply(function() {
					$location.path("/Home");
				});
			}
			else {
				console.log("failed to retrieve");
			}
		});
	}

};

/*var sampleAddresses=[{"id":"1","name":"name 1","address":"description 1","balance":"field3 1","token":"field4 1"},
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
	*/