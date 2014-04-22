function TradeController($scope,$http){
   $scope.pageClass = 'page-trade';
   $scope.message = 'This is Show trade screen';

     $scope.buy = function(item) {
      console.log('hero');
      $http({
        method  : 'POST',
        url     : 'http:/localhost:8888',
        data    : JSON.stringify({"method":"dump_config"}),  // pass in data as strings
        headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  // set the headers so angular passing info as form data (not request payload)
    })
        .success(function(data) {
            console.log(data);
         if (!data.success) {
              // if not successful, bind errors to error variables
               // $scope.errorName = data.errors.name;
                //$scope.error=data.errors.name;
                //$scope.errorSuperhero = data.errors.superheroAlias;
            } else {

              // if successful, bind success message to message
                $scope.message = data.message;
            }
        });

     }

       $scope.sell = function(item) {

       	$http({
        method  : 'POST',
        url     : 'https:/localhost/mainpage/index.php',
        data    : JSON.stringify({ name: 'caca'}),  // pass in data as strings
        headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  // set the headers so angular passing info as form data (not request payload)
    })
        .success(function(data) {
            console.log(data);

            if (!data.success) {
              // if not successful, bind errors to error variables
               // $scope.errorName = data.errors.name;
                //$scope.error=data.errors.name;
                //$scope.errorSuperhero = data.errors.superheroAlias;
            } else {

              // if successful, bind success message to message
                $scope.message = data.message;
            }
        });

       }


}
