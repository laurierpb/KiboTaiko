/* global app */
app.controller('AdminCalandrierController', function ($scope, $http) {
    $scope.id;
    $scope.calandrier = {
        id: "",
        imageAlt: "",
        image: "",
        titleText: "",
        contenue: ""
    };
    
    $http({
        method: 'GET',
        url: '/Calandrier'
    }).then(function successCallback(response) {
        $scope.calandrierList = response.data;
    }, function errorCallback(data, status, headers, config) {
        console.log('Le GET vers la ressourse s\'est mal fait');
    });    
    
    $scope.setEvenementEdit = function (data) {
        $scope.calandrier.id = data.id;
        $scope.calandrier.imageAlt = data.imageAlt;
        $scope.calandrier.image = data.image;
        $scope.calandrier.titleText = data.titleText;
        $scope.calandrier.contenue = data.contenue;

        document.getElementById("imageCalandrierEdit").src = data.image;
    };
    $scope.deleteCalandrier = function () {
        $http({
            method: 'DELETE',
            url: '/Calandrier',
            data: $scope.id,
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(function successCallback(data, status, headers, config) {
            location.reload();
        }, function errorCallback(data, status, headers, config) {
            console.log('OMG post fail');
        });
    };
    $scope.uploadAdd = function () {
        //il faut que je trouve un meilleur moyen que ca v
        uploadImage();
        $http({
            method: 'POST',
            url: '/Calandrier',
            data: $scope.calandrier,
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(function successCallback(data, status, headers, config) {
            location.reload();
        }, function errorCallback(data, status, headers, config) {
            console.log('OMG post fail');
        });
    };
    $scope.uploadUpdate = function () {
        //il faut que je trouve un meilleur moyen que ca v
        uploadImage();
        $http({
            method: 'PUT',
            url: '/Calandrier',
            data: $scope.calandrier,
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(function successCallback(data, status, headers, config) {
            location.reload();
        }, function errorCallback(data, status, headers, config) {
            console.log('OMG post fail');
        });
    };
    $scope.uploadDelete = function () {
        console.log($scope.calandrier.id);

        $http({
            method: 'DELETE',
            url: '/Calandrier',
            data: $scope.calandrier.id,
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(function successCallback(data, status, headers, config) {
            location.reload();
        }, function errorCallback(data, status, headers, config) {
            console.log('OMG post fail');
        });
    };
    function uploadImage() {
        $.ajax({
            url: "/uploadFile",
            type: "POST",
            data: new FormData($("#upload-file-form")[0]),
            enctype: 'multipart/form-data',
            processData: false,
            contentType: false,
            cache: false,
            success: function () {
                console.log("File upload success");
            },
            error: function () {
                console.log("Failed to upload the file");
            }
        });
    }
    $("#upload-file-input").change(function () {
        readURL(this);
    });
    function readURL(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                $('#imageCalandrierEdit').attr('src', e.target.result);
            };

            $scope.calandrier.image = "Images/" + input.files[0].name;
            reader.readAsDataURL(input.files[0]);
        }
    }
    $scope.addText = function(i, j){
        var txtArea = document.getElementById("calandrierContenue");
        var startIndex = txtArea.selectionStart;
        var endIndex = txtArea.selectionEnd;
        $scope.calandrier.contenue = $scope.calandrier.contenue.slice(0, startIndex) + i + 
                $scope.calandrier.contenue.slice(startIndex, endIndex) + j + 
                $scope.calandrier.contenue.slice(endIndex);
    };
});
