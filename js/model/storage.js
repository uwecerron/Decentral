'use strict';
cApp.factory("Decentralstorage", function() {

  // Storage Structure

// database         =>   { key  => value }
// name             =>   keys
// object           =>   values
// wallet           =>   { addr => privKey, addr2=>privKey2 .... }
// archived         =>   { addr => privKey, addr2=>privKey2 .... }
// security         =>   { decryption_key => dk }
// multiaddr        =>   { transactions: Array }
// cache            =>   { currentAddress: String }

var Decentralstorage= function() {
    this.addresses = {};
}    
//dummy array  
Decentralstorage.prototype.get=function(database, callback) {
    chrome.storage.local.get(database, function(data) {
    if ( data === undefined ) {
      callback( {} );
      } else {
      callback(data);
      }
    } );
  },

 /*
  *Get All Addresses from the database
  *@param{Function} callback providing results 
 */
Decentralstorage.prototype.getall=function(callback){
    chrome.storage.local.get(null, function(obj) {
                  if ( obj === undefined ) {
        callback( {} );
      } else {
        var keys = Object.keys(obj);
       //console.log(obj);
       callback(obj)
     }
    })
}
/*
 * Save data into the database.
 * @param {String} wallet database.
 * @param {String} name wallet property name  key.
 * @param {Object} object data or value
 * @param {Function} callback Callback providing results for the function.
 * @private
 */
 //dummy array {'security':{'wallet1': {key:'crapper',pass:'crapper2'}}}

Decentralstorage.prototype.save = function(database,name,data, callback) {
    var self = this;
    var _database=database;
    var _name=name;
    var _data ={};
    _data=data;
    self.get(database, function(data) {
      if ( data === undefined ){
        data = [];
      };if (data.constructor !== Object) {
        throw Error("can't save object");
      }
      var setObject = {};
      var ledata={};
       ledata[name]=_data;
       setObject[_database]=ledata;
       //setObject[name]={}
       //setObject.database.name=_name;
       //setObject.database.name.data=_data;
      console.log(setObject)
  //  console.log('set: '+JSON.stringify(setObject))
      chrome.storage.local.set(setObject, function() {
        if ( callback === undefined ) {
          callback = function() {};
        }
        callback(data);
      });
    })
};
/*
 * Get the storage space size database uses
 * @param {String} name Identity identifier.
 * @param {Function} callback Callback providing results for the function.
 */
Decentralstorage.prototype.getSize = function(database, callback) {
    chrome.storage.local.getBytesInUse(database, callback);
};

/*
 * clear database 
 */
Decentralstorage.prototype.clear = function() {
    chrome.storage.local.clear();
    this.addresses = {};
};

return Decentralstorage;

});

   // Decentralstorage.remove();
    //chrome.storage.local.remove("cache");
//console.log(value)

   // var module = angular.module("movieModels");
    //module.value("Movie", Movie);
 


