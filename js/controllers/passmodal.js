"use strict";
cApp.controller("passModalCtrl", function($scope,$rootScope,DecentralStorage,Encryption) {

	/**********passModalCtrl init***********/
	$scope.modaltext="Password"
	/**********passModalCtrl init end***********/

	$scope.ok = function (passphrase) {
		var _passphrase = passphrase;
		DecentralStorage.get("passphrase", function(database) {
			console.log(_passphrase);
			console.log(database);
			try {
				var hash = database["passphrase"]["passphrase"];
				console.log(hash);
				
				if(hash == Encryption.hash(_passphrase)) {
					$rootScope.passphrase = _passphrase;
					console.log("passphrase " + $rootScope.passphrase);
				}
				else {
					console.log("incorrect password");
				}
			} catch(e) {
				console.log("failed to retrieve " + e.message);
			}
		});
	};

	$scope.cancel = function () {
	   console.log("close")
	};
});

