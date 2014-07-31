"use strict";
cApp.controller("AssetsController",function($scope,Asset,DecentralStorage,WalletManager)  {
    $scope.pageClass = 'page-assets';
    $scope.items = WalletManager.getCurrentWallet().getAllAssets();
	
  	$scope.addAssetShow = false;
    $scope.addItem = function(item) {
		var hash = WalletManager.getCurrentWallet().generatePublicAddress();
		var newAsset = new Asset(item["Name"],item["BTC"],item["Units"],hash);
		$scope.itemForm.$setPristine();   
		WalletManager.getCurrentWallet().addAsset(newAsset);
		$scope.items = WalletManager.getCurrentWallet().getAllAssets();
		WalletManager.updateCurrent();

	};
   
    $scope.totalBTC = WalletManager.getCurrentWallet().getBalance();
    $scope.mySortFunction = function(item) {
      if(isNaN(item[$scope.sortExpression]))
        return item[$scope.sortExpression];
      return parseInt(item[$scope.sortExpression]);
    };
    
    $scope.name=/^[a-zA-Z ]*$/;
    
	$scope.integerval=/^\d*$/;
});