function NavigationController($scope,$rootScope, $location,$timeout,$http) {
    
     $scope.navClass = function (page) {
        var currentRoute = $location.path().substring(1) || 'home';
        return page === currentRoute ? 'active' : '';
    };        
   $scope.balance = "";
   var balance= 0;
     (function tick() {
    $http({method:'GET', url:'https://blockchain.info/unspent?active=1GDHkj6EoeQiG3HeUgdUnxLgL8pj1A2yAp',headers : { 'Content-Type': 'application/x-www-form-urlencoded' }}).success(function(data, status, headers, config) {

      for(var i in data.unspent_outputs){
      
         balance +=data.unspent_outputs[i].value;
      }
        //console.log(balance);
      $scope.balance=balance/ 100000000;
      balance=0;

              $rootScope.balance =$scope.balance*100000000;
          console.log($scope.balance);
      //console.log(data.unspent_outputs[1].value);
     // $scope.value=data.unspent_outputs[0].value;
        $timeout(tick, 10000);
    }).


    error(function(data, status, headers, config) {
      console.log(data);
        console.log(status);
          console.log(headers);
       $scope.balance=0;
               $timeout(tick, 20000);
    });
          })();

          //test
         
}