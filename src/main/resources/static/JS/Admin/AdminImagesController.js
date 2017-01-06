$.getScript("JS/Utility/Upload.js", function () {});
/* global app */
app.controller('AdminImagesController', function ($rootScope, $scope, $http) {
    $scope.deleteImage = function (data) {
        console.log(data);
        $http({
            method: 'DELETE',
            url: '/Image/' + data
        }).then(function successCallback(response) {
            getImage();
        }, function errorCallback(data, status, headers, config) {
            console.log('Le DELETE vers la ressourse s\'est mal fait');
        });
    };
    
    $scope.uploadImage = function () {
        uploadImage("newImage");
        setTimeout(function () {
            getImage();
            $('#imageImagesEdit').attr('src', null);
        }, 2000);
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
    
    function readURL(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                $('#imageImagesEdit').attr('src', e.target.result);
            };
            $scope.newImages = "Images/" + input.files[0].name;
            reader.readAsDataURL(input.files[0]);
        }
    }
    $("#upload-file-input-Images").change(function () {
        readURL(this);
    });
});
