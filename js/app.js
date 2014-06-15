
"use strict";

var cApp =angular.module('ChromaWallet', ['ngRoute','ngAnimate','xeditable','ngGrid',"ui.router", "ui.bootstrap",]);
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
    function createPrivateKeyBytes() {
      var privateKeyBytes = [];
      var randArr = new Uint8Array( 32 );
      crypto.getRandomValues( randArr );
      for ( var i = 0; i < randArr.length; i++ ) {
        privateKeyBytes[ i ] = randArr[ i ];
      }
      return privateKeyBytes;
    }

 
 cApp.factory('WalletFactory', function() {
  var Wallet2 = function(){
    this.fuck="fucl";

  };
  var list = [];
  Wallet2.prototype.getItem = function() { console.log("works");}
  Wallet2.prototype.addItem = function(item) { list.push(item); }
  Wallet2.prototype.removeItem = function(item) { list.splice(list.indexOf(item), 1) }
  Wallet2.prototype.size = function() { return list.length; }
  Wallet2.prototype.shita="shita";

  return Wallet2;
});

var lecrapper= function(Decentralstorage){
  console.log('lecrpper');
this.variable=Decentralstorage.getall('cache');

}
lecrapper.prototype.getit= function(){
  return this.variable;
}

//var newstorage=new Decentralstorage();
//var shit= new lecrapper(newstorage);
//var suckit= shit.getit();
//console.log();




