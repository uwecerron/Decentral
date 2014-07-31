function TradeController($scope,$http){
    $scope.pageClass = 'page-trade';
    $scope.message = 'This is Show trade screen';
    var ws = new WebSocket("ws://localhost:9402/socket/");
    setTimeout(function() {
      var el = document.getElementById('first2');
       angular.element(el).triggerHandler('click');
    },0);

    ws.onopen = function(){  
        console.log("Connected to peer");  
    };
    
    ws.onmessage = function(message){
        listener(JSON.parse(message.data));
    };   

    $scope.buy = function() {

    }

    $scope.sell = function() {
         console.log("sell"); 
    }

    $scope.btcprice = function() {
        //$scope.View="herro"
        console.log("price"); 
    }
    $scope.findtokens = function() {
        //$scope.View="token view"
        console.log("tokens");  
    }
    $scope.multisign = function() {
        console.log("multising");  
    }
    $scope.history = function() {
        console.log("history");
    }



}
