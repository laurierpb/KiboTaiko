/* global app */
app.controller('HomeController', function ($scope, $http) {
    $http({
        method: 'GET',
        url: 'HomeItems.json'
    }).then(function successCallback(response) {
        $scope.homeItems = response.data;
        console.log($scope.homeItems);
    }, function errorCallback(response) {
        console.log('Le GET vers la ressourse s\'est mal fait');
    });
});