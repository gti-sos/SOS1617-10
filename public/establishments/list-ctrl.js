angular
    .module("EstablishmentsManagerApp")
    .controller("ListCtrl", ["$scope", "$http", function($scope, $http) { //inyección de dependencia
        console.log("Controller initialized");
        var url = "http://sos1617-10.herokuapp.com/api/v1";
        var apikey = "apikey=nurtrioje";

        function refresh() {
            $http
                .get(url + "/establishments?" + apikey)
                .then(function(response) { //promesas
                    $scope.establishments = response.data;
                    console.log("carga establishments");
                },function(response){
                    console.log("no carga");
                });
        }

        $scope.addEstablishment = function() {
            $scope.newEstablishment.year=Number($scope.newEstablishment.year);
            $scope.newEstablishment.number=Number($scope.newEstablishment.number);
            $scope.newEstablishment.beds=Number($scope.newEstablishment.beds);
            $scope.newEstablishment.nights=Number($scope.newEstablishment.nights);
            $http
                .post(url + "/establishments?" + apikey, $scope.newEstablishment)
                .then(function(response) {
                    console.log("Establishment added");
                    refresh();
                });
        };

        $scope.deleteEstablishment = function(country, year) {
            $http
                .delete(url + "/establishments/" + country + "/" + year + "?" + apikey)
                .then(function(response) {
                    console.log("Establishment deleted");
                    refresh();
                });
        };
        
        $scope.putEstablishment = function(country,year) {
            $http
                .put(url + "/establishments/" + country + "/" + year + "?" + apikey)
                .then(function(response) {
                    console.log("Establishment updated");
                });
        };
        
        $scope.fillFields = function(country, year) {
            $http
                .get(url + "/establishments/" + country + "/" + year + "?" + apikey)
                .then(function(response) {
                    console.log("hola");
                    $scope.Establishment = response.data;
                    delete $scope.Establishment["_id"];
                });
        };
        
        $scope.clearResponseData = function() {
            $scope.responseData="";
        };

        refresh();

    }]);
