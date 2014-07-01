"use strict";

  var Wallet = function(Name,Blockchaininfo,Decentralstorage) {
      this.Name=Name;
      this.Addresses=[];
      this.Txs;
      this.Balance;
      this.CurrentAddress;
      this.privatekey;
      this.storage=new Decentralstorage();
      this.Blockchaininfo= new Blockchaininfo();
      this.Txfee =10000;

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
   console.log('Wallet instantiated'+Name);
  }

  //TODO: finish method and test it
    Wallet.prototype.isAuthenticated=function(callback){
      this.storage.get( "security", function(data) {
       


      } )
    }

    Wallet.prototype.authenticate=function (password){
      var passwordDigest = Crypto.SHA256(password);
      var decrypted = this.Addresses[0].decrypt(passwordDigest);
      if (decrypted === true) {
        this.storage.set( "security", "passwordDigest", passwordDigest );
        return true;
      }
      return false;
    }

  Wallet.prototype.getAddress=function() {
      return this.Addresses;
    }

//todo: validate addresses
  Wallet.prototype.getAddresses=function(){
     var addressStr = [];
      for ( var i = 0; i < this.Addresses.length; i++ ) {
          addressStr.push(Addresses[i].getAddress());
      }
      return addressStr;
  }  
    // returns addressObj or false
    Wallet.prototype.generatePublicAddress =function() {
      var key = Bitcoin.ECKey.makeRandom();
     // Print your private key (in WIF format)
      console.log(key.toWIF());
     // this.save(key.toWIF());
      return key.pub.getAddress().toString();
    }
    
    Wallet.prototype.utxofetcher=function(toAddresses, passwordDigest, callback){
      var blockchain = new Blockchaininfo();
    //  var addresses  = this.getAddresses(), 
      
      blockchain.getUnspent(addresses,function(data){
      var unspents = {};
      unspents._value=[];
      unspents._script=[];
      unspents._tx_index=[];
      unspents._tx_output_n=[];
      unspents._tx_hash=[];

      for(var i=0;i<data.unspent_outputs.length;i++){
         unspents._value.push(data.unspent_outputs[i].value);
         unspents._script.push(data.unspent_outputs[i].script);
         unspents._tx_index.push(data.unspent_outputs[i].tx_index);
         unspents._tx_output_n.push(data.unspent_outputs[i].tx_output_n);
         unspents._tx_hash.push(data.unspent_outputs[i].tx_hash);
      }
      callback(unspents);
    });
    }
    Wallet.prototype.save= function(wifkey,password,callback){
      var key= wifkey;
       if (password !== undefined){
        encrypt(key,password);
       }else{
        return false;
       }
      if(key !== undefined){
        Decentralstorage.save("wallet",this.Name,key);
        return true;
       }else
        return false;
       }
     Wallet.prototype.getAddressStrs=function() {
      var addressStr = [];
      for ( var i = 0; i < Addresses.length; i++ ) {
        if ( Addresses[ i ].validate() ) {
          addressStr.push(Addresses[ i ]);
        }
      }
      return addressStr;
    }

    Wallet.prototype.buildTransaction= function(toAddresses,password,callback){
      var tx = new Bitcoin.Transaction();
         var key = Bitcoin.ECKey.fromWIF("5HzgF1Cwgq2x9pFM1bXnnnt31siWqpLEbe5rKJHaUMsVEq73eiy");
      var change = this.Balance-this.Txfee;
      var addresses;
     this.utxofetcher(toAddresses,function(data){
            tx.addInput(data.unspent_outputs,data.index);
            

      });
     //change address
     var changeAddress=this.generatePublicAddress();
     toAddresses.push({
            addr: changeAddr.getAddress(),
            value: changeValue
          });
     toAddresses.push();
     this.addOutput(toAddresses);
     //todo: finish sign method
     sign();
    }
    Wallet.prototype.selectunspents=function(addresses, callback ){

    }
     Wallet.prototype.addInput=function(unspent_output) {
      for ( var i = 0; i < unspent_output.length; i++ ) {
        var unspent = unspent_output[ i ]
        //reverse bytes for endianness
        var hash= unspent_output[i].hash;
        var index = buildInput(hash,unspent_output[i].index);
        tx.addInput(hash,index);
      }
    }
    Wallet.prototype.addOutput=function(addresses){
    for(var i = 0; i < addresses.length; i++){
        var address = addresses[i].address;
        var value   = addresses[i].value;
         tx.addOutput(address.addr,address.value);
         //change address
        console.log("addOutput"+address.addr);
        }
    }
   //to get change
     function getChangeValue( selectedUnspents, txValuePlusFee ) {
      var selectedUnspentsValue = SpareCoins.Util.sumUnspents( selectedUnspents );
      return selectedUnspentsValue.subtract( txValuePlusFee );
    }

    function txValuePlusFee( toAddresses ) {
      var txValue = SpareCoins.Util.sumToAddresses( toAddresses );
      return txValue.add( Constants.minFee );
    }


    Wallet.prototype.sign=function(index,key){
     //if(transaction)
       tx.sign(index, key);
    }
  
    Wallet.prototype.encrypt= function(privateKey,passwordDigest) {
      if (passwordDigest !== undefined ) {
        var encrypted = CryptoJS.AES.encrypt(privateKey, passwordDigest).toString();
        privateKey=encrypted;
        privateKey = undefined;
      } else {
        //throw
        return false
      }
    }

    Wallet.prototype.decrypt= function(encrypted,passwordDigest) {
      var pvtkey = encrypted;
      var decrypted = CryptoJS.AES.decrypt(pvtkey, passwordDigest);
        privateKey = decrypted.toString(CryptoJS.enc.Utf8);
      if ((privateKey === "") || (typeof privateKey === 'undefined')){
        return false;
      }
      return true;
    }


  