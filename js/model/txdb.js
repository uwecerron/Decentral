cApp.factory("TransactionFetcher",["Decentralstorage", function(Decentralstorage) {

	var Transaction = function(wallet) {
		this.wallet = wallet;
		this.transaction;
	}

	Transaction.prototype.get = function(callback) {
		var self = this;
		var sample= new Decentralstorage();
		return sample.getall();
	}

	return Transaction;

}])
