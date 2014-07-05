 cApp.controller('Home', function($scope, $rootScope,Blockchaininfo,Decentralstorage,TransactionFetcher) {
         $scope.pageClass = 'page-home';
    $scope.message = 'Choose Your Wallet';
    $rootScope.$watch( 'balance', function() {
    $scope.balance = $rootScope.balance;
  } )
   $scope.currentAddress = "1Yj564jDqoB6L7hg5ETYKhqRsB65WrWPB";


var example = new TransactionFetcher();
example.get();

/*
var BlockD = new Decentralstorage();
var fun1 = function(){BlockD.save( "security","name",{"4":"hash"})};
var fun2 = function(){BlockD.save( "security","name",{"5":"hash"})};
var fun3 = function(){BlockD.save( "security","name",{"6":"hash"})};
BlockD.save( "security","name",{"t0":"hash"});
BlockD.save( "security","name",{"t1":"hash"});
BlockD.save( "security","name",{"t2":"hash"});
BlockD.save( "security","name",{"t3":"hash"});
BlockD.save( "security","name",{"t4":"hash"});
BlockD.save( "security","name",{"t5":"hash"});
BlockD.save( "security","name",{"t6":"hash"});
BlockD.save( "security","name",{"t7":"hash"});
BlockD.save( "security","name",{"t8":"hash"});
BlockD.save( "security","name",{"t9":"hash"});
BlockD.save( "security","name",{"t10":"hash"});
BlockD.save( "security","name",{"t11":"hash"});
BlockD.save( "security","name",{"t12":"hash"});
*/
//var Block2= new Blockchaininfo();
//var addresses=['1Af7Xx9hpqS2GBLY6swqe2fsMmNgPxzAPk','1Yj564jDqoB6L7hg5ETYKhqRsB65WrWPB'];
//Block2.multiAddr(addresses);

    function download(data) {
    var a = document.createElement("a");
     var backup = "data:text/csv;charset=utf-8,";
        backup += escape(data);
        a.href= backup;
        a.click();
    };



$scope.backup= function(){
var data =  "herro" ;
download(data);



}
//onsole.log(Wallet);
//console.log(shita);
 setTimeout(function() {
            var el = document.getElementById('first');
            angular.element(el).triggerHandler('click');
        }, 0);

var obj = {a: 123, b: "4 5 6"};
     var data = {a:1, b:2, c:3};
    //var json = JSON.stringify(wallet1.Addresses);
    
    $scope.downloadWallet = function(){
      console.log('downloaded');
      console.log(wallet1.Addresses);
      chrome.downloads.download(obj);
        return new Blob([wallet1.Addresses], {type: "application/json"});
        
    }
var data = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(obj));

$scope.url=data;
/*$scope.$watch('currentAddress', function() {
       alert('hey, myVar has changed!');
   });
  */  $scope.generateLeAddress = function() {
    //  var privateKeyBytes = createPrivateKeyBytes();
     // var key = new Bitcoin.ECKey( privateKeyBytes );
      //$scope.$apply( function() {
 $scope.currentAddress =  wallet1.generatePublicAddress();

            //$scope.currentImgURL = baseURL + $scope.currentAddress
          //} )
      //console.log($scope.currentAddress);
     // console.log(wallet1.Addresses)
    }

  //} )
});//end Home Controller