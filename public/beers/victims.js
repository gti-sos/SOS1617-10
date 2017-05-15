angular
    .module("SOS161710")
    .controller("Victims", ["$http", function($http) {
            console.log("Controller initialized!");
            var beers = [];
            var victims = [];
            var yearfrom = 1900
            var datatoshow = [];
            $http.get("http://sos1617-10.herokuapp.com/api/v2/beers-stats/?from=" + yearfrom + "&apikey=jesusguerre").then(function(response) {
                var data = response.data;
                var cont = 1;

                data.forEach((x) => {
                    beers.push([Date.UTC(x.birthyear, 11, 31),cont]);
                    cont++;
                });



            });
            $http.get("http://sos1617-10.herokuapp.com/api/v2/victimsproxy").then(function(response) {
                var data = response.data;


                data.forEach((x) => {
                    victims.push(Number(x.numberVictims));
                });
                var longitud = Math.min(beers.length, victims.length);
                console.log(longitud);
                for (var i = 0; i < longitud; i++) {
                    datatoshow.push([beers[i][0],victims[i],beers[i][1]]);
                }
                console.log(datatoshow);

                Highcharts.stockChart('container', {

                    chart: {
                        type: 'arearange'
                    },

                    rangeSelector: {
                        selected: 2
                    },

                    title: {
                        text: 'Temperature variation by day'
                    },

                    tooltip: {
                        valueSuffix: '°C'
                    },

                    series: [{
                        name: 'Temperatures',
                        data: datatoshow
                    }]

                });
            });

        



    }]);
