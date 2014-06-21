cApp.directive('bal', function() {
    return {
        restrict: 'A',
        scope : {
            value : '='  
        },
        template : "<div>BTC:{{value}}</div>"
    };
});