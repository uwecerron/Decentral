"use strict";
//mock wallet

var WalletComp = function (path, id) {
    this.wallets = [];
   
}
WalletComp.prototype = {
    add: function (wallet) {
        this.wallets.push(wallet);
    },
     
    remove: function (wallet) {    
        for (var node, i = 0; node = this.getObject(i); i++) {
            if (node == wallet) {
                this.children.splice(i, 1);
                this.element.detach(wallet.getElement());
                return true;
            }
             
            if (node.remove(wallet)) {
                return true;
            }
        }
         
        return false;
    },
     
    getObject: function (i) {
        return this.children[i];
    }
}
var Wallet = function(name) {
    this.Name=name;
    this.Addresses=[];
    this.Txs;
    this.Balance;
    this.CurrentAddress;

  this.getCurrentAddress = function(){
        return CurrentAddress;
    };
   
    this.setCurrentAddress = function(hash){
        CurrentAddress = hash;
    };


 console.log('Wallet instantiated'+name);
}

  Wallet.prototype.getAddresses=function() {
      return this.Addresses;
    }
  Wallet.prototype.getAddressStrs=function(){
     var addressStr = [];
      for ( var i = 0; i < Addresses.length; i++ ) {
        if ( Addresses[ i ].validate() ) {
          addressStr.push( Addresses[ i ].getAddress() );
        }
      }
      return addressStr;


  }  

    // returns addressObj or false
    Wallet.prototype.generateAddress =function() {
      var address='';
        var privateKeyBytes = createPrivateKeyBytes();
      var key = new Bitcoin.ECKey( privateKeyBytes );
      address=key.getBitcoinAddress().toString();
      this.Addresses.push(address);
       return address;

    }

   function createPrivateKeyBytes() {
      var privateKeyBytes = [];
      var randArr = new Uint8Array( 32 );
      crypto.getRandomValues( randArr );
      for ( var i = 0; i < randArr.length; i++ ) {
        privateKeyBytes[ i ] = randArr[ i ];
      }
      return privateKeyBytes;
    }


  function validateaddress() {
      var bytes = toBytes();
      var end = bytes.length - 4;
      var addressChecksum = bytes.slice( end, bytes.length );
      var hash = bytes.slice( 0, end );
      var hashChecksum = doubleShaBytes( hash );
      return assertEqual( addressChecksum, hashChecksum.slice( 0, 4 ) );

      function doubleShaBytes( hash ) {
        var asBytes = {
          asBytes: true
        };
        return Crypto.SHA256( Crypto.SHA256( hash, asBytes ), asBytes );
      }

      // TODO: if (self.privateKey !== "") check private key as well
      function assertEqual( checksum1, checksum2 ) {
        if ( checksum1.length !== checksum2.length || checksum1.length !== 4 ) {
          return false;
        }
        for ( var i = 0; i < checksum1.length; ++i ) {
          if ( checksum1[ i ] !== checksum2[ i ] ) return false;
        }
        return true;
      }
    }

var container = new WalletComp('', 'allwallets');
var wallet1 = new Wallet('uwe1');
var wallet1 = new Wallet('uwe2');
container.add(wallet1);
console.log(container);







