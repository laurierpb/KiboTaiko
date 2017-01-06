/* global app */
app.controller('GalerieController', function ($scope, $http) {
    $http({
        method: "GET",
        url: "/Calendrier"
    }).then(function successCallback(response) {
        console.log("getCalandrier : ");
        console.log(response.data);
        $scope.annees = response.data;
    }, function errorCallback(response) {
        console.log('Le GET vers la ressourse s\'est mal fait');
    });
});