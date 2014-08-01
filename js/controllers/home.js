cApp.controller('Home', function($scope,$rootScope,modals,Blockchaininfo,Wallet,WalletManager,DecentralStorage) {
	
	/*******************Home init*********************/
    $scope.pageClass = 'page-home';
    $scope.message = 'Choose Your Wallet';
    $scope.curWallet = WalletManager.getCurrentWallet();
	$scope.wallets = WalletManager.getWallets();
	$rootScope.curWallet = $scope.curWallet;
    $rootScope.$watch( 'balance', function() {
    $scope.balance = $rootScope.balance/100000000;
    })
    var backupFile;
	$scope.currentAddress = "1Yj564jDqoB6L7hg5ETYKhqRsB65WrWPB";
	$scope.isActive = true;
	
	setTimeout(function() {
		var el = document.getElementById('first');
		angular.element(el).triggerHandler('click');
    },0);
    /*******************Home init end*********************/
	
	/*export current wallet*/
    function download(filename, data) {
        var a = document.createElement('a');
        a.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(data));
        a.setAttribute('download', filename);
        a.click();
    }

    $scope.backup= function(){
		var data = wallet1.getAddresses();
		var fileName = wallet1.Name;
		download(fileName+'.json', JSON.stringify(data)); 
    }

    $scope.import = function(){
        modals.open('modalpassword');
        var f = document.getElementById('file').files[0];
        if(!f){
            return;
          }
        var r = new FileReader();
        r.onload = function(e){
            backupFile = e.target.result;
            console.log(backupFile)
            $scope.fileLoaded = true;
        } 
        r.readAsText(f);
    }
    
    $scope.downloadWallet = function(){
		console.log('downloaded');
		console.log(wallet1.Addresses);
		chrome.downloads.download(obj);
		return new Blob([wallet1.Addresses], {type: "application/json"});
        
    }
	
	$scope.generateAddress = function() {
		$scope.currentAddress =  WalletManager.getCurrentWallet().generatePublicAddress();
		WalletManager.update(WalletManager.curWallet);
    }

	$scope.generateWallet = function(WalletName) {
		if(!WalletName || WalletName.length == 0) {
			throw new Error("Improper Wallet Name");
		} else {
			var wallet = new Wallet(WalletName);
			WalletManager.addWallet(wallet);
			$scope.wallets = WalletManager.getWallets();
			$rootScope.curWallet = $scope.curWallet;
		}
	}

	$scope.select = function(walletRef) {
		if(!walletRef) {
			throw new Error("Undefined Wallet");
		}
		WalletManager.setWalletR(walletRef);
		$scope.curWallet = walletRef;
		$rootScope.curWallet = $scope.curWallet;
	};
	
	$scope.remove = function(index) {
		data.push($scope.wallets.splice(index, 1)[0]);
	};

  //} )
});//end Home Controller