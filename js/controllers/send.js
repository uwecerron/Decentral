"use strict";
function SendController($scope,modals,$rootScope,Wallet,WalletManager){
	
	/****SendController init************/
	$scope.pageClass = 'page-send';
	$scope.item = {};
	$scope.inputAddress='';
	$scope.inputAmount='';
	$scope.changeAsset= function(option){

	};
	/****SendController init end************/
    //check balance
    $rootScope.$watch( 'balance', function() {
		$scope.balanceInt = $rootScope.balanceInt
		$scope.balance = $rootScope.balance
    });

    var satoshies=100000000;

    $scope.send = function(item) {
		var value=$scope.inputAmount * satoshies;
		var formData ={
		addr:$scope.inputAddress,
		amount:value
		}
		modals.password();
		console.log(formData);
		WalletManager.getCurrentWallet().buildTransaction(formData,function(data){
		console.log(data);
		});  
    };  
}
