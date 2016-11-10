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
            .when('/Calandrier', {
                templateUrl: 'Partial/Calandrier.html',
                controller: 'CalandrierController'
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
    $scope.navBarrItems = [
        {
            name: "Activite"
            , destination: "#/Activite"
        }, {
            name: "Calandrier"
            , destination: "#/Calandrier"
        }, {
            name: "Galerie"
            , destination: "#/Galerie"
        }, {
            name: "Commandite"
            , destination: "#/Commandite"
        }, {
            name: "Admin"
            , destination: "#/Admin"
        }
    ];
});
