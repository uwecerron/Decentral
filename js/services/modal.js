'use strict';

cApp.service('modals', function($modal,$window) {

  this.open = function(template, data,callback) {
    $modal.open({templateUrl:'../view/modal/'+template+'.html',
     controller: passModalCtrl,resolve:{}});

  },

  this.cancel = function() {
     $modal.close();
  },

  this.password = function(text, callback) {
    this.open('modalpassword', {text: text, password: ''}, callback);
  },

  this.confirmSend = function(text, spend, recipients, callback) {
    this.open('modalsend', {text: text, spend: spend, password:''}, callback);
  }


});
