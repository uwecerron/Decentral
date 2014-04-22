
"use strict";

var cApp =angular.module('ChromaWallet', ['ngRoute', 'ngAnimate','xeditable']);
cApp.config(function ($routeProvider) {
    $routeProvider.
     when('/Home', {
        templateUrl: 'view/home.html',
        controller: 'Home'
    }).
      when('/Receive', {
        templateUrl: 'view/receive.html',
        controller: 'ReceiveController'
    }).
      when('/Send', {
        templateUrl: 'view/send.html',
        controller: 'SendController'
    }).
      when('/Issue', {
        templateUrl: 'view/issue.html',
        controller: 'IssueController'
    }).
      when('/Trade', {
        templateUrl: 'view/trade.html',
        controller: 'TradeController'
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

/*()
cApp.controller('Send', function($scope, $routeParams) {
      $scope.pageClass = 'page-send';    $scope.message = 'This is Show send screen';
});
*/

function TradeController($scope,$http){
   $scope.pageClass = 'page-trade';
   $scope.message = 'This is Show trade screen';

     $scope.buy = function(item) {
      console.log('hero');
     }

       $scope.sell = function(item) {

       }


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






