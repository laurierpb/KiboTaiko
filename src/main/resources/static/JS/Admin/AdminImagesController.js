/* global app */
app.controller('AdminImagesController', function ($scope, $http) {
    getImage();
    
    $scope.deleteImage = function (data) {  
        console.log(data.substring(7));
        $http({
            method: 'DELETE',
            url: '/Image/' + data.substring(7)
        }).then(function successCallback(response) {
            getImage();
        }, function errorCallback(data, status, headers, config) {
            console.log('Le DELETE vers la ressourse s\'est mal fait');
        });
    };
    
    function getImage(){
        $http({
            method: 'GET',
            url: '/Image'
        }).then(function successCallback(response) {
            $scope.images = response.data;
        }, function errorCallback(data, status, headers, config) {
            console.log('Le GET vers la ressourse s\'est mal fait');
        });
        
    };
});
