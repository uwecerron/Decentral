'use strict';

cApp.controller('loginController',function($scope,DecentralStorage,$location,$rootScope,WalletManager,Session,Encryption){
	
	/**********login init***********/
	$scope.pageClass = 'page-login';
	var storage= DecentralStorage;
	var password;
	$scope.page = 1;
	$scope.form = {};
	/**********login init end***********/
	
	$scope.nextPage = function() {
		$scope.page++;
	};
  
	$scope.previousPage = function() {
		$scope.page--;
	};

	Session.isAuthenticated();
	
	
	$scope.login=function(password1,password2) {
		if(password1 && password2 && password1 === password2) {
				DecentralStorage.get("password", function(database) {
				if(database) {
					var hash = database["password"]["password"];
					console.log(hash + hash.length);
					if(hash == Encryption.encrypt(password1)) {
						Session.initialize();
					}
					else {
						alert("incorrect password");
					}
				}
				else {
					console.log("failed to retrieve");
				}
			});
		}
	};
	
	$scope.submit=function(password1,password2) {
		console.log(password1 + " " + password2);
		if(password1 && password2 && password1 === password2) {
			password = password1;
			$scope.nextPage();
			var mnemonic = new Mnemonic(128);
			console.log(mnemonic.toWords().join(' '));
			$scope.mnemonic = mnemonic.toWords().join(' ');
		}
	};

	$scope.wordsSubmit = function() { 
		DecentralStorage.save("password","password",Encryption.encrypt(password));
		Session.initialize();
	};

});//end login controller