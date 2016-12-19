/* global app */
app.controller('AdminHomeController', function ($scope, $http) {
    $scope.test = function(data){
        console.log(data);
    };
    
    $http({
        method: 'GET',
        url: '/HomeItems'
    }).then(function successCallback(response) {
        $scope.HomeItems = response.data;
    }, function errorCallback(data, status, headers, config) {
        console.log('Le GET vers la ressourse s\'est mal fait');
    }); 
});
