'use strict';
cApp.factory( "Blockchaininfo", function($http) {

var Blockchain= function($http){
  this.url='https://blockchain.info/';
};
/*
 * Retrieves multiple addresses info
 * @param {String} Bitcoin addresses array
 * @param {Function} callback Function that will be called with multiAddr
 */

Blockchain.prototype.multiAddr=function(addresses, callback){
   var _url = this.url;
  $http({method: 'GET', url: _url+'/multiaddr?active='+addresses.join( '|' ),headers : { 'Content-Type': 'application/x-www-form-urlencoded' }}).
    success(function(data, status, headers, config) {
      console.log(data);
    }).
    error(function(data, status, headers, config) {
      console.log(data);
    });

}
/*
 * Gets all unspent outputs through blockchain.info
 * @param {String} Bitcoin addresses array
 * @param {Function} callback Function that will be called with getUnspent
 */

  Blockchain.prototype.getUnspent= function( addresses, callback ) {
    var _url = this.url;
      $http({method: 'GET', url: _url + 'unspent?active='+addresses.join('|'),headers : { 'Content-Type': 'application/x-www-form-urlencoded' }}).
    success(function(data, status, headers, config) {
      console.log(data);
    }).
    error(function(data, status, headers, config) {
      console.log(data);
    });
  }

 /*
  * Broadcast transaction using blockchain.ino
  * @param {String} tx_serialized hex code
  * @param {String} tx_hash transaction hash
  * @param {function} callback Function that will be called with getUnspent
  */
Blockchain.prototype.pushTx =function( tx_serialized, tx_hash, callback ) {
    var _url = this.url;

    var post_data = {
      format: "plain",
      tx: tx_serialized,
      hash: tx_hash,
      cors: "true",
    };

      $http({method: 'POST', url: _url + 'pushtx',data:post_data,headers : { 'Content-Type': 'application/x-www-form-urlencoded' }}).
    success(function(data, status, headers, config) {
      console.log(data);
    }).
    error(function(data, status, headers, config) {
      console.log(data);
    });
  }


return Blockchain;
});//end factory

