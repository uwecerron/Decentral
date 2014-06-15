"use strict";

var AllWallets = function () {
    this.wallets = [];
   
}
AllWallets.prototype = {
    add: function (wallet) {
        this.wallets.push(wallet);
    },
     
    remove: function (wallet) {    
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
    },
     
    getObject: function (i) {
        return this.children[i];
    }
}