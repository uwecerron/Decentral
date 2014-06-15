'use strict';


var validation = {
  address: function( $scope ) {
    var inputAddress = $scope.inputAddress
    var validate =  function validate(address) {
      var bytes = Bitcoin.Base58.decode( address );
      console.log(bytes)
      var end = bytes.length - 4;
       console.log(end)
      var addressChecksum = bytes.slice( end, bytes.length );
        console.log(addressChecksum)
      var hash = bytes.slice( 0, end );
        console.log(hash)
      var hashChecksum = Crypto.SHA256( Crypto.SHA256( hash, {
          asBytes: true} ), {asBytes: true } );;
       console.log(hashChecksum)
      return checkaddress( addressChecksum, hashChecksum.slice( 0, 4 ) );

      function checkaddress( checksum1, checksum2 ) {
        if ( checksum1.length !== checksum2.length || checksum1.length !== 4 ) {
          return false;
        }
        for ( var i = 0; i < checksum1.length; ++i ) {
          if ( checksum1[ i ] !== checksum2[ i ] ) return false;
        }
        return true;
      }
    }//end of validation method

    $scope.$apply( function() {
      if ( inputAddress === undefined || inputAddress.length === 0 ) {
        $scope.form.address = {
          message: ""
        }
        return;
      }
      var valid = validate(inputAddress)
      //console.log(valid);
      if ( !valid ) {
        $scope.form.address = {
          message: "Invalid address"
        }
        return;
      }

      $scope.form.address = {
        message: "All Valid",
      }
      return;

    } )
  },
  amount: function( $scope ) {
    var satoshis = 100000000

    // Must use BigIntegers, floats are imprecise
    var inputAmount = BigInteger.valueOf( parseInt( $scope.inputAmount * satoshis ) )
    var balance = BigInteger.valueOf( $scope.balanceInt )
    var minerFee = BigInteger.valueOf( 10000 )

    $scope.$apply( function() {
      if ( typeof $scope.inputAmount !== "number" ) {
        $scope.form.amount = {
          css: "warning",
          message: "Not a Number"
        }
        return;
      }

      if ( inputAmount.compareTo( BigInteger.ZERO ) <= 0 ) {
        $scope.form.amount = {
          css: "error",
          message: "Must be above 0"
        }
        return;
      }

      if ( inputAmount.add( minerFee ).compareTo( balance ) > 0 ) {
        $scope.form.amount = {
          css: "error",
          message: "Not enough in balance"
        }
        return;
      }

      return;
    } )

  }
}

cApp.directive( 'validateAddress', function() {
  return {
    restrict: 'A',
    link: function( $scope, element, attrs ) {
      // TODo: $scope feels too tightly coupled
      element.on( "blur submit keyup", function() {
        validation.address( $scope )
      } )

    }
  };
} )

cApp.directive( 'validateAmount', function() {
  return {
    restrict: 'A',
    link: function( $scope, element, attrs ) {

      // TODO: $scope is too tightly coupled
      element.on( "blur submit keyup", function() {
        validation.amount( $scope )
      } )
    }
  };
} )
