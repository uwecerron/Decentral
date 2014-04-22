function IssueController($scope,$http) {

   $scope.pageClass = 'page-assets';
  $scope.formData={};
    $scope.error={}
     var sendInfo = { name: 'caca',
      superheroAlias: 'sfa'};
  
$scope.processForm = function() {
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
        /*
 var url = "https://localhost/leprocess.php";

$http.jsonp(url,data    : JSON.stringify({ name: 'caca'}),)
    .success(function(data){
        console.log(data.found);
    });*/


};
}