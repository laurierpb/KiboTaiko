$.getScript("JS/Utility/Upload.js", function(){});
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
    $scope.setEvenementEdit = function (data) {
        $scope.calandrier.id = data.id;
        $scope.calandrier.imageAlt = data.imageAlt;
        $scope.calandrier.image = data.image;
        $scope.calandrier.titleText = data.titleText;
        $scope.calandrier.contenue = data.contenue;
    };
    $("#upload-file-input-calandrier").change(function () {
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
    $scope.setImage = function(data){
        $scope.calandrier.image = data; 
    };
    
    
    $http({
        method: 'GET',
        url: '/Calandrier'
    }).then(function successCallback(response) {
        $scope.calandrierList = response.data;
    }, function errorCallback(data, status, headers, config) {
        console.log('Le GET vers la ressourse s\'est mal fait');
    });  
    $scope.DeleteCalandrier = function () {;
        $http({
            method: 'DELETE',
            url: '/Calandrier/' + $scope.calandrier.id,
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(function successCallback(data, status, headers, config) {
            location.reload();
        }, function errorCallback(data, status, headers, config) {
            console.log('OMG DELETE fail');
        });
    };
    $scope.AddCalandrier = function () {
        $http({
            method: 'POST',
            url: '/Calandrier',
            data: $scope.calandrier,
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(function successCallback(data, status, headers, config) {
            uploadImage("calandrier");
            location.reload();
        }, function errorCallback(data, status, headers, config) {
            console.log('OMG POST fail');
        });
    };
    $scope.UpdateCalandrier = function () {
        $http({
            method: 'PUT',
            url: '/Calandrier/'+ $scope.calandrier.id,
            data: $scope.calandrier,
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(function successCallback(data, status, headers, config) {
            uploadImage("calandrier");
            location.reload();
        }, function errorCallback(data, status, headers, config) {
            console.log('OMG PUT fail');
        });
    };
});
