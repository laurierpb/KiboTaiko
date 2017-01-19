/* global app */
app.controller('AdminCalendrierController', function ($scope, $http) {
    $scope.id;
    $scope.calendrier = {
        id: "",
        titre: "",
        contenue: "",
        image: {
            id: -1,
            image: "",
            imageAlt: "",
            name: ""
        }
    };
    $scope.setEvenementEdit = function (data) {
        $scope.calendrier = data;
    };
    
    $scope.imageChangeCalendrier = function (input) {
        console.log("calendrier");
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.readAsDataURL(input.files[0]);
            reader.onload = function (e) {
                $scope.calendrier.image.image = e.target.result.substring(e.target.result.indexOf(",") + 1);
            };
            $scope.calendrier.image.name = input.files[0].name;
            $scope.calendrier.image.id = -1;
            setTimeout(function () {
                console.log(
                        $scope.currentImage);
                $scope.$apply();
            }, 1000);
        }
    };

    $scope.addText = function (i, j) {
        var txtArea = document.getElementById("calendrierContenue");
        var startIndex = txtArea.selectionStart;
        var endIndex = txtArea.selectionEnd;
        $scope.calendrier.contenue = $scope.calendrier.contenue.slice(0, startIndex) + i +
                $scope.calendrier.contenue.slice(startIndex, endIndex) + j +
                $scope.calendrier.contenue.slice(endIndex);
    };
    $scope.setImage = function (data) {
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
    $scope.DeleteCalendrier = function () {
        ;
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
            location.reload();
        }, function errorCallback(data, status, headers, config) {
            console.log('OMG POST fail');
        });
    };
    
    $scope.UpdateCalendrier = function () {
        $http({
            method: 'PUT',
            url: '/Calendrier/' + $scope.calendrier.id,
            data: $scope.calendrier,
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(function successCallback(data, status, headers, config) {
            location.reload();
        }, function errorCallback(data, status, headers, config) {
            console.log('OMG PUT fail');
        });
    };
});
