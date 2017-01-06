/* global app */
app.controller('CalendrierController', function ($scope, $http) {
    $http({
        method: 'GET',
        url: '/Calendrier'
    }).then(function successCallback(response) {   
        console.log("getCalandrier : ");
        console.log(response.data);     
        $scope.schedule = response.data;
    }, function errorCallback(data, status, headers, config) {
        console.log('Le GET vers la ressourse s\'est mal fait');
    });
});
