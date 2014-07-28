'use strict';

cApp.factory("Asset",function(){

	function Asset(moniker){
		this.moniker=moniker;
		this.balance=0.00;
		this.address="Add an Address";
		this.colordef='';	
	}

	Asset.prototype.getMoniker= function(){
		return this.moniker;
	}

	Asset.prototype.setMoniker= function(moniker){
		this.moniker=moniker;
	}

	Asset.prototype.getBalance = function() {
		return this.balance;
	}

	Asset.prototype.setBalance=function(balance){
		this.balance=balance;
	}

	Asset.prototype.getAddress=function(){
		return address;
	}

	Asset.prototype.colordef=function(){
		return this.colordef;
	}

});