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
app.controller('footerController', function ($rootScope, $scope, $http) {
    $http({
        method: 'GET',
        url: '/AllItemsName'
    }).then(function successCallback(response) {
        console.log(response.data);
        $scope.footerItems = response.data;
    }, function errorCallback(data, status, headers, config) {
        console.log('Le GET vers la ressourse s\'est mal fait');
    });
    $scope.setFocus = function (target) {
        $rootScope.target = target;
    };

    if ($rootScope.target !== "" && $rootScope.target !== null) {
        console.log("RootScope target" + $rootScope.target);
        window.scroll(0, document.getElementById($rootScope.target).getBoundingClientRect().top);
        $rootScope = null;
    }
});