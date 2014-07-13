"use strict";


function AssetsController($scope,DecentralStorage,WalletManager)  {
   $scope.pageClass = 'page-assets';
    $scope.items = WalletManager.getCurrentWallet().getAllAssets();
    $scope.item = {};
	$scope.addAssetShow = false;
   var ledecentral = DecentralStorage;
   
   var values ={Name: "Burger2 King2", BTC: "1200",Address:"mhRYQjHSu4QQRr8yi5m2eiSznsUt4HrJSy", Units: "5"};
    ledecentral.save( "address", values);
    ledecentral.getall();


    $scope.addItem = function(item) {
       var privateKeyBytes = createPrivateKeyBytes();
      var key = new Bitcoin.ECKey( privateKeyBytes );
       $scope.item.Address =key.getBitcoinAddress().toString();
      $scope.item = {};    
      $scope.itemForm.$setPristine();
      
      //$scope.$apply( function() {
     
    };
   
    $scope.totalBTC = WalletManager.getCurrentWallet().getBalance();
    
  
    $scope.mySortFunction = function(item) {
      if(isNaN(item[$scope.sortExpression]))
        return item[$scope.sortExpression];
      return parseInt(item[$scope.sortExpression]);
    };
    
      /*$scope.removeItem = function(index){
      ReceiveTable.removeItem(index);
    };*/
    
    $scope.name=/^[a-zA-Z ]*$/;
    
	$scope.integerval=/^\d*$/;
}