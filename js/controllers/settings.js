function SettingsController($scope,Wallet){
	
    $scope.pageClass = 'page-settings';
    var wallet = new Wallet();
    $scope.currenciesList;
    $scope.currentCurrency;

    //Delete current wallet
    $scope.deleteWallet = function() {
      var walletName = wallet.Name;
      keyRing.clear(walletName);
    }

    $scope.passwordChanged = function() {
      if ($scope.newPassword === $scope.newPasswordConfirm) {
          var walletName = wallet.getWallet();
          wallet.changePass($scope.currentPassword, $scope.newPassword);
         }
    }
}//End Controller