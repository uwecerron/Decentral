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
      callback(data);
    }).
    error(function(data, status, headers, config) {
      callback(data);
    });
}

/*
 * Gets latest block count in blockchain
 * @param {Function} callback Function that will be called with getBlockCount
 */
Blockchain.prototype.getBlockCount = function(callback) {
  var _url = this.url;
  $http({method: 'GET', url: _url+'/latestblock',headers : { 'Content-Type': 'application/x-www-form-urlencoded' }}).
    success(function(data, status, headers, config) {
      callback(status,data);
    }).
    error(function(data, status, headers, config) {
      callback(status,data);
    });
}

/*
 * Gets raw transaction by transaction hash
 * @param {String} tx Transaction hash in hex
 * @param {Function} callback Function that will be called with getTx
 */
Blockchain.prototype.getTx = function(tx, callback) {
  var _url = this.url;
  $http({method: 'GET', url: _url+'/rawtx/'+tx,headers : { 'Content-Type': 'application/x-www-form-urlencoded' }}).
    success(function(data, status, headers, config) {
      callback(status,data);
    }).
    error(function(data, status, headers, config) {
      callback(status,data);
    });
}

/*
 * Gets all unspent outputs through blockchain.info
 * @param {String} Bitcoin addresses array
 * @param {Function} callback Function that will be called with getUnspent
 */

  Blockchain.prototype.getUnspent= function(addresses, callback){
    var _url = this.url;
      $http({method: 'GET', url: _url + 'unspent?active='+addresses.join('|'),headers : { 'Content-Type': 'application/x-www-form-urlencoded' }}).
    success(function(data, status, headers, config) {
      callback(data.unspent_outputs);
    }).
    error(function(data, status, headers, config) {
      callback(data);
    });
  }

 /*
  * Broadcast transaction using blockchain.ino
  * @param {String} tx_serialized hex code
  * @param {String} tx_hash transaction hash
  * @param {function} callback Function that will be called with getUnspent
  */
Blockchain.prototype.pushTx =function(tx_serialized, tx_hash, callback) {
    var _url = this.url;

    var post_data = {
      format: "plain",
      tx: tx_serialized,
      hash: tx_hash,
    };
      $http({method: 'POST', url: _url + 'pushtx',data:post_data,headers : { 'Content-Type': 'application/x-www-form-urlencoded' }}).
    success(function(data, status, headers, config) {
      callback(data);
    }).
    error(function(data, status, headers, config) {
      callback(data);
    });
  }


return Blockchain;
});//end factory

module.exports = Blockchain
