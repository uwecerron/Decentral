"use strict";
cApp.factory("Wallet",["Blockchaininfo","DecentralStorage",function(Blockchaininfo,DecentralStorage){


  var Wallet = function(Name) {
      var self = this;
      this.Name=Name;
      this.Addresses=[];
      this.Txs=[];
      this.Balance=0;
      this.CurrentAddress='';
      this.privatekey;
      this.storage= DecentralStorage;
      this.blockchain=new Blockchaininfo();
      this.Txfee =10000;

	this.initialize=function(wallet)
	{
		
		this.Addresses=wallet.Addresses;
		this.Txs=wallet.Txs;
		this.Balance=wallet.Balance;
		this.CurrentAddress=wallet.CurrentAddress;
		this.privatekey=wallet.privatekey;
		//this.storage=wallet.storage;
		this.blockchain=wallet.blockchain;
		this.Txfee =wallet.Txfee;

	}
	  
	this.addAddress = function(address) {
		this.Addresses.push(address);
	}
	  
    this.getCurrentAddress = function(){
          return CurrentAddress;
      };
     
    this.setCurrentAddress = function(hash){
          CurrentAddress = hash;
      };

    this.getAddresses = function(){
      return this.Addresses;
    }

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
      var _name=this.Name;
      var walletData=[]
      var _addresses=this.getAddresses();
      this.storage.get('wallet', function(data) {

        if (data === undefined) {
          data = {}
        }
          
        var addresses ={};
        addresses=data['wallet'][_name];
        var addresses2 = Object.keys(addresses );
        console.log(addresses2)
                 console.log(_addresses);
         for ( var i = 0; i < addresses2.length; i++ ) {

          walletData.push(addresses2[i]);  
          _addresses.push(addresses2[i])    
        }

         console.log(_addresses)
        callback(_addresses);
   
        });
      //console.log(this.getAddresses())
       // console.log(this.Addresses);
        // console.log(hello);
  }

  Wallet.prototype.changePassword=function(){
    
  }

  Wallet.prototype.getCurrentAddress=function() {
      return this.CurrentAddress;
    }

//todo: validate addresses
  Wallet.prototype.getAllAddresses=function(){
     var addressArr = [];
      for ( var i = 0; i < this.Addresses.length; i++ ) {
          addressArr.push(this.Addresses[i]);
      }
      return addressArr;
  }  

    Wallet.prototype.generatePublicAddress =function() {
      var key = Bitcoin.ECKey.makeRandom();
      var hash=key.pub.getAddress().toString();
	  var newAddress = {};
	  newAddress['address'] = hash;
	  this.Addresses.push(newAddress);
      
       //this.save(key.toWIF(),hash);
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
      console.log(data)
      for(var i=0;i<data.length;i++){
         unspents._value.push(data[i].value_hex);
         unspents._script.push(data[i].tx_output_n);
         unspents._tx_index.push(data[i].tx_index);
         unspents._tx_hash.push(data[i].tx_hash);
      }
      callback(unspents);
    });
    }
    Wallet.prototype.save= function(wifkey,hash){
    //  if (password !== undefined){
        var encrypted= this.encrypt(wifkey,'hello');
        var decrypted= this.decrypt(encrypted,'hello')
      // }else{
        //return false;
       //}
      var key= wifkey;
        var data={};
      data[hash]=encrypted;
      console.log("storing")
      console.log(data);
       /*if (password !== undefined){
        encrypt(key,password);
       }else{
        return false;
       }*/
      if(key !== undefined){
       // this.storage.clear()
        this.storage.save("wallet",this.Name,data);
       // this.storage.getall();
        //setTimeout(store, saveTimeOut);
        return true;
       }else
        return false;
       }
  
//13Jw9vY5fHSe82qPwWhg6eShH7ZYAuRt1n
    Wallet.prototype.buildTransaction= function(toAddress,callback){
   
     //var addresses =this.getAllAddresses();
       var addresses =["1F6UU9EBPNyAFyPojDqHAtoCiNDX9mFmBP"];
     this.utxofetcher(addresses,function(data){
     var tx = new Bitcoin.Transaction();
     addInput(tx,data);
     //get pvt keys, iterate through addresses.pvtkey
     //var key = Bitcoin.ECKey.fromWIF(keys);
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
        var hash= reverse(unspent_output._tx_hash[i]);

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
  
    function getUnspents(){

      
    }


    function selectunspents(addresses){
      this.blockchain.getUnspent(addresses,function(){


      });

    }

        function selectUnspents( unspentsBigInteger, targetValue ) {
      var selectedUnspents = [];

      // TODO: Add Test for insufficient balance: Test below conditional
      if ( !SpareCoins.Util.unspentsIsSufficient( unspentsBigInteger, targetValue ) ) {
        throw "Insufficient Balance"
      }

      for ( var i = 0; i < unspentsBigInteger.length; i++ ) {
        var unspent = unspentsBigInteger[ i ];
        if ( unspent.value.compareTo( targetValue ) >= 0 ) {
          // unset all previous selected unspents and use this one
          selectedUnspents = [ unspent ];
          break;
        } else {
          selectedUnspents.push( unspent );
          if ( SpareCoins.Util.unspentsIsSufficient( selectedUnspents, targetValue ) ) {
            break;
          }
        }
      }
      return selectedUnspents;
    }

    Wallet.prototype.encrypt= function(privateKey,passwordDigest) {
      if (passwordDigest !== undefined ) {
        var encrypted = CryptoJS.AES.encrypt(privateKey, passwordDigest).toString();
        privateKey=encrypted;
        return encrypted;
      }
    }

    Wallet.prototype.decrypt= function(encrypted,passwordDigest) {
      var decrypted = CryptoJS.AES.decrypt(encrypted, passwordDigest);
       var privateKey = decrypted.toString(CryptoJS.enc.Utf8);
      if ((privateKey === "") || (typeof privateKey === 'undefined')){
        return false;
      }
      return privateKey;
    }

    	var reverse = function(str){
    	var ret = "";
    	var len = str.length;
    	if(len % 2 == 1){
    		len--;
    		ret = str.charAt(len);
    	}
    	for(var i = len-2; i >= 0; i-=2)
    	{
    		ret += str.charAt(i);
    		ret += str.charAt(i+1);
    	}
    	return ret;
    	}

return Wallet;
}]);//end factory
