
function SendController($scope,$rootScope,Wallet){
  $scope.pageClass = 'page-send';
  $scope.item = {};
  console.log('logged');
  $scope.inputAddress='';
  $scope.inputAmount='';
  var wallet1= new Wallet();

    //check balance
    $rootScope.$watch( 'balance', function() {
    $scope.balanceInt = $rootScope.balanceInt
    $scope.balance = $rootScope.balance
    })

    var satoshies=100000000;

    $scope.send = function(item) {
      var value=$scope.inputAmount * satoshies;
      var formData ={
      addr:$scope.inputAddress,
      amount:value
      }

      console.log(formData);
      wallet1.buildTransaction(formData,function(data){
        console.log(data);
      });

      console.log( $scope.inputAddress);

     console.log('submitted');
      //$scope.$apply( function() {
     
    };

   
}
