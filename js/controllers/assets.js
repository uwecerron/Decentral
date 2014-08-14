"use strict";
cApp.controller("AssetsController",function($scope,Asset,WalletManager)  {
    
	/************************Assets init*************************/
	$scope.pageClass = 'page-assets';
    $scope.items = WalletManager.getCurrentWallet().getAllAssets();
	$scope.name=/^[a-zA-Z ]*$/;
	$scope.integerval=/^\d*$/;
  	$scope.addAssetShow = false;
	$scope.totalBTC = WalletManager.getCurrentWallet().getBalance();
	/************************Assets init end***********************/
    
	$scope.addItem = function(item) {
		if(!item || !item["Name"] || !item["BTC"] || !item["Units"]) {
			throw new Error("Improper input");
		}
		
		var hash = WalletManager.getCurrentWallet().generatePublicAddress();
		var newAsset = new Asset(item["Name"],item["BTC"],item["Units"],hash);
		$scope.itemForm.$setPristine();   
		WalletManager.getCurrentWallet().addAsset(newAsset);
		$scope.items = WalletManager.getCurrentWallet().getAllAssets();
		WalletManager.updateCurrent();
	};
    
    $scope.mySortFunction = function(item) {
      if(isNaN(item[$scope.sortExpression]))
        return item[$scope.sortExpression];
      return parseInt(item[$scope.sortExpression]);
    };
    
});