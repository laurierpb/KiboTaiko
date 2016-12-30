/* global app */
app.controller('AdminController', function ($rootScope, $scope, $http) {
    $http({
        method: 'GET',
        url: '/Image'
    }).then(function successCallback(response) {
        $rootScope.images = response.data;
    }, function errorCallback(data, status, headers, config) {
        console.log('Le GET vers la ressourse s\'est mal fait');
    });
});