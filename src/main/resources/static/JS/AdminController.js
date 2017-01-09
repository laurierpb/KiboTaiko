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
    
    $scope.uploadImage = function (data) {
        $http({
            method: 'POST',
            url: '/Image',
            data: data,
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(function successCallback(data, status, headers, config) {
            location.reload();
        }, function errorCallback(data, status, headers, config) {
            console.log('OMG post fail');
        });
    };
});