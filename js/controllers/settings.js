function SettingsController($scope,WalletManager,DecentralStorage){
	
    $scope.pageClass = 'page-settings';
    var storage = DecentralStorage;
    $scope.currenciesList;
    $scope.currentCurrency;
    
    $scope.passwordChangedSubmit = function() {
      // replace with hasher algorithm sha256 or 3?
        var passDigest = CryptoJS.AES.encrypt("hello",$scope.currentpassword).toString();
        storage.get("security",function(result){
        if(passDigest!== result["security"]["passwordDigest"])
        {
            console.log("false")
            return false; 
        }
        else
        {
            if ($scope.newPassword === $scope.newPasswordConfirm) 
            {
                var walletName = WalletManager.getCurrentWallet();
                console.log(walletName)
                storage.save( "security", "passwordDigest", newPassword);
            }
        }
      
      });
    }

    function download(data) {
        var a = document.createElement("a");
        var backup = "data:text/csv;charset=utf-8,";
        backup += escape(data);
        a.href= backup;
        a.click();
    };
    //wallet buttons
    $scope.importWallet = function() {
        console.log();
    }
    $scope.backupWallet = function() {
        var encryptedpvtkeys="hello" 
        download(encryptedpvtkeys)
    }
    //Delete current wallet
    $scope.removeWallet = function() {
     // wallet.clear(walletName);
    }
    //check boxes
    $scope.convert = function() {
        console.log("convert")
    }
    $scope.showbalance = function() {
        console.log("balance")
    }
     $scope.trade = function() {
        console.log("trade")
    }
     $scope.coinjoin = function() {
        console.log("coinjoin")
    }   
    
}//End Controller


  