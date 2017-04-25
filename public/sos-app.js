angular.module("SOS161710", ["ngRoute"]).config(function($routeProvider) {
    $routeProvider.when("/:params", {
        templateUrl: "/home.html"
        controller: function($scope, $stateParams) {
            $scope.portfolioId = $stateParams.portfolioId;
        }
    }).when("/beers/", {
        templateUrl: "/beers/BeersList.html",
        controller: "BeersCtrl"

    }).when("/beers/updateBeer/:country/:birthyear", {
        templateUrl: "/beers/EditBeers.html",
        controller: "EditBeersCtrl"

    }).when("/establishments/", {
        templateUrl: "/establishments/establishments-list.html",
        controller: "EstablishmentsCtrl"

    }).when("/establishments/updateEstablishment/:country/:year", {
        templateUrl: "/establishments/establishments-edit.html",
        controller: "EstablishmentsEditCtrl"

    });
});
console.log("App initialized");
