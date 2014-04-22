function SendController($scope,$http){
  $scope.pageClass = 'page-send';
    $scope.item = {};

    $scope.send = function(item) {
     console.log('submitted');
   //$scope.formData;
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
      
      //$scope.$apply( function() {
     
    };
}