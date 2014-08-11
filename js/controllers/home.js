"use strict";
cApp.controller("HomeController", function($scope,$rootScope,modals,Blockchaininfo,DecentralStorage, Encryption,Wallet,WalletManager) {
	
	/*******************Home init*********************/
    $scope.pageClass = "page-home";
    $scope.message = "Choose Your Wallet";
    $scope.curWallet = WalletManager.getCurrentWallet();
	$scope.wallets = WalletManager.getWallets();
	$rootScope.curWallet = $scope.curWallet;
    $rootScope.$watch( "balance", function() {
		$scope.balance = $rootScope.balance/100000000;
    })
    var backupFile;
	$scope.currentAddress = "1Yj564jDqoB6L7hg5ETYKhqRsB65WrWPB";
	$scope.isActive = true;
	
	setTimeout(function() {
		var el = document.getElementById("first");
		angular.element(el).triggerHandler("click");
    },0);
    /*******************Home init end*****************/
	
	/***
	Helper function for download
	should be created into module
	***/
    function download(filename, data) {
        var a = document.createElement("a");
        a.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(data));
        a.setAttribute("download", filename);
        a.click();
    };

	/***
	Controller to back up current wallet
	View location is view\partials\main.html
	File download name is the wallet's name
	JSON is used to format wallet data
	***/
    $scope.backup = function() {
		var data = $scope.curWallet.getAddresses(passphrase);
		var fileName = $scope.curWallet.getName();
		download(fileName+".json", JSON.stringify(data)); 
    };

	/***
	Controller to import a wallet that was previously backed up
	View location is view\partials\main.html
	Only imports when file is properly opened
	***/
    $scope.import = function() {
		DecentralStorage.get("password", function(database) {	
			try {
				var hash = database["password"]["password"];
				
				if($rootScope.password && hash === Encryption.hash($rootScope.password)) {
					console.log($rootScope.password);
					var f = document.getElementById("file").files[0];
					if(!f) {
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
				else {
					modals.open("modalpassword", {
						"message":"Please input password",
						"databaseName":"password",
						"objectName":"password"
					});
				}
			} catch(e) {
				console.log("failed to retrieve " + e);
			} finally {
			}
		});       
    };
	
	/***
	Controller to generate new address
	View location is view\partials\main.html
	Address generated will show QR code on html
	Address will be stored in current wallet and walletmanager
	will update.
	***/
	$scope.generateAddress = function() {
		DecentralStorage.get("passphrase", function(database) {	
			try {
				var hash = database["passphrase"]["passphrase"]		
				if($rootScope.passphrase && hash === Encryption.hash($rootScope.passphrase)) {
					$scope.currentAddress = $scope.curWallet.generatePublicAddress($rootScope.passphrase);
					WalletManager.updateCurrent();
				}
				else {
					modals.open("modalpassword", {
						"message":"Please input passphrase",
						"databaseName":"passphrase",
						"objectName":"passphrase"
					});
				}
			} catch(e) {
				console.log("failed to retrieve " + e);
			} finally {
			}
		});
    };

	/***
	Controller to add a new wallet name after what user typed
	View location is view\partials\sidemenu.html
	WalletManager adds the newly created wallet
	scope.wallets updates list
	WalletManager is called to return current wallet in case user had no wallets to auto-select currently created wallet
	***/
	$scope.generateWallet = function(WalletName) {
		if(!WalletName || WalletName.length == 0) {
			throw new Error("Improper Wallet Name");
		} else {
			WalletManager.addWallet(new Wallet(WalletName));
			$scope.wallets = WalletManager.getWallets();
			$rootScope.curWallet = $scope.curWallet = WalletManager.getCurrentWallet();
		}
	};

	/***
	Controller to select current wallet in sidemenu
	View location is view\partials\sidemenu.html
	WalletManager,scope.curWallet, and rootScope.curWallet
	are all set to the selected wallet
	***/
	$scope.select = function(walletRef) {
		if(!walletRef) {
			throw new Error("Undefined Wallet");
		}
		WalletManager.setWalletR(walletRef);
		$rootScope.curWallet = $scope.curWallet = walletRef;
	};

});//end Home Controller