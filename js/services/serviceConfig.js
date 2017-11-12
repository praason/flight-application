//flight json data

app.factory('flightDataOp', ['$http', function ($http) {

    var urlBase = 'http://127.0.0.1:49213/json';
    var flightDataOp = {};
    
    flightDataOp.getFlightData = function () {
        return $http.get(urlBase+'/flightData.json');
    };
    return flightDataOp;
}]);