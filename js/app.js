
"use strict";

var cApp =angular.module('DecentralWallet', ['ngRoute','ngAnimate','xeditable','ngGrid',"ui.router", "ui.bootstrap",]);
cApp.config(function ($routeProvider) {
  //authentication
    $routeProvider.when('/',{
        resolve:{
          authentication:function($location,$rootScope){
            //initialize here?

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
	  when('/Init',{
            templateUrl: 'view/init.html',
			controller: 'InitController'
      })
      .otherwise({
        redirectTo: '/Init'
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

  





