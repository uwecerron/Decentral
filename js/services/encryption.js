'use strict';
cApp.service("Encryption" , function(){


	this.salt = '5Xas34fZ/22=V';
	this.iterations = 1000;

	//password derivation
	this.pbkdf2 = function(password) {
		console.log("pbkdf2");
		console.log(sjcl.misc.pbkdf2(password, this.salt, this.iterations));
		var hash = CryptoJS.SHA256(CryptoJS.SHA256(password));
		var hash = CryptoJS.SHA256(CryptoJS.SHA256(password));
		var salt = CryptoJS.enc.Base64.parse(this.salt);
		var salt = CryptoJS.enc.Base64.parse(this.salt);
		var key512 = CryptoJS.PBKDF2(hash, salt, {
			keySize: 512 / 32,
			iterations: this.iterations
		});

		return key512;
	};

	/*
	* Encrypt with password derivation
	*/
	this.encrypt =  function(string,passphrase) {
		try {
			return sjcl.encrypt(passphrase,string);
		} catch(e) {
			console.log("encryption failed " + e);
		} finally {
			//console.log("ENC str " + string);
			//console.log("ENC pass " + passphrase);
		}
	};

	/*
	* Decrypt with password derivation 
	*/
	this.decrypt = function(encrypted, passphrase){
		return sjcl.decrypt(passphrase,encrypted);
	};
  
	this.intArrayToString = function(array) {
		var str = "";
		for(var ind = 0; ind < array.length; ind++) {
			var anInt = array[ind];
			for(var i = 0; i < 4; i++) {
				var aByte = anInt & 255;
				anInt = anInt >>> 8;
				str += String.fromCharCode(aByte);
			}
		}
		return str;
	}
  
	this.hash = function(password) {
		var hash = sjcl.hash.sha256.hash(sjcl.hash.sha256.hash(password));
		console.log("in encrypt " + this.intArrayToString(hash));
		return this.intArrayToString(hash);
	}

});
//pbkdf2("hello","nano",10000);