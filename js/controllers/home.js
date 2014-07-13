 cApp.controller('Home', function($scope, $rootScope,Blockchaininfo,Wallet,TransactionFetcher, WalletManager, DecentralStorage) {

    $scope.pageClass = 'page-home';
    $scope.message = 'Choose Your Wallet';
    $scope.wallets = [];
    $rootScope.$watch( 'balance', function() {
    $scope.balance = $rootScope.balance/100000000;
    })
   $scope.currentAddress = "1Yj564jDqoB6L7hg5ETYKhqRsB65WrWPB";
    var wallet1=new Wallet("uwe1");	
	/*
	var alist=[{"id":"1","name":"name 1","address":"description 1","balance":"field3 1","token":"field4 1"},
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
	for(var stuff in alist)
	{
		wallet1.addAddress(alist[stuff]);
	}
	WalletManager.addWallet(wallet1);
	*/
	
	var sampleTransactions = [
        {"id":"1","from":"sad","to":"hash 2","amount":"tran hash","token":"2"},
          {"id":"1","from":"qqw","to":"hash 2","amount":"tran hash","token":"5"},
            {"id":"1","from":"weef","to":"hash 2","amount":"tran hash","token":"6"},
              {"id":"1","from":"hash6","to":"hash 2","amount":"tran hash","token":"1"},
                {"id":"1","from":"ffffhasffh5","to":"hash 2","amount":"tran hash","token":"2"},
                  {"id":"1","from":"zzzzhash8","to":"hash 2","amount":"tran hash","token":"3"},
                    {"id":"1","from":"aaaahash9","to":"hash 2","amount":"tran hash","token":"1"}
         
   ];
	
	var initializationStuff = function() {
	
		var initWalletManager = function() {
			var ret = DecentralStorage.retriveWallets();
			var inner = function() {			
				WalletManager.init();
				$scope.wallets = WalletManager.getWallets();
				if(WalletManager.getCurrentWallet().getTransactions().length == 0) {
					for(var index in sampleTransactions) {
						WalletManager.getCurrentWallet().addTransaction(sampleTransactions[index]);
					}
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

    //var Block2= new Blockchaininfo();
    //var addresses=['1Af7Xx9hpqS2GBLY6swqe2fsMmNgPxzAPk','1Yj564jDqoB6L7hg5ETYKhqRsB65WrWPB'];
    //Block2.multiAddr(addresses);

    function download(data) {
    var a = document.createElement("a");
     var backup = "data:text/csv;charset=utf-8,";
        backup += escape(data);
        a.href= backup;
        a.click();
    };



    $scope.backup= function(){
     var data =  wallet1.getWallet();
      download(data);
    }
    setTimeout(function() {
      var el = document.getElementById('first');
       angular.element(el).triggerHandler('click');
    },0);

     var obj = {a: 123, b: "4 5 6"};
     var data = {a:1, b:2, c:3};
    //var json = JSON.stringify(wallet1.Addresses);
    
    $scope.downloadWallet = function(){
      console.log('downloaded');
      console.log(wallet1.Addresses);
      chrome.downloads.download(obj);
        return new Blob([wallet1.Addresses], {type: "application/json"});
        
    }
   $scope.generateLeAddress = function() {
      $scope.currentAddress =  WalletManager.getCurrentWallet().generatePublicAddress();
	  WalletManager.update(WalletManager.curWallet);
    }
	
	$scope.generateWallet = function(WalletName) {
		if(!WalletName || WalletName.length == 0) {
			console.log("meh");
		} else {
			console.log(WalletName);
			var wallet = new Wallet(WalletName);
       $scope.wallets.push({name: WalletName});
			WalletManager.addWallet(wallet);
			console.log(WalletManager.numWallets());
		}
	}

  $scope.select = function(index) {
      console.log(index)
  };
  $scope.remove = function(index) {
      data.push($scope.wallets.splice(index, 1)[0]);
  };
	
  //} )
});//end Home Controller