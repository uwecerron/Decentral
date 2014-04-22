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