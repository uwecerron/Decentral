cApp.controller('Home', function($scope, $rootScope ) {
         $scope.pageClass = 'page-home';
    $scope.message = 'This is the homer screen';
    $rootScope.$watch( 'balance', function() {
    $scope.balance = $rootScope.balance
  } )



    $scope.generateLeAddress = function() {
      var privateKeyBytes = createPrivateKeyBytes();
      var key = new Bitcoin.ECKey( privateKeyBytes );
      //$scope.$apply( function() {
            $scope.currentAddress =  key.getBitcoinAddress().toString()
            //$scope.currentImgURL = baseURL + $scope.currentAddress
          //} )
      //console.log($scope.currentAddress);
    }

  //} )
     
});//end Home Controller