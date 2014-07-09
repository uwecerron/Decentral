'use strict';
cApp.service("WalletManager", function() {

	this.wallets = [];
	this.curWallet = 0;
	
	this.addWallet = function (wallet) {
		this.wallets.push(wallet);
	};
	
	this.removeWallet = function (wallet) {    
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
	};
	 
	this.getWallet = function (i) {
		return this.wallets[i];
	};
	
	this.setWallet = function(i) {
		if(i < this.wallets.length) {
			curWallet = i;
		}
	};
	
	this.numWallets = function() {
		return this.wallets.length;
	};
	

});