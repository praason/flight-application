app.controller("flightCtrl", function($scope, $rootScope, flightDataOp, Restangular, $http) {
 $scope.HeaderTitle = "Flight Search Engine";
 $scope.flight = {};
 $scope.flight.trip = "return";
 $scope.search = {
  price_min: '',
  price_max: ''
 };
 $scope.flight.flightFilterSearch = false;

//Get All Flights data
 $scope.allFlights = function() {
     
      $http.get("json/flightData.json").then(function(response) {
        $scope.flightJsonData = response.data;
           $scope.flightSearchResult = [];
           angular.forEach($scope.flightJsonData, function(value, key) {
            $scope.flightSearchResult.push(response.data[key]);
            });
      });
 }

 $scope.flightSearch = function(flight) {
  $scope.flight.flightFilterSearch = true;
  $scope.freturn = false;
  $http.get("json/flightData.json").then(function(response) {
   $scope.flightJsonData = response.data;
   $scope.flightSearchResult = [];
   $scope.dflightSearchResult = [];
   $scope.rflightSearchResult = [];
   if (flight.trip == "oneway") {
    $scope.flight.subHeader = flight.ocity + " > " + flight.dcity;
    angular.forEach($scope.flightJsonData, function(value, key) {

     if ((flight.ocity.toUpperCase() == value.orginCity.toUpperCase() && flight.dcity.toUpperCase() == value.destinationCity.toUpperCase()) && flight.ddate == value.departureDate) {
      if (+response.data[key].flightRate > $scope.search.price_min && +response.data[key].flightRate < $scope.search.price_max) {
       $scope.flightSearchResult.push(response.data[key]);
       
      }
     }
    });
       $scope.flight.noData = $scope.flightSearchResult.length == 0 ? true : false;
   }

   if (flight.trip == "return") {
    $scope.freturn = true;
    $scope.flight.subHeader = flight.ocity + " > " + flight.dcity + " > " + flight.ocity;

    angular.forEach($scope.flightJsonData, function(value, key) {
     if ((flight.ocity.toUpperCase() == value.orginCity.toUpperCase() && flight.dcity.toUpperCase() == value.destinationCity.toUpperCase()) && flight.ddate == value.departureDate) {
      if (+response.data[key].flightRate > $scope.search.price_min && +response.data[key].flightRate < $scope.search.price_max) {
       $scope.dflightSearchResult.push(response.data[key]);
      }

     }
    });

    angular.forEach($scope.flightJsonData, function(value, key) {
     if ((flight.ocity.toUpperCase() == value.destinationCity.toUpperCase() && flight.dcity.toUpperCase() == value.orginCity.toUpperCase()) && flight.rdate == value.departureDate) {
      if (+response.data[key].flightRate > $scope.search.price_min && +response.data[key].flightRate < $scope.search.price_max) {
       $scope.rflightSearchResult.push(response.data[key]);
      }
     }
    });


    if ($scope.rflightSearchResult.length != 0 && $scope.dflightSearchResult.length != 0) {
     var resultLength = $scope.rflightSearchResult.length > $scope.dflightSearchResult.length ? $scope.dflightSearchResult.length : $scope.rflightSearchResult.length;

     for (var i = 0; i < resultLength; i++) {

      $scope.flightSearchResult.push({
       flightRate: +$scope.dflightSearchResult[i].flightRate + +$scope.rflightSearchResult[i].flightRate,
       flightName: $scope.dflightSearchResult[i].flightName,
       departureTime: $scope.dflightSearchResult[i].departureTime,
       arrivalTime: $scope.dflightSearchResult[i].arrivalTime,
       rflightName: $scope.rflightSearchResult[i].flightName,
       rdepartureTime: $scope.rflightSearchResult[i].departureTime,
       rarrivalTime: $scope.rflightSearchResult[i].arrivalTime,
       flightLogo: $scope.dflightSearchResult[i].flightLogo
      });
     }
    }
       $scope.flight.noData = $scope.flightSearchResult.length == 0 ? true : false;
   }
  });
 }
});