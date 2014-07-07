 cApp.controller('Home', function($scope, $rootScope,Blockchaininfo,Wallet,Decentralstorage,TransactionFetcher) {
         $scope.pageClass = 'page-home';
    $scope.message = 'Choose Your Wallet';
    $rootScope.$watch( 'balance', function() {
    $scope.balance = $rootScope.balance;
    })
   $scope.currentAddress = "1Yj564jDqoB6L7hg5ETYKhqRsB65WrWPB";


    var example = new Decentralstorage();
    //example.getall();
    var wallet1=new Wallet("uwe1");
    wallet1.loadWallet(function(data){
    //console.log(data)

    });
    console.log(wallet1.Addresses);
    //var BlockD = new Decentralstorage();
    //var fun1 = function(){BlockD.save( "security","name",{"4":"hash"})};
    //var fun2 = function(){BlockD.save( "security","name",{"5":"hash"})};
    //var fun3 = function(){BlockD.save( "security","name",{"6":"hash"})};
    /*BlockD.save( "security","name",{"t0":"hash","pvtkey":"Lshafasjasbjasbjasjfbasjbajfsa"});
    BlockD.save( "security","name",{"t1":"hash","pvtkey":"Lshafasjasbjasbjasjfbasjbajfsa"});
    BlockD.save( "security","name",{"t2":"hash","pvtkey":"Lshafasjasbjasbjasjfbasjbajfsa"});
    BlockD.save( "security","name",{"t3":"hash","pvtkey":"Lshafasjasbjasbjasjfbasjbajfsa"});
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
      var data =  wallet1.getWallet();
      download(data);
    }
    setTimeout(function() {
      var el = document.getElementById('first');
       angular.element(el).triggerHandler('click');
    },0);

     var obj = {a: 123, b: "4 5 6"};
     var data = {a:1, b:2, c:3};
    //var json = JSON.stringify(wallet1.Addresses);
    
    $scope.downloadWallet = function(){
      console.log('downloaded');
      console.log(wallet1.Addresses);
      chrome.downloads.download(obj);
        return new Blob([wallet1.Addresses], {type: "application/json"});
        
    }
   $scope.generateLeAddress = function() {
      $scope.currentAddress =  wallet1.generatePublicAddress();
    }

  //} )
});//end Home Controller