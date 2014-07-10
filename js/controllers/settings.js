function SettingsController($scope,Wallet,DecentralStorage){
	
    $scope.pageClass = 'page-settings';
    var wallet = DecentralStorage;
    $scope.currenciesList;
    $scope.currentCurrency;

    $scope.passwordChangedSubmit = function() {
      console.log("herro")
  /*var passDigest = Crypto.SHA256($scope.password);
    if($scope.currentPassword !== passwordDigest){
      return false; ds
    }
    wallet.save( "security", "passwordDigest", passwordDigest, function(){
 
    });

    if ($scope.newPassword === $scope.newPasswordConfirm) {
         var walletName = wallet.getWallet();
         wallet.changePass($scope.currentPassword, $scope.newPassword);
       }*/
    }

    function download(data) {
    var a = document.createElement("a");
     var backup = "data:text/csv;charset=utf-8,";
        backup += escape(data);
        a.href= backup;
        a.click();
    };

        //Delete current wallet
    $scope.removeAllWallets = function() {
      var walletName = wallet.Name;
     // wallet.clear(walletName);
    }
    $scope.backupWallet = function() {
      var encryptedpvtkeys=this. 
      download()
      console.log();
    }
    $scope.importWallet = function() {

      console.log();
    }

      
    
}//End Controller


  