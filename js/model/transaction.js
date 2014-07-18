'use strict';

	function Transaction(){
		this.version = 1;
  		this.locktime = 0;
  		this.ins = [];
  		this.outs = [];
	}
	 
	Transaction.isTxId = function(txId) {
	  var set = ['0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f']

	  return (_.isString(txId) &&
	          txId.length === 64 &&
	          txId.toLowerCase().split('').every(function(x) { return set.indexOf(x) !== -1 }))
	}

	  Transaction.DEFAULT_SEQUENCE = Bitcoin.Transaction.DEFAULT_SEQUENCE;
	  Transaction.SIGHASH_ALL = Bitcoin.Transaction.SIGHASH_ALL;
	  Transaction.SIGHASH_NONE = Bitcoin.Transaction.SIGHASH_NONE;
	  Transaction.SIGHASH_SINGLE = Bitcoin.Transaction.SIGHASH_SINGLE;
	  Transaction.SIGHASH_ANYONECANPAY = Bitcoin.Transaction.SIGHASH_ANYONECANPAY;
	  Transaction.fromBuffer = Bitcoin.Transaction.fromBuffer;
	  Transaction.fromHex = Bitcoin.Transaction.fromHex;

	Transaction.prototype.get = function() {
	  var TX = new Transaction()
	  TX.version = this.version
	  TX.locktime = this.locktime
	  if (!(this.ensured === undefined))
	    TX.ensured = this.ensured

	  TX.ins = this.ins.map(function(txin) {
	    var input = {
	      hash: txin.hash,
	      index: txin.index,
	      script: txin.script,
	      sequence: txin.sequence
	    }

	    if (!(txin.value === undefined))
	      input.value = txin.value
	    if (!(txin.prevTx === undefined))
	      input.prevTx = txin.prevTx

	    return input
	  })

	  TX.outs = this.outs.map(function(txout) {
	    return {
	      script: txout.script,
	      value: txout.value
	    }
	  })

	  return TX
	}

