/* global app */
app.controller('AdminController', function ($scope, $http) {
    $http({
        method: 'GET',
        url: '/Image'
    }).then(function successCallback(response) {
        $scope.images = response.data;
    }, function errorCallback(data, status, headers, config) {
        console.log('Le GET vers la ressourse s\'est mal fait');
    });

    $scope.uploadImage = function (data) {
        if (data.id > 0) {
            $http({
                method: 'PUT',
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
        } else {
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
        }
    };
});