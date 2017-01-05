var app = angular.module('myApp', ['ngRoute', 'ngSanitize']);
app.config(function ($routeProvider) {
    $routeProvider
            .when('/', {
                templateUrl: 'Partial/Home.html',
                controller: 'HomeController'
            })
            .when('/Activite', {
                templateUrl: 'Partial/Activite.html',
                controller: 'ActiviteController'
            })
            .when('/Calendrier', {
                templateUrl: 'Partial/Calendrier.html',
                controller: 'CalendrierController'
            })
            .when('/Galerie', {
                templateUrl: 'Partial/Galerie.html',
                controller: 'GalerieController'
            })
            
            .when('/Admin', {
                templateUrl: 'Partial/Admin.html',
                controller: 'AdminController'
            })
            
            .when('/Commandite', {
                templateUrl: 'Partial/Commandite.html',
                controller: 'CommanditeController'
            })
            .otherwise({
                redirectTo: '/'
            });
});

app.controller('navBarrController', function ($scope) {
    $scope.navBarrItems = [{
            name: "Activite"
            , destination: "#/Activite"
        }, {
            name: "Calendrier"
            , destination: "#/Calendrier"
        }, {
            name: "Galerie"
            , destination: "#/Galerie"
        }, {
            name: "Commandite"
            , destination: "#/Commandite"
        }, {
            name: "Admin"
            , destination: "#/Admin"
        }];
});
