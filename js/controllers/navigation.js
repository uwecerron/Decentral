function NavigationController($scope, $http, $location, $modal) {
    
     $scope.navClass = function (page) {
        var currentRoute = $location.path().substring(1) || 'home';
        return page === currentRoute ? 'active' : '';
    };        

    $scope.openSettings = function() {
      $modal.open({
        templateUrl: 'view/partials/settings.html',
        controller: SettingsController
      });
    }

   
}

function SettingsController($scope, $http, $location, $modalInstance){
   $scope.password = function(create) {
    var password ="";



}
}
