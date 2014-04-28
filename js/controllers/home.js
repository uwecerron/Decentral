cApp.controller('Home', function($scope, $rootScope ) {
         $scope.pageClass = 'page-home';
    $scope.message = 'Choose Your Wallet';
    $rootScope.$watch( 'balance', function() {
    $scope.balance = $rootScope.balance
  } )



    $scope.generateLeAddress = function() {
    //  var privateKeyBytes = createPrivateKeyBytes();
     // var key = new Bitcoin.ECKey( privateKeyBytes );
      //$scope.$apply( function() {
    $scope.currentAddress =  wallet1.generateAddress();
            //$scope.currentImgURL = baseURL + $scope.currentAddress
          //} )
      //console.log($scope.currentAddress);
      console.log(wallet1.Addresses)
    }

  //} )
     
});//end Home Controller