
"use strict";

var cApp =angular.module('DecentralWallet', ['ngRoute','ngAnimate','xeditable','ngGrid',"ui.router", "ui.bootstrap",]);
cApp.config(function ($routeProvider) {
    $routeProvider.
     when('/Home', {
        templateUrl: 'view/home.html',
        controller: 'Home'
    }).
      when('/Assets', {
        templateUrl: 'view/assets.html',
        controller: 'AssetsController'
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
      }).
      when('/Settings',{
              templateUrl: 'view/settings.html',
        controller: 'SettingsController'
      })
      .otherwise({
        redirectTo: '/Home'
      });
  });

//Add this to have access to a global variable
cApp.run(function ($rootScope) {
    $rootScope.globalVariable = 'Amadou'; //global variable
});

cApp.directive("selected", function($timeout) {
  return function($scope, element, attrs) {
    $scope.$watch('currentAddress', function() {
      $(element).focus()
      $(element).select()
     // console.log(element);
    })
  }
})

cApp.directive('inlineEdit', function() {

    return function(scope, element, attrs) {
        element.bind('click', function(){
            element.toggleClass('inactive');
            if(element.hasClass('inactive')){
                $(element).blur();
            }
        });
         element.bind('keyup', function(event) {
          if(event.keyCode==13) handler(event)
        });
     
    };

});

//var newstorage=new Decentralstorage();
//var shit= new lecrapper(newstorage);
//var suckit= shit.getit();
//console.log();




