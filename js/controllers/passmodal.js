"use strict";
cApp.controller("passModalCtrl", function($scope,$rootScope,DecentralStorage) {

	/**********passModalCtrl init***********/
	$scope.modaltext="Password"
	/**********passModalCtrl init end***********/

	$scope.ok = function (passphrase) {
		var _passphrase = passphrase;
		DecentralStorage.get("passphrase", function(database) {
			console.log(_passphrase);
			
			try {
				var hash = database["passphrase"]["passphrase"];
				console.log(hash + hash.length);
				
				if(hash == Encryption.encrypt(_passphrase)) {
					$rootScope.passphrase = _passphrase;
					console.log(_passphrase);
				}
				else {
					console.log("incorrect password");
				}
			} catch(e) {
				console.log("failed to retrieve");
			}
		});
	};

	$scope.cancel = function () {
	   console.log("close")
	};
});

