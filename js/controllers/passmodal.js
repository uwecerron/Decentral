"use strict";

cApp.controller("passModalCtrl", ["$scope", "$rootScope", "DecentralStorage", "Encryption", "modalData", "$modalInstance", "Security", 
function($scope,$rootScope,DecentralStorage,Encryption,modalData,$modalInstance, Security) {

	/**********passModalCtrl init***********/
	//$scope.editId=editId;
	$scope.modaltext= modalData.message;
	$scope.passwordstatus = "";
	//console.log(" test pass data " + $scope.editId);
	/**********passModalCtrl init end***********/	
	
	$scope.ok = function (submitInput) {
		var checkPassword = {
			check : submitInput,
			success : function() {
				Security.set(modalData.objectName, submitInput);
				$modalInstance.close(submitInput);
			},
			fail : function() {
				$scope.passwordstatus = "incorrect password";
			}
		};
		Security.check(checkPassword,modalData.databaseName,modalData.objectName);
	};

	$scope.cancel = function () {
	   $modalInstance.dismiss('cancel');
	};
}]);

