
var cApp =angular.module('ChromaWallet', ['ngRoute', 'ngAnimate','xeditable']);
cApp.config(function ($routeProvider) {
    $routeProvider.
     when('/Home', {
        templateUrl: 'view/home.html',
        controller: 'Home'
    }).
      when('/Receive', {
        templateUrl: 'view/receive.html',
        controller: 'ReceiveAssets'
    }).
      when('/Send', {
        templateUrl: 'view/send.html',
        controller: 'Send'
    }).
      when('/Assets', {
        templateUrl: 'view/asset.html',
        controller: 'Assets'
    }).
      when('/Trade', {
        templateUrl: 'view/trade.html',
        controller: 'Trade'
      })
      .otherwise({
        redirectTo: '/Home'
      });
  });


cApp.directive("selected", function($timeout) {
  return function($scope, element, attrs) {
    $scope.$watch('currentAddress', function() {
      $(element).focus()
      $(element).select()
      console.log(element);
    })
  }
})


cApp.controller('TextBtnCtrl', function($scope) {
  $scope.user = {
    name: 'awesome user'
  };  
});
 
    function createPrivateKeyBytes() {
      var privateKeyBytes = [];
      var randArr = new Uint8Array( 32 );
      crypto.getRandomValues( randArr );
      for ( var i = 0; i < randArr.length; i++ ) {
        privateKeyBytes[ i ] = randArr[ i ];
      }
      return privateKeyBytes;
    }

 
 cApp.factory('Wallet', function() {
  var Wallet = {};
  var list = [];
  Wallet.getItem = function(index) { return list[index]; }
  Wallet.addItem = function(item) { list.push(item); }
  Wallet.removeItem = function(item) { list.splice(list.indexOf(item), 1) }
  Wallet.size = function() { return list.length; }

  return Wallet;
});




cApp.controller('Send', function($scope, $routeParams) {
      $scope.pageClass = 'page-send';    $scope.message = 'This is Show send screen';
});
cApp.controller('Assets', function($scope, $routeParams) {
      $scope.pageClass = 'page-assets';
  //$scope.message = 'This is Show assets screen';
});
cApp.controller('Trade', function($scope, $routeParams) {
      $scope.pageClass = 'page-trade';
   $scope.message = 'This is Show trade screen';
});

function NavigationController($scope, $http, $modal, userService) {
    
    $scope.getNavData = function() {
      console.log('init 0');
    }

    $scope.openCreateModal = function() {
      $modal.open({
        templateUrl: '/partials/wallet_create_modal.html',
        controller: CreateWalletController
      });
    }

    $scope.openImportModal = function() {
      $modal.open({
        templateUrl: '/partials/wallet_import_modal.html',
        controller: WalletController
      });
    }

    $scope.openLoginModal = function() {
      $modal.open({
        templateUrl: '/partials/login_modal.html',
        controller: LoginController 
      });
    }

    $scope.logout = function() {
      userService.logout();
    }
     
    $scope.user = userService.data;
}

var mockDataForThisTest = [
    {
    color: 'blue',
    moniker:'land',
    balance: "200000.000000",
    address: "1ra"},
{
    color: 'orange',
    moniker:'house',
    balance: "140.12304",
    address: "1be"}
];


function assets($scope, $http) {

    $scope.assets = mockDataForThisTest;
      //  $scope.assets = data;
        /*var httpRequest = $http({
            method: 'POST',
            url: '/echo/json/',
            data: mockDataForThisTest

        }).success(function(data, status) {
        
        });*/

}


var data2=[]
function IssueController($scope,$http) {


  $scope.formData={}

$scope.processForm = function() {
  console.log('submitted');
   //$scope.formData;
  $http({
        method  : 'POST',
        url     : 'https:/localhost/process.php',
        data    : encodeURI(JSON.stringify($scope.formData)),  // pass in data as strings
        headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  // set the headers so angular passing info as form data (not request payload)
    })
        .success(function(data) {
            console.log(data);

            if (!data.success) {
              // if not successful, bind errors to error variables
                $scope.errorName = data.errors.name;
                $scope.errorSuperhero = data.errors.superheroAlias;
            } else {
              // if successful, bind success message to message
                $scope.message = data.message;
            }
        });


};
}




