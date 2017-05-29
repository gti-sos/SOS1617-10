angular
.module("SOS161710")
.controller("Lastfm", ["$http", function($http){
    console.log("Controller initialized");
    var url = "http://sos1617-10.herokuapp.com/api/v2/motorcycling-stats";
    var apikey = "apikey=davbotcab";
    var lastfmData = [];
    lastfmData.push(['Name', 'Number']);
    var countrii = [];
    
    $http.get(url + "/?" + apikey).then(function(response){
              var aux = response.data;
                aux.forEach((x) => {
                    lastfmData.push([x.pilot, 2017-x.year]);
                });
            });
    
        
    $http.get("http://ws.audioscrobbler.com/2.0/?method=library.getartists&api_key=d9c117e532f10f87c74f225f43a7f843&user=DeiVi92&format=json").then(function(response){
        
        var aux = response.data.artists.artist;
                
        for(var i=0; i<aux.length; i++){
            lastfmData.push([aux[i].name, aux[i].playcount]);
        }
        
        
              google.charts.load("current", {packages:["corechart"]});
              google.charts.setOnLoadCallback(drawChart);
              function drawChart() {
                var data = google.visualization.arrayToDataTable(lastfmData);
        
                var options = {
                  title: 'My Daily Activities',
                  pieHole: 0.4,
                };
        
                var chart = new google.visualization.PieChart(document.getElementById('donutchart'));
                chart.draw(data, options);
              }

    
});



    
}]);