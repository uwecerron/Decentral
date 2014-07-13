'use strict';

cApp.controller('loginController',DecentralStorage,function($scope,$location){

var storage= DecentralStorage();

$scope.submit=function(){
    var authenticated = DecentralStorage.save('security','password',$scope.password);
	if(authenticated === true) 
	{
	    $scope.$apply( function(){
	        return $location.path( "/Home" );
	    }
	}
	else
	{
        $scope.css='error';
	}

})//end login controller