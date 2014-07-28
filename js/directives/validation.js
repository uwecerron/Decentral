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
    if (!valid) 
    {
        $scope.form.address = {
         message: "Invalid address"
         }
    }else
    {
        $scope.form.address = {
        message: " "
        }
        return true;
    }
 
  },
  units:function($scope){
    $scope.$apply( function() {
      if (isNaN($scope.unitsAmount)) 
      {
          $scope.form.units = {
          message: "Not a Number"
        }
      }else
      {
          $scope.form.units = {
           valid: true
          }
      }

    })
            return true;
  },
  tokens:function($scope){
    $scope.$apply( function() {
      if (isNaN($scope.tokensAmount)) 
      {
          $scope.form.tokens = {
          message: "Not a Number"
        }
      }else
      {
          $scope.form.tokens = {
           valid: true
          }
      }
    })
                return true;
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
    })

	},
  newPassword:function($scope){
    $scope.$apply( function() {
    if ($scope.newpassword === undefined || $scope.newpassword.length < 10) {
      $scope.form.password ={errorMessage: "longer than 10 letters"};
      $scope.css = "error"
      return;
    }else if ($scope.newpassword !== $scope.newpasswordConfirm) {
      $scope.form.password = {errorMessage: "Doesn't match"};
      $scope.css = "error"
      return;
    }else{
   $scope.form.password = {errorMessage: " "};

    }

   })

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
})

cApp.directive( 'validateAmount', function() {
  return {
    restrict: 'A',
    link: function( $scope, element, attrs ) {
      element.on( "blur submit keyup", function() {
        validation.amount($scope)
      } )
    }
  };
})
cApp.directive( 'newPassword', function() {
  return {
    restrict: 'A',
    link: function( $scope, element, attrs ) {
      element.on( "blur submit keyup", function() {
        validation.newPassword($scope)
      } )
    }
  };
} )
cApp.directive( 'validateUnits', function() {
  return {
    restrict: 'A',
    link: function( $scope, element, attrs ) {
      element.on( "blur submit keyup", function() {
        validation.units($scope)
      } )
    }
  };
} )

cApp.directive( 'validateTokens', function() {
  return {
    restrict: 'A',
    link: function( $scope, element, attrs ) {
      element.on( "blur submit keyup", function() {
        validation.tokens($scope)
      } )
    }
  };
} )



