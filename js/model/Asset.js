"use strict";
cApp.factory("Asset",function(){

	var Asset = function(moniker,btc,tokens,hash){
		this.moniker=moniker;
		this.btc=btc;
		this.address=[];
		this.colordef=hash;
		this.tokens=tokens;
		
		this.getMoniker = function(){
			return this.moniker;
		};
	
		this.setMoniker = function(moniker){
			this.moniker=moniker;
		};
		
		this.getBtc = function() {
			return this.btc;
		};

		this.setBtc = function(balance){
			this.balance=btc;
		};

		this.getAddresses = function(){
			return address;
		};

		this.colordef = function(){
			return this.colordef;
		};
		
		this.getTokens = function() {
			return this.tokens;
		};
	
	};
	
	return Asset;
});