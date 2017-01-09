/* global app */
app.controller('AdminCalendrierController', function ($scope, $http) {
    $scope.id;
    $scope.calendrier = {
        id: "",
        image: $scope.imageCalandrier,
        titleText: "",
        contenue: ""    
    };
    $scope.imageCalandrier = {
        id: -1,
        image:null,
        imageAlt: "",
        name: ""
    };
    $scope.setEvenementEdit = function (data) {
        $scope.calendrier.id = data.id;
        $scope.calendrier.imageAlt = data.imageAlt;
        $scope.calendrier.image = data.image;
        $scope.calendrier.titleText = data.titleText;
        $scope.calendrier.contenue = data.contenue;
    };
    $("#upload-file-input-calendrier").change(function () {
        readURL(this);
    });
    
    function readURL(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                $('#imageCalendrierEdit').attr('src', e.target.result);
                $scope.imageCalandrier.image = e.target.result;
                $scope.imageCalandrier.name = input.files[0].name;
                console.log($scope.imageCalandrier);
            };

            $scope.calendrier.image = "Images/" + input.files[0].name;
            reader.readAsDataURL(input.files[0]);
        }
    }
    
    $scope.addText = function(i, j){
        var txtArea = document.getElementById("calendrierContenue");
        var startIndex = txtArea.selectionStart;
        var endIndex = txtArea.selectionEnd;
        $scope.calendrier.contenue = $scope.calendrier.contenue.slice(0, startIndex) + i + 
                $scope.calendrier.contenue.slice(startIndex, endIndex) + j + 
                $scope.calendrier.contenue.slice(endIndex);
    };
    $scope.setImage = function(data){
        $scope.calendrier.image = data; 
    };
    
    
    $http({
        method: 'GET',
        url: '/Calendrier'
    }).then(function successCallback(response) {
        $scope.calendrierList = response.data;
    }, function errorCallback(data, status, headers, config) {
        console.log('Le GET vers la ressourse s\'est mal fait');
    });  
    $scope.DeleteCalendrier = function () {;
        $http({
            method: 'DELETE',
            url: '/Calendrier/' + $scope.calendrier.id,
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(function successCallback(data, status, headers, config) {
            location.reload();
        }, function errorCallback(data, status, headers, config) {
            console.log('OMG DELETE fail');
        });
    };
    $scope.AddCalendrier = function () {
        $http({
            method: 'POST',
            url: '/Calendrier',
            data: $scope.calendrier,
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(function successCallback(data, status, headers, config) {
            uploadImage("calendrier");
            location.reload();
        }, function errorCallback(data, status, headers, config) {
            console.log('OMG POST fail');
        });
    };
    $scope.UpdateCalendrier = function () {
        $http({
            method: 'PUT',
            url: '/Calendrier/'+ $scope.calendrier.id,
            data: $scope.calendrier,
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(function successCallback(data, status, headers, config) {
            uploadImage("calendrier");
            location.reload();
        }, function errorCallback(data, status, headers, config) {
            console.log('OMG PUT fail');
        });
    };
});
