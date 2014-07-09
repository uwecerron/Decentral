'use strict';

function AssetManager(){
	this.assets=[];
	this.currAsset=0;

}

AssetManager.prototype.numAssets= function(){
	return this.assets.length;
}

AssetManager.prototype.addAsset=function(asset){
	this.wallets.push(asset);
}

AssetManager.prototype.getAsset=function(i){
	return this.assets[i];
}

AssetManager.prototype.setAsset=function(i){
	if(i < this.wallets.length) {
			curWallet = i;
		}
}

AssetManager.prototype.deleteAsset=function(asset){
	for (var node, i = 0; node = this.getObject(i); i++) {
		if (node == asset) {
		    this.children.splice(i, 1);
			this.element.detach(asset.getElement());
			return true;
		}	 
		if (node.remove(asset)) {
			return true;
		}
	}
	return false;
}
