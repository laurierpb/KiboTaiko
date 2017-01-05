/* global app */
app.controller('HomeController', function ($scope, $http) {
    $http({
        method: 'GET',
        url: 'HomeItems'
    }).then(function successCallback(response) {
        $scope.homeItems = response.data;
    }, function errorCallback(response) {
        console.log('Le GET vers la ressourse s\'est mal fait');
    });
});