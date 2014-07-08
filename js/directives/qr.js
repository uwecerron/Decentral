  cApp.directive('qrCode', function() {
    return {
      restrict: 'A',
      link: function(scope, element) {
         scope.$watch('currentAddress', function (val){
         if (val){
        console.log("changed") 
        console.log(element.html())   
        var qrcode = new QRCode(element[0], {
          width : 164,
          height : 164,
          correctLevel : QRCode.CorrectLevel.H,
          useSVG: true,
        });
        qrcode.makeCode(val);
        }
        else console.log("bleh")
          });
      replace: true
      }//end link function

    };
  });
//TO: replace element instead of appending it
  