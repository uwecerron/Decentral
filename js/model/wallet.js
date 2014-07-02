"use strict";
cApp.factory("Wallet",["Blockchaininfo","Decentralstorage",function(Blockchaininfo,Decentralstorage){

  var Wallet = function(Name) {
      this.Name=Name;
      this.Addresses=[];
      this.Txs=[];
      this.Balance=0;
      this.CurrentAddress='';
      this.privatekey;
      this.storage=new Decentralstorage();
       this.blockchain=new Blockchaininfo();
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
      this.blockchain.multiAddr(this.getAllAddresses,function(result){
        this.Balance=result;
      });
      }

   console.log('Wallet instantiated'+Name);
  }

  //TODO: finish method and test it
    Wallet.prototype.isAuthenticated=function(callback){
      this.storage.get( "security", function(data) {
    
      })
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


  Wallet.prototype.loadWallet= function(callback){
      this.storage.get('wallet', function(data) {
        if (data === undefined) {
          data = {}
        }
        var addresses = Object.keys(walletData);
        for ( var i = 0; i < addresses.length; i++ ) {
          var encryptedkey = data[address];
          var address = addresses[i]; 
          var newAddress = {"address":address,"pvtkey":encryptedkey};
          this.Addresses.push(newAddress);
        }
        callback(data);
      } );


  }


  Wallet.prototype.getAddress=function() {
      return this.Addresses;
    }

//todo: validate addresses
  Wallet.prototype.getAllAddresses=function(){
     var addressArr = [];
      for ( var i = 0; i < this.Addresses.length; i++ ) {
          addressArr.push(this.Addresses[i]);
      }
      return addressArr;
  }  
    // returns addressObj or false
    Wallet.prototype.generatePublicAddress =function() {
      var key = Bitcoin.ECKey.makeRandom();
     // Print your private key (in WIF format)
     this.Addresses.push(key.pub.getAddress().toString());
      console.log(key.toWIF());
      var hash=key.pub.getAddress().toString();
       this.save(key.toWIF(),hash);
      return hash;
    }
    
    Wallet.prototype.utxofetcher=function(Addresses, callback){

    //  var addresses  = this.getAddresses(), 
      this.blockchain.getUnspent(Addresses,function(data){
      var unspents = {};
      unspents._value=[];
      unspents._script=[];
      unspents._tx_index=[];
      unspents._tx_hash=[];

      for(var i=0;i<data.unspent_outputs.length;i++){
         unspents._value.push(data.unspent_outputs[i].value_hex);
         unspents._script.push(data.unspent_outputs[i].tx_output_n);
         unspents._tx_index.push(data.unspent_outputs[i].tx_index);
         unspents._tx_hash.push(data.unspent_outputs[i].tx_hash);
      }
      callback(unspents);
    });
    }
    Wallet.prototype.save= function(wifkey,password,hash){
    //  if (password !== undefined){
        this.encrypt(wifkey,'hello');
      // }else{
        //return false;
       //}
      var key= wifkey;
      var data={
          key:wifkey
      };
       /*if (password !== undefined){
        encrypt(key,password);
       }else{
        return false;
       }*/
      if(key !== undefined){
        this.storage.save("wallet",this.Name,data);
        return true;
       }else
        return false;
       }
  

    Wallet.prototype.buildTransaction= function(toAddress,password,callback){
   
     
     var addresses =this.getAllAddresses();
     this.utxofetcher(addresses,function(data){
     var tx = new Bitcoin.Transaction();
     addInput(tx,data);
     //get pvt keys, iterate through addresses.pvtkey
     var key = Bitcoin.ECKey.fromWIF(keys);
     console.log(toAddress.value)
     addOutput(tx,toAddress.addr,toAddress.value);
     console.log(key)
     console.log(data._value.length)
     sign(tx,data,key)
     console.log(tx.toHex())
      });
     //change address
 
    }//end build transaction

  function addInput(tx,unspent_output) {
      for ( var i = 0; i < unspent_output._tx_index.length; i++ ) {
        var unspent = unspent_output[ i ]
        //reverse bytes for endianness
        var hash= unspent_output._tx_hash[i];

        var index = unspent_output._tx_index[i];
        console.log(index)
        tx.addInput(hash,index);
      }
    }

    function addOutput(tx,address,value){
         tx.addOutput(address,value);
         //change address
        console.log(address);
        
    }

 

    function addFee(toAddress) {
      var Fee= 10000;
      var txValue =toAddress.value;
      return txValue+Fee;
    }

     function calculateChange(allunspents, addFee) {
      var balance=allunspents;
      return balance-addFee;
    }
    //substract change when adding outputs

    function sign(tx,unspent_outputs,key){
     for(var i=0;i<unspent_outputs._tx_index.length;i++){
       tx.sign(i, key);
      }
    }
  
    Wallet.prototype.encrypt= function(privateKey,passwordDigest) {
      if (passwordDigest !== undefined ) {
        var encrypted = CryptoJS.AES.encrypt(privateKey, passwordDigest).toString();
        privateKey=encrypted;
        return encrypted;
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

return Wallet;
}]);//end factory
