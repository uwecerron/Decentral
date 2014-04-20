'use strict';

angular.module('indexedExApp')
.controller('MainCtrl', function ($scope) {
    $scope.items = '';

    var initCallback = function(){
        getItems();
    };

    var dataStore = new IDBStore('info', initCallback);

    var getItemsSuccess = function(data){
    
        //console.log(data[0].text);
        var nouns;
        $scope.items = data;
       /* console.log(data[0].text[0][0]);
        for(var k=0;k<data.length;k++){
            for(var n=0;n<data[0].text.length;n++){

                console.log(data[k].text[n][0]);
            }
        }*/
        console.log(data[1].text);
        // http://jimhoskins.com/2012/12/17/angularjs-and-apply.html 
        $scope.$apply(); 
    };

    var errorCallback = function(){
        console.log('error'); 
    };

    var getItems = function(){
        dataStore.getAll(getItemsSuccess,errorCallback);
        console.log('getItems'); 
    };

    $scope.deleteItem = function(item){
        dataStore.remove(item,getItems,errorCallback);
    }

    $scope.addItem = function(){
        dataStore.put({'timeStamp': new Date().getTime(),'url':'Myself' , 'text' : $scope.itemname},getItems,errorCallback); 
        $scope.itemname = ''; 
    };
    $scope.searchFilter = function (item) {
    var keyword = new RegExp($scope.nameFilter, 'i');
    return !$scope.nameFilter || keyword.test(items.url); //|| keyword.test(items.url);
};

});


