'use strict';
cApp.service("DecentralStorage", function($location) {

	// Storage Architecture
	// database         =>   {key  => value}
	// walletname       =>   {addr => privKey, ...}
	// archived wallets =>   {addr => privKey, ...}
	// multiaddr        =>   {transactions: Array }
	// current            =>   {currentAddress: String }
	// security         =>   { dk => decryption String }

	this.WALLETDATABASE = "ZEBANK";
	this.addresses = {};
	var saveTimeOut = 0;
    
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

	this.getSync=function(database, callback) {
		var get = function(){
			chrome.storage.local.get(database, function(data) {
				if ( data === undefined ) {
					callback( {} );
				} else {
					callback(data);
				}
			});
			saveTimeOut -= 500;
		};
		saveTimeOut += 500;
		setTimeout(get, saveTimeOut);	
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

 
	this.updateWallets = function(data, callback) {	
		var self = this;
		var _database = this.WALLETDATABASE;
		var _data = data;
		
		var store = function() {
			self.get(_database, function(ledata) {
			console.log("lewallet");

			if (ledata[_database] === undefined) {
				ledata[_database] = {};
			}		
			ledata[_database] = _data;
			console.log(ledata);
			chrome.storage.local.set(ledata);
			
			});
			saveTimeOut -= 1000;
		}
		saveTimeOut += 1000;
		setTimeout(store, saveTimeOut);	
	};
 
	this.save = function(database,walletName,data, callback) {	
		var self = this;
		var _database = database;
		var _name = walletName;
		var _data = data;
		
		var store = function() {
			self.get(_database, function(ledata) {
			console.log("lewallet");

			if (ledata[_database] === undefined) {
				ledata[_database] = {};
			}		
			ledata[_database][_name] = _data;
			console.log(ledata);
			chrome.storage.local.set(ledata);
			
			});
			saveTimeOut -= 1000;
		}
		saveTimeOut += 1000;
		setTimeout(store, saveTimeOut);	
	};
	
	this.savePlus = function(database,walletName,data,func,callback) {	
		var self = this;
		var _database = database;
		var _name = walletName;
		var _data = data;
		var _func = func;
		
		var store = function() {
			self.get(_database, function(ledata) {
			console.log("lewallet");

			if (ledata[_database] === undefined) {
				ledata[_database] = {};
			}		
			ledata[_database][_name] = _data;
			console.log(ledata);
			chrome.storage.local.set(ledata);
			});
			saveTimeOut -= 1000;
			_func();
		}
		saveTimeOut += 1000;
		setTimeout(store, saveTimeOut);	
	};
	
	this.saveWallet = function(wallet, index, callback) {
		console.log(wallet);
		this.save(this.WALLETDATABASE, index, wallet);
	};


	this.remove = function(wallet, index, callback) {
		var object={};
		object=wallet[index];
		console.log(wallet[index]);
		chrome.storage.local.clear(object);
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
 


