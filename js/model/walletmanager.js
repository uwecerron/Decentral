'use strict';
cApp.service("WalletManager", function(DecentralStorage) {

	this.wallets = {};
	this.curWallet = 0;
	
	this.getWallets = function() {
		return this.wallets;
	}
	
	this.init = function() {
		this.wallets = DecentralStorage.getWallets();
		if(!this.wallets) this.wallets = {};
		for(var key in this.wallets)
		{
			if(key > this.curWallet) this.curWallet = key+1; 
		}
	};
	
	this.setWallet = function(i) {
		if(i in wallets) {
			this.curWallet = i;
			return true;
		}
		return false;
	};
	
	this.addWallet = function (wallet) {
		DecentralStorage.saveWallet(wallet, this.curWallet);
		this.wallets[this.curWallet] = wallet;
		this.curWallet += 1;
	};
	
	this.update = function(index) {
		DecentralStorage.saveWallet(this.wallets[index], index);
	};
	
	this.removeWallet = function (index) {    
		if(index in this.wallets && this.wallets[index] != null)
		{
			this.wallets[index] = null;
			DecentralStorage.saveWallet(null, index);
			return true;
		}
		return false;
	};
	 
	this.getWallet = function (i) {
		return this.wallets[i];
	};
	
	this.numWallets = function() {
		if(!this.wallets) return 0;
		var ct = 0;
		for(var index in this.wallets) 
		{
			if(this.wallets[index]!= null) ct++;
		}
		return ct;
	};
	

});