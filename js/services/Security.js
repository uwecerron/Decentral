"use strict";
cApp.service("Security" , ["$rootScope", "DecentralStorage", "Encryption", function($rootScope, DecentralStorage, Encryption){
	
	this.check = function(input,databaseName,objectName) {
		var _input = input;
		var _databaseName = databaseName;
		var _objectName = objectName;
		
		DecentralStorage.get(_databaseName, function(database) {	
			try {
				var hash = database[_databaseName][_objectName];
				if($rootScope[_objectName] && hash === Encryption.hash($rootScope[_objectName])) {
					_input.success();
				}
				else {
					_input.fail();
				}
			} catch(e) {
				console.log("failed to retrieve " + e);
			} finally {
			}
		}); 
	};

}]);