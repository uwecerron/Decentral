'use strict';

//implement validation as a service
var validation = {
  address: function($scope) {
    var inputAddress = $scope.inputAddress
    var validate = function validate(address) {
      try{
    var bytes = new Bitcoin.Address.fromBase58Check(address);
    return true;
    }catch(e){
    //console.log(e)
    return false;
    }
    };
    //end of validation method
      var valid = validate(inputAddress);
      //console.log(valid);
      if (!valid) {
        $scope.form.address = {
          message: "Invalid address"
        }
      }else{
        $scope.form.address = {
          message: " "
        }
        return true;
      }
 
  },
  amount: function($scope) {
    var satoshis = 100000000;
  /*  var inputAmount = BigInteger.valueOf( parseInt($scope.inputAmount*satoshis));
    var balance = BigInteger.valueOf($scope.balance);
    console.log(balance);
      console.log("input"+inputAmount);
    var minerFee = BigInteger.valueOf(10000);
*/
    $scope.$apply( function() {
      if (isNaN($scope.inputAmount)) {
        $scope.form.amount = {
          message: "Not a Number"
        }
      }/*else if (inputAmount.compare(BigInteger.ZERO) === 0 ) {
        $scope.form.amount = {
          message: "Must be above 0"
        }
      }else if ( inputAmount.add(minerFee).compare(balance) > 0 ) {
        $scope.form.amount = {
          message: "Not enough in balance"
        }
      }*/else{

      $scope.form.amount = {
     
        valid: true
      }
    }
    } )

  }
}

cApp.directive( 'validateAddress', function() {
  return {
    restrict: 'A',
    link: function( $scope, element, attrs ) {
      element.on( "blur submit keyup", function() {
        validation.address($scope)
      } )

    }
  };
} )

cApp.directive( 'validateAmount', function() {
  return {
    restrict: 'A',
    link: function( $scope, element, attrs ) {
      element.on( "blur submit keyup", function() {
        validation.amount($scope)
      } )
    }
  };
} )
