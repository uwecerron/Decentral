'use strict';

cApp.service('modals', function($modal) {

	this.open = function(template, data,callback) {
		//var modalInstance = 
		$modal.open({templateUrl:'../view/modal/'+template+'.html',
		controller: 'passModalCtrl',resolve:{}});
		/*
		modalInstance.result.then(function (passphrase) {
				
			}, function () {
				
		});*/

	},

	this.ok = function(val) {
		console.log(val);
	},
	
	this.cancel = function() {
		console.log("HEY");
		$modal.close();
	},

	this.password = function(text, callback) {
		this.open('modalpassword', {text: text, password: ''}, callback);
	},

	this.confirmSend = function(text, spend, recipients, callback) {
		this.open('modalsend', {text: text, spend: spend, password:''}, callback);
	}

});
