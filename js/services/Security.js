"use strict";
cApp.service("Security" , ["$rootScope", "DecentralStorage", "Encryption", function($rootScope, DecentralStorage, Encryption){
	
	
	this.SecurityLevel = Object.freeze({low:0,medium:1});
	var currentLevel = this.SecurityLevel.low;
	var securityValues = {};
	
	this.check = function(input,databaseName,objectName) {
		var _input = input;
		var _databaseName = databaseName;
		var _objectName = objectName;
		
		DecentralStorage.get(_databaseName, function(database) {	
			try {
				var hash = database[_databaseName][_objectName];
				if(_input.check && hash === Encryption.hash(_input.check)) {
					console.log("success");
					_input.success();
				}
				else {
					console.log("failed");
					_input.fail();
				}
			} catch(e) {
				console.log("failed to retrieve " + e);
			} finally {
				console.log(_input.check);
			}
		}); 
	};
	
	this.get = function(objectName) {
		if(currentLevel == this.SecurityLevel.low)
			return securityValues[objectName];
	};
	
	this.set = function(objectName, objectValue) {
		if(currentLevel == this.SecurityLevel.low)
			securityValues[objectName] = objectValue;
	}; 

}]);