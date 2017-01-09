/* global app */
app.controller('AdminImagesController', function ($rootScope, $scope, $http) {
    $scope.currentImage = {
        image:"",
        imageAlt:"",
        name:""
    };
    $scope.deleteImage = function (data) {
        $http({
            method: 'DELETE',
            url: data
        }).then(function successCallback(response) {
            getImage();
        }, function errorCallback(data, status, headers, config) {
            console.log('Le DELETE vers la ressourse s\'est mal fait');
        });
    };
    $scope.imageChange = function(input){
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.readAsDataURL(input.files[0]);
            reader.onload = function (e) {
                $scope.currentImage.image = e.target.result.substring(e.target.result.indexOf(",")+1);
            };
            $scope.currentImage.name = input.files[0].name;
            setTimeout(function(){console.log(
                $scope.currentImage);
                $scope.$apply();
            }, 1000);
        }
    };

    function getImage() {
        console.log("get image");
        $http({
            method: 'GET',
            url: '/Image'
        }).then(function successCallback(response) {
            $rootScope.images = response.data;
        }, function errorCallback(data, status, headers, config) {
            console.log('Le GET vers la ressourse s\'est mal fait');
        });
    }
});
