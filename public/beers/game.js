angular
    .module("SOS161710")
    .controller("Games", ["$http", function($http) {
        var data = [];

        $http.get("http://sos1617-10.herokuapp.com/api/v2/beers-stats?apikey=jesusguerre").then(function(response) {
            var aux = response.data;
            aux.forEach((x) => {
                data.push([x.name, new Date(x.birthyear, 0, 1), new Date(x.birthyear, 11, 31)]);
            });
        });
        $http.get("http://sos1617-10.herokuapp.com/api/v2/games?apikey=jesusguerre").then(function(response) {
            var aux = response.data;
            aux.forEach((x) => {
                data.push([String(x.game), new Date(x.y, 0, 1), new Date(x.y, 11, 31)]);
            });
            data.sort(function(a, b) {
                return a[1] - b[1];
            });
            google.charts.load('current', {
                'packages': ['timeline']
            });
            google.charts.setOnLoadCallback(drawChart);

            function drawChart() {
                var container = document.getElementById('timeline');
                var chart = new google.visualization.Timeline(container);
                var dataTable = new google.visualization.DataTable();

                dataTable.addColumn({
                    type: 'string',
                    id: 'President'
                });
                dataTable.addColumn({
                    type: 'date',
                    id: 'Start'
                });
                dataTable.addColumn({
                    type: 'date',
                    id: 'End'
                });
                dataTable.addRows(data);

                chart.draw(dataTable);
            }

        });





    }]);