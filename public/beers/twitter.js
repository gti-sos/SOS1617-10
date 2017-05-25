angular
    .module("SOS161710")
    .controller("TwitterInt", ["$http", function($http) {
        
        var data=[];
        
        
        $http.get("/api/v2/beers-stats/Spain/?apikey=jesusguerre").then(function(response) {
            var beers=response.data;
            
            beers.forEach( (x) => {
                $http.get("/api/v2/twitsearch"+x.name.toLocaleLowerCase()).then(function (response){
                    var tweets=[];
                    response.data.forEach( (x) =>{
                        tweets.push(x.text);
                    })
                })
            })



        });






        google.charts.load('current', {
            'packages': ['bar']
        });
        google.charts.setOnLoadCallback(drawChart);

        function drawChart() {
            var data = google.visualization.arrayToDataTable([
                ['Name', 'Sales', 'Expenses', 'Profit'],
                ['Cruzcampo', 1000, 400, 200],
                ['Estrella damm', 1170, 460, 250],
                ['2016', 660, 1120, 300],
                ['2017', 1030, 540, 350]
            ]);

            var options = {
                chart: {
                    title: 'Company Performance',
                    subtitle: 'Sales, Expenses, and Profit: 2014-2017',
                },
                bars: 'vertical',
                vAxis: {
                    format: 'decimal'
                },
                height: 400,
                colors: ['#1b9e77', '#d95f02', '#7570b3']
            };

            var chart = new google.charts.Bar(document.getElementById('chart_div'));

            chart.draw(data, google.charts.Bar.convertOptions(options));

            var btns = document.getElementById('btn-group');

            btns.onclick = function(e) {

                if (e.target.tagName === 'BUTTON') {
                    options.vAxis.format = e.target.id === 'none' ? '' : e.target.id;
                    chart.draw(data, google.charts.Bar.convertOptions(options));
                }
            }
        }

    }]);
