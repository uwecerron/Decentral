cApp.factory("TransactionFetcher",["DecentralStorage", function(DecentralStorage) {

	var Transaction = function(wallet) {
		this.wallet = wallet;
		this.transaction;
	}

	Transaction.prototype.get = function(callback) {
		var self = this;
		var sample= DecentralStorage;
		return sample.getall();
	}

	return Transaction;

}])
