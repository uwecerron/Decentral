"use strict";


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
		for(var count=0;count<this.items.length;count++){
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


function AssetsController($scope,ReceiveTable,DecentralStorage)  {
   $scope.pageClass = 'page-assets';
    $scope.items = ReceiveTable.items;
    $scope.item = {};
	$scope.addAssetShow = false;
   var ledecentral = DecentralStorage;
   
   var values ={Name: "Burger2 King2", BTC: "1200",Address:"mhRYQjHSu4QQRr8yi5m2eiSznsUt4HrJSy", Units: "5"};
    ledecentral.save( "address", values);
    ledecentral.getall();


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
    
      /*$scope.removeItem = function(index){
      ReceiveTable.removeItem(index);
    };*/
    
    $scope.name=/^[a-zA-Z ]*$/;
    
        $scope.integerval=/^\d*$/;
  }