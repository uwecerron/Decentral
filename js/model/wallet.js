"use strict";

var Wallet = function(name, Decentralstorage) {
    this.Name=name;
    this.Addresses=[];
    this.Txs;
    this.Balance;
    this.CurrentAddress;
    this.privatekey;

  this.getCurrentAddress = function(){
        return CurrentAddress;
    };
   
  this.setCurrentAddress = function(hash){
        CurrentAddress = hash;
    };

  this.setBalance = function(balance){
        Balance = balance;
    };
   this.updateBalance=function(balance) {
      Balance = balance;
    }



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
    Wallet.prototype.generatePublicAddress =function() {
      var address='';
      var privateKeyBytes = this.generatePrivateKeyBytes();
      var key = new Bitcoin.ECKey(privateKeyBytes);
       address = key.getBitcoinAddress().toString();
      var privateKeyWIF =this.WIF(privateKeyBytes);
     //store wif format to localstorage
      /*
      Decentralstorage.save("walletname",{address:address, pvtaddr:privateKeyWIF})
    
      */
      //this.Addresses.push(address);
      return address;

    }

    Wallet.prototype.WIF= function(privateKeyBytes){
      var privateKeyWIF = new Bitcoin.Address(privateKeyBytes);
      privateKeyWIF.version = 0x80;
      privateKeyWIF = privateKeyWIF.toString();
      console.log(privateKeyWIF)
      return privateKeyWIF;
    }

    Wallet.prototype.generatePrivateKeyBytes= function() {
      var privateKeyBytes = [];
      var randomArray = new Uint8Array( 32 );
      window.crypto.getRandomValues(randomArray);
      
      for ( var i = 0; i < randomArray.length; i++ ) {
        privateKeyBytes[ i ] = randomArray[ i ];
      }

      return privateKeyBytes;
    }


    Wallet.prototype.Txs= function(callback) {
      Decentralstorage.get( 'txs', function(data) {
        fTxs = data;
        callback();
      } );
    }
  
    Wallet.prototype.getPrivateKey= function(password,callback) {
      var data = this.Decentralstorage.getPrivateKey(password);

      return privateKey;
    }

      Wallet.prototype.encrypt= function(passwordDigest) {
      if (typeof(privateKey) !== undefined ) {
        var encrypted = CryptoJS.AES.encrypt(privateKey, passwordDigest).toString();
        this.privateKey=encrypted;
        privateKey = undefined;
      } else {
        console.log( "Private Key not found" );
      }
    }

    Wallet.prototype.decrypt= function(passwordDigest) {
      var encryptedRoot = encrypted;
      var decrypted = CryptoJS.AES.decrypt( encryptedRoot, passwordDigest );
        privateKey = decrypted.toString( CryptoJS.enc.Utf8 );
      if ((privateKey === "") || (typeof privateKey === 'undefined') ) {
        return false;
      }
      return true;
    }

    Wallet.prototype.buildTransaction= function(){
      
    }



//var container = new AllWallets('', 'allwallets');
var wallet1 = new Wallet('uwe1');
//var wallet2 = new Wallet('uwe2');
//container.add(wallet1);
//container.add(wallet2);
//console.log(wallet1);
