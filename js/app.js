
var cApp =angular.module('ChromaWallet', ['ngRoute', 'ngAnimate','xeditable']);
cApp.config(function ($routeProvider) {
    $routeProvider.
     when('/Home', {
        templateUrl: 'home.html',
        controller: 'Home'
    }).
      when('/Receive', {
        templateUrl: 'receive.html',
        controller: 'Receive'
    }).
      when('/Send', {
        templateUrl: 'send.html',
        controller: 'Send'
    }).
      when('/Assets', {
        templateUrl: 'asset.html',
        controller: 'Assets'
    }).
      when('/Trade', {
        templateUrl: 'trade.html',
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
cApp.controller('Home', function($scope, $rootScope ) {
         $scope.pageClass = 'page-home';
    $scope.message = 'This is the homer screen';
    $rootScope.$watch( 'balance', function() {
    $scope.balance = $rootScope.balance
  } )



    $scope.generateLeAddress = function() {
      var privateKeyBytes = createPrivateKeyBytes();
      var key = new Bitcoin.ECKey( privateKeyBytes );
      //$scope.$apply( function() {
            $scope.currentAddress =  key.getBitcoinAddress().toString()
            //$scope.currentImgURL = baseURL + $scope.currentAddress
          //} )
      //console.log($scope.currentAddress);
    }

  //} )
     
});//end Home Controller
 
 cApp.factory('ListService', function() {
  var ListService = {};
  var list = [];
  ListService.getItem = function(index) { return list[index]; }
  ListService.addItem = function(item) { list.push(item); }
  ListService.removeItem = function(item) { list.splice(list.indexOf(item), 1) }
  ListService.size = function() { return list.length; }

  return ListService;
});



cApp.directive('validAmoun',function(){
        return{
          require: "ngModel",
          link: function(scope, elm, attrs, ctrl){
            
            var regex=/^\d{1,8}(\.\d{1,8})?$/;
            ctrl.$parsers.unshift(function(viewValue){
              var floatValue = parseFloat(viewValue);
              if( floatValue >= 0.0001 && floatValue <=100000 && regex.test(viewValue)){
                ctrl.$setValidity('validPrice',true);
                //return viewValue;
              }
                            else{
                  ctrl.$setValidity('validPrice',false);
                            }
              return viewValue;
            });
          }
        };
      });


cApp.controller('Receive', function($scope) {
     $scope.pageClass = 'page-receive';
    $scope.message = 'This is Show receive screen';
 
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
/*
function assets($scope){
//  $scope.items = [{Color:'blue' ,Balance:'2000000' ,Address: 'test'}}];
$scope.items = [['Color', 'Balance', 'Address'], ['item1', 'item2', 'item3'], ['item4', 'item5', 'item6']];
}
*/

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

/*
var mockDataForThisTest = "json=" + encodeURI(JSON.stringify([
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
]));*/

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
/*
  if(data2!=null){
$scope.a1 = data2[0];
  $scope.a2 = data2[1];
  $scope.a3 = data2[2];

  }else{
  $scope.a1 = 1;
  $scope.a2 = 2;
  $scope.a3 = 3;
  }
  $scope.q = [$scope.a1, $scope.a2,$scope.a3];
  $scope.q=data2;*/
}




cApp.value('ReceiveTable',{
        items : [
          {Name: "XYZ Corp", BTC: "25",Address:"mhRYQjHSu4QQRr8yi5m2eiSznsUt4HrJSy", Units: "10"},
          {Name: "Land", BTC: "50",Address:"mhRYQjHSu4QQRr8yi5m2eiSznsUt4HrJSy", Units: "15"},
          {Name: "Burger King", BTC: "100",Address:"mhRYQjHSu4QQRr8yi5m2eiSznsUt4HrJSy", Units: "5"}
          ],
        addItem: function(item){
          this.items.push(item);
        },
        totalBTC: function(){
          var total = 0;
          for(count=0;count<this.items.length;count++){
            total += this.items[count].BTC*this.items[count].Units;
          }
          return total;
        },
        removeItem: function(index){
          this.items.splice(index,1);
        }
        
      })
      .filter('btc',function(){
        return function(item){
          return item;
        }
      })


function ReceiveAssets($scope,ReceiveTable)  {
    $scope.items = ReceiveTable.items;
    $scope.item = {};

    $scope.addItem = function(item) {
       var privateKeyBytes = createPrivateKeyBytes();
      var key = new Bitcoin.ECKey( privateKeyBytes );
       $scope.item.Address =key.getBitcoinAddress().toString();
      ReceiveTable.addItem(item);
      $scope.item = {};    
      $scope.itemForm.$setPristine();
      
      //$scope.$apply( function() {
     
    };
   
    $scope.totalBTC = ReceiveTable.totalBTC;
    
  
    $scope.mySortFunction = function(item) {
      if(isNaN(item[$scope.sortExpression]))
        return item[$scope.sortExpression];
      return parseInt(item[$scope.sortExpression]);
    };
    
      $scope.removeItem = function(index){
      ReceiveTable.removeItem(index);
    };
    
    $scope.name=/^[a-zA-Z ]*$/;
    
        $scope.integerval=/^\d*$/;
  }