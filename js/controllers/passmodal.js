"use strict";

cApp.controller("passModalCtrl", ["$scope", "$rootScope", "DecentralStorage", "Encryption", "modalData", "$modalInstance", 
function($scope,$rootScope,DecentralStorage,Encryption,modalData,$modalInstance) {

	/**********passModalCtrl init***********/
	//$scope.editId=editId;
	$scope.modaltext= modalData.message;
	$scope.passwordstatus = "";
	//console.log(" test pass data " + $scope.editId);
	/**********passModalCtrl init end***********/	
	
	$scope.ok = function (submitInput) {
		var _submitInput = submitInput;
		var _data = modalData;
		DecentralStorage.get(_data.databaseName, function(database) {
			console.log(_submitInput);
			console.log(database);
			try {
				var hash = database[_data.databaseName][_data.objectName];
				console.log(hash);
				
				if(hash == Encryption.hash(_submitInput)) {
					$rootScope[_data.objectName] = _submitInput;
					console.log("passphrase " + $rootScope[_data.objectName]);
					$modalInstance.close();
				}
				else {
					$scope.passwordstatus = "incorrect password";
					console.log("incorrect password");
				}
			} catch(e) {
				console.log("failed to retrieve " + e.message);
			}
		});
	};

	$scope.cancel = function () {
	   $modalInstance.dismiss('cancel');
	};
}]);

