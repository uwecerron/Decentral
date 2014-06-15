   // var ledecentral = new Decentralstorage();
  //ledecentral.save( "cache", "currentAddress", "asaca",'more crap');
 //ledecentral.getall();
  
cApp.controller('Home', function($scope, $rootScope,WalletFactory,Blockchaininfo) {
         $scope.pageClass = 'page-home';
    $scope.message = 'Choose Your Wallet';
    $rootScope.$watch( 'balance', function() {
    $scope.balance = $rootScope.balance;
  } )
   $scope.currentAddress = "1Yj564jDqoB6L7hg5ETYKhqRsB65WrWPB";

console.log('logged');


    function sacka(){
      var shit=new WalletFactory();
shit.getItem();
//WalletFactory.getItem();
}
sacka();
var Block2= new Blockchaininfo();
var addresses=['1Af7Xx9hpqS2GBLY6swqe2fsMmNgPxzAPk','1Yj564jDqoB6L7hg5ETYKhqRsB65WrWPB'];
Block2.multiAddr(addresses);



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

    $scope.generateLeAddress = function() {
    //  var privateKeyBytes = createPrivateKeyBytes();
     // var key = new Bitcoin.ECKey( privateKeyBytes );
      //$scope.$apply( function() {
 $scope.currentAddress =  wallet1.generateAddress();
            //$scope.currentImgURL = baseURL + $scope.currentAddress
          //} )
      //console.log($scope.currentAddress);
     // console.log(wallet1.Addresses)
    }

  //} )
   $scope.addresses = [{id:1,name: "name", address:50,balance:10},
                     {id:1,name: "name", address: 43,balance:30},
                     {id:1,name: "name", address: 27,balance:20},
                     {id:1,name: "name", address: 29,balance:20},
                     {id:1,name: "name", address: 34,balance:20}];
       $scope.gridOptions = { 
      data: 'addresses', 
      enableCellSelection: true,
      enableCellEditOnFocus: true,
      enableRowSelection: false,
      columnDefs: [{field: 'name', displayName: 'Name', enableCellEdit: true}, {field:'address', displayName:'Address', enableCellEdit: false}, {field:'balance', displayName:'Balance', enableCellEdit: false}]
    };

});//end Home Controller