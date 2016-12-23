/* global app */
app.controller('GalerieController', function ($scope, $http) {
    $http({
        method: "GET",
        url: "/Calandrier"
    }).then(function successCallback(response) {
        $scope.annees = response.data;
    }, function errorCallback(response) {
        console.log('Le GET vers la ressourse s\'est mal fait');
    });
});