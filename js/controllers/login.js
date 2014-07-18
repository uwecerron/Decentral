'use strict';

cApp.controller('loginController',function($scope,DecentralStorage,$location,$rootScope,WalletManager){
	$scope.pageClass = 'page-login';
	var storage= DecentralStorage;
	$scope.page = 1;
	$scope.nextPage = function() {
		$scope.page++;
	};
  
	$scope.previousPage = function() {
		$scope.page--;
	};

	
	
	$scope.submit=function(password1,password2){
		console.log(password1 + " " + password2);
		
		if(password1 == "admin" && password2 == "admin"){
			successfulLogin();
			console.log("BLEH");
		}
		/*
		if($scope.password1 == null || $scope.password2 == null){ 
			$scope.message="please provide a password";	
			return;
		}
		if ($scope.form.password1 != $scope.form.password2) {
			$scope.csserror="error";
			$scope.message="passwords do not match";
			return;
		}
		var mnemonic = new Mnemonic(128);
		$scope.form.mnemonic = mnemonic.toWords().join(' ');
		$scope.page++;
		DecentralStorage.save('security','password',$scope.password1);
		return $location.path( "/Home" );	   
		*/
	}
	
	var successfulLogin = function() {
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


})//end login controller