'use strict';
cApp.service("DecentralStorage", function() {

	// Storage Architecture
	// database         =>   {key  => value}
	// walletname       =>   {addr => privKey, ...}
	// archived wallets =>   {addr => privKey, ...}
	// multiaddr        =>   {transactions: Array }
	// current            =>   {currentAddress: String }
	// security         =>   { dk => decryption String }


	
	this.addresses = {};
	    
	//dummy array  
	this.get=function(database, callback) {
		chrome.storage.local.get(database, function(data) {
		if ( data === undefined ) {
			callback( {} );
		} else {
			callback(data);
		}
		});
	};

	/*
	  *Get All Addresses from the database
	  *@param{Function} callback providing results 
	*/
	this.getall=function(callback){
		chrome.storage.local.get(null, function(obj) {
					  if ( obj === undefined ) {
			callback( {} );
		  } else {
			var keys = Object.keys(obj);
		   console.log(obj);
		   callback(obj)
		 }
		})
	};
	/*
	 * Save data into the database.
	 * @param {String} wallet database.
	 * @param {String} name wallet property name  key.
	 * @param {Object} object data or value
	 * @param {Function} callback Callback providing results for the function.
	 * @private
	 */
	//dummy array {'security':{'wallet1': {key:'crapper',pass:'crapper2'}}}

	var saveTimeOut = 0;
 
	this.save = function(database,name,data, callback) {
		
		
		var self = this;
		var _database = database;
		var _name = name;
		var _data = data;
		
		var store = function() {
			self.get(_database, function(ledata) {
			console.log("lewallet");
			//console.log(ledata);
			var setObject = {};
			if (ledata[_database] !== undefined){

				if(ledata[_database][_name] !== undefined)
				setObject = ledata[_database][_name];
			}
			else ledata[_database] = {};
			console.log("already in");
			console.log(setObject);
			for(var key in _data)
			{
				setObject[key] = _data[key]
			}
			
			ledata[_database][_name] = setObject;
			console.log(setObject);
			//setObject[name]={}
			//setObject.database.name=_name;
			//setObject.database.name.data=_data;
			//  console.log('set: '+JSON.stringify(setObject))
			chrome.storage.local.set(ledata);
			
			});
			saveTimeOut -= 1000;
		}
		saveTimeOut += 1000;
		setTimeout(store, saveTimeOut);
		
	};

	/*
	 * Get the storage space size database uses
	 * @param {String} name Identity identifier.
	 * @param {Function} callback Callback providing results for the function.
	 */
	this.getSize = function(database, callback) {
		chrome.storage.local.getBytesInUse(database, callback);
	};

	/*
	 * clear database 
	 */
	this.clear = function() {
		chrome.storage.local.clear();
		this.addresses = {};
	};

});

   // Decentralstorage.remove();
    //chrome.storage.local.remove("cache");
//console.log(value)

   // var module = angular.module("movieModels");
    //module.value("Movie", Movie);
 


