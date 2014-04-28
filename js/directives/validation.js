"use strict";


cApp.directive('validAmount',function(){
        return{
          require: "ngModel",
          link: function(scope, elm, attrs, ctrl){
            
            var regex=/^\d{1,8}(\.\d{1,8})?$/;
            ctrl.$parsers.unshift(function(viewValue){
              var floatValue = parseFloat(viewValue);
              if( floatValue >= 0.0001 && floatValue <=100000 && regex.test(viewValue)){
                ctrl.$setValidity('validPrice',true);
                //return viewValue;
              }
                            else{
                  ctrl.$setValidity('validPrice',false);
                            }
              return viewValue;
            });
          }
        };
      });

cApp.directive('lowerThan', [
  function() {

    var link = function($scope, $element, $attrs, ctrl) {

      var validate = function(viewValue) {
        var comparisonModel = 0.0010000;
        var upperlimit=1000000.00000000
        if(!viewValue || !comparisonModel || !upperlimit){
          // It's valid because we have nothing to compare against
          ctrl.$setValidity('lowerThan', true);
        }

        // It's valid if model is lower than the model we're comparing against
        ctrl.$setValidity('lowerThan', parseFloat(viewValue, 10) >= parseFloat(comparisonModel, 10));
        ctrl.$setValidity('higherthan', parseFloat(viewValue, 10)<=parseFloat(upperlimit, 10) );
     
        
        return viewValue;
      };
      

      ctrl.$parsers.unshift(validate);
      ctrl.$formatters.push(validate);

      $attrs.$observe('lowerThan', function(comparisonModel){
        return validate(ctrl.$viewValue);
      });
       $attrs.$observe('higherthan', function(upperlimit){
        return validate(ctrl.$viewValue);
      });
      
    };

    return {
      require: 'ngModel',
      link: link
    };

  }
]);