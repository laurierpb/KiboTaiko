/* global app */
app.controller('CalandrierController', function ($scope, $http) {
    $http({
        method: 'GET',
        url: '/Calandrier'
    }).then(function successCallback(response) {        
        $scope.schedule = response.data;
    }, function errorCallback() {
        console.log('Le GET vers la ressourse s\'est mal fait');
    });
});
