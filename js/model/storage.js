'use strict';

cApp.factory("Decentralstorage", function() {
angular.element($window).on('cache', function(event) {
    if (event.key === 'storage') {
      $rootScope.$apply();
    }
  });
var Decentralstorage= function() {
    this.addresses = {};
    //this.loadWallets();
}    
/*
  
          remove: function( leobject, key, callback ) {
    var self = this;
    self.get( leobject, function( data ) {
      delete data[ key ];

      setObject = {};
      setObject[ leobject ] = data;

      chrome.storage.local.set( setObject, function() {
        if ( callback === undefined ) {
          callback = function() {};
        }
        callback();
      } );

    } )
  },
 
*/

Decentralstorage.prototype.get=function( name, callback) {

    chrome.storage.local.get(name, function( data ) {
    if ( data === undefined ) {
      callback( {} );
      } else {
      callback(data[name]);
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
       console.log(obj);
       return obj;
     }
    })


}


/*
 * Save an identity into the database.
 * @param {String} name Identity identifier.
 * @param {Object} data Identity data (mapping).
 * @param {Function} callback Callback providing results for the function.
 * @private
 */
Decentralstorage.prototype.save = function(name, key, value, callback) {
    var self = this;
    self.get(name, function( data ) {
      if ( data === undefined ) {
        data = {}
      };

      if ( data.constructor !== Object ) {
        throw Error( "can't set on not object" )
      }

      data[key] = value;
      console.log('set: '+data[ key ])
      setObject = {};
      setObject[name] = data;

      chrome.storage.local.set( name, function() {
        if ( callback === undefined ) {
          callback = function() {};
        }
        callback( data );
      } );
    } )

};
/*
 * Get the storage space the identity uses
 * @param {String} name Identity identifier.
 * @param {Function} callback Callback providing results for the function.
 */

Decentralstorage.prototype.getSize = function(name, callback) {
    name = name ? DW_NS+name : null;
    chrome.storage.local.getBytesInUse(name, callback);
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
 


