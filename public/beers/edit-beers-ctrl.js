angular
    .module("BeersManagerApp")
    .controller("EditBeersCtrl", ["$scope", "$http","$routeParams","$location", 
    function($scope, $http,$routeParams,$location) { //inyeccion de dependencia
        
        console.log("Edit Controller initialized");
        
        refresh();
        function refresh(){
        $http
            .get("/api/v1/beers-stats/"+$routeParams.country+"/"+$routeParams.birthyear+'?apikey=sos1617-jesusguerre')
            .then(function(response) {
                $scope.Beer = response.data;
                delete $scope.Beer["_id"];
            });
        }
        $scope.updateBeer = function (country,birthyear) {
            var url = "/api/v1/beers-stats/"+ country + "/" + Number(birthyear)+ '?apikey=sos1617-jesusguerre';
             
          $http.put(url,$scope.Beer).then( function (response){
            bootbox.alert("Beer Updated");
             $location.path("/");
          },function (response){
              switch (response.status) {
                        case 400:
                            bootbox.alert("The Beer that you are trying to add, Have bad data. Please insert all the fields");
                            break;
                        default:
                            bootbox.alert("Please make sure that you have entered all the fields");
                            break;
                    }
          });  
        };
       
        
        
    }]);
