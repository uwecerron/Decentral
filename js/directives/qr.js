  cApp.directive('qrCode', function($compile) {
    return {
      restrict: 'E',
    replace:true,
      link: function(scope, element, attrs) {
        var qrcode = new QRCode(element[0], {
          width : 164,
          height : 164,
          correctLevel : QRCode.CorrectLevel.H,
          useSVG: true,
        });
        qrcode.makeCode(attrs.data);
      }
    };
  });