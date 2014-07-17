
"use strict";

var cApp =angular.module('DecentralWallet', ['ngRoute','ngAnimate','xeditable','ngGrid',"ui.router", "ui.bootstrap",]);
cApp.config(function ($routeProvider) {
  //authentication
    $routeProvider.when('/login',{
        resolve:{
          authenticate:function($location,$rootScope,WalletManager){
              console.log("authentication called");
              //return true;   
              // Entry into App
              if( authenticated === true ){
                  InitController()
                  $location.path("/Home");
               }

              if (!WalletManager.isAuthenticated)
              {
                  $location.path('/login');
              }

              WalletManager.isAuthenticated( function(authenticated){
                     if ( authenticated === false )
                     {
                        $location.path( "/login" )
                      }
                 })  
          
        }
      }
    });

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
      }).
      when('/Passphrase',{
              templateUrl: 'view/passphrase.html',
        controller: 'PassphraseController'
      }).
	  when('/login',{
            templateUrl: 'view/login.html',
			controller: 'InitController'
      })
      .otherwise({
        redirectTo: '/login'
      });

    $routeProvider.when( '/logout', {
        resolve:{
        logout: function($rootScope, $location,DecentralStorage) {
        DecentralStorage.remove("security", "password");
        return $location.path("/login");
      }
    }
  })

  });//end config

  





