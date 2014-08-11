"use strict";

cApp.controller('TradePriceController', function ($scope,$http) {
    //chart
    $scope.chartConfig = {
        options: {
            chart: {
                backgroundColor: '#F3F3F3',
                type: 'line',
                zoomType: 'x'
            }
        },
        series: [{
            data: [620, 600, 590, 595, 584, 570, 560, 592, 588, 580]
        }],
        title: {
            text: 'BTCUSD'
        },
      
        yAxis: {title: {text: 'Price'},  labels: {
            formatter: function() {
                return this.value +'$';
            }
        }
    },
        xAxis: {currentMin: 0,type:"datetime", dateTimeLabelFormats:{
            month: '%b %e'
          }},
        loading: false
    }

    //blockchain price
     $http.get('http://onemainpage.com/api/1/blockchain/').
    success(function(data, status, headers, config) {
      
      console.log(data[0]);
      $scope.volume=numeral(Number(data[0].trade_volume_btc)).format("0,0");
      $scope.marketcap=numeral(data[0].market_price_usd*data[0].totalbc/1e8).format("0.00 a");
      $scope.totalbc=numeral(data[0].totalbc/1e14).format("0.00")+' MM';
      $scope.blocktime=Number(data[0].minutes_between_blocks).toFixed(2)+' Min';
      $scope.nextdifficulty=Math.ceil((data[0].nextretarget - data[0].n_blocks_total) * data[0].minutes_between_blocks / 60 / 24);
      $scope.hashrate=numeral(Number(data[0].hash_rate).toFixed()).format("0,0");;
    }).
    error(function(data, status, headers, config) {
      // log error
    });

});