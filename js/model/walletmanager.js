'use strict';
cApp.service("WalletManager", function(DecentralStorage,Wallet) {

	this.wallets = {};
	this.walletCounter = 0;
	this.curWallet = 0;
	this.isAuthenticated;
    this.authenticate;
	this.walletIndexer = {};

	this.getWallets = function() {
		return this.wallets;
	};
	
	this.init = function(rawData) {
		
		var counter = 0;
		for(var index in rawData)
		{
			var i = parseInt(index);
			if(index > this.walletCounter) this.walletCounter = i+1; 
			if(rawData[index]) {
				var nwallet = new Wallet(rawData[index].Name);
				nwallet.initialize(rawData[index]);
				this.wallets[i] = nwallet;
				this.walletIndexer[counter++] = i;
			}
		}
	};
	
	this.getCurrentWallet = function() {
		if(this.curWallet in this.wallets) {
			return this.wallets[this.curWallet];
		}
		return null;
	};
	
	this.setWalletIndex = function(i) {
		return this.setWallet(this.walletIndexer[i]);
	};
	
	this.setWallet = function(i) {
		if(i in this.wallets) {
			this.curWallet = i;
			return true;
		}
		return false;
	};
	
	this.addWallet = function (wallet) {
		DecentralStorage.saveWallet(wallet, this.walletCounter);
		this.wallets[this.walletCounter] = wallet;
		this.walletIndexer[this.walletIndexer.length] = this.walletCounter;
		this.walletCounter += 1;
	};
	
	this.updateCurrent = function() {
		this.update(this.curWallet);
	};
	
	this.update = function(index) {
		DecentralStorage.saveWallet(this.wallets[index], index);
	};
	
	this.updateAll = function() {
		for(var index in this.wallets){
			this.update(index);
		}
	};
	
	this.removeWalletIndex = function(index) {
		this.removeWallet(this.walletIndexer[index]);
	};
	
	this.removeWallet = function (index) {    
		if(index in this.wallets && this.wallets[index] != null)
		{
			delete this.wallets[index];
			DecentralStorage.updateWallets(this.wallets);
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
			if(this.wallets[index]!= null) {
				ct++;
			}
		}
		return ct;
	};
	
	this.reset = function() {
		this.wallets = {};
		this.walletCounter = 0;
		this.curWallet = 0;
		this.isAuthenticated=false;
		this.authenticate;
		this.walletIndexer = {};
	};
	

});