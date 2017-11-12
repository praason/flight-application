
var app =angular.module('flightApp',['ngRoute','restangular']);

// Configure the application
app.config(function(RestangularProvider) {
    RestangularProvider.setBaseUrl(
        'json/'); 
});


app.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "template/searchflight.html",
        controller : "flightCtrl"
    })   
    .when("/searchflight", {
        templateUrl : "template/searchflight.html",
        controller : "flightCtrl"
    })
    .otherwise({
        redirectTo: '/'
    });
});