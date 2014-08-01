'use strict';
cApp.service("encryption" , function(){


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
   this._encrypt =  function(string,passphrase) {
      var encrypted = CryptoJS.AES.encrypt(string, "passphrase");
      var encryptedBase64 = encrypted.toString();
      return encryptedBase64;
  };

  /*
   * Decrypt with password derivation 
   */
   this._decrypt = function(encrypted, passphrase){
      var decrypted = CryptoJS.AES.decrypt(encrypted, passwordDigest);
      var privateKey = decrypted.toString(CryptoJS.enc.Utf8);
      if ((privateKey === "") || (typeof privateKey === 'undefined')){
        return false;
      }
      return privateKey;
  };


});
//pbkdf2("hello","nano",10000);