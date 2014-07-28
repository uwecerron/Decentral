'use strict';

cApp.factory("transactionFetcher",["DecentralStorage", function(DecentralStorage) {

	var Transaction = function(wallet) {
		this.storage =DecentralStorage;
		this.wallet=wallet;
		this.from;
		this.to;
		this.amount;
		this.token;
	}

	/**
	 * Get a transaction, will retrieve it from network if needed.
	 * @param {String} txHash Transaction hash
	 * @param {Function} callback function
	 */

	TransactionDatabase.prototype.fetchTransactions = function(txHash) {

		var transaction={};
		this.storage.get("ZEBANK",this.wallet.getName(),"Txs",function(transactions){
			for(var k in transactions){
				transaction["from"]=k["from"];
				transaction["to"]=k["to"];
				transaction["amount"]=k["amount"];
				transaction["token"]=k["token"];
			}

		});
	    return transaction;
	};

	/**
	 * Store a transaction, will store transactions in DecentralStorage
	 * @param {String} txHash Transaction hash
	 */

	TransactionDatabase.prototype.storeTransaction = function(txHash) {

		if(txHash != null)
		{
			var tx= this.fetchTransactions(txHash);
	    	this.storage.save("ZEBANK",this.wallet.getName(),tx);
		}
	};

	return Transaction;
	
	}])
