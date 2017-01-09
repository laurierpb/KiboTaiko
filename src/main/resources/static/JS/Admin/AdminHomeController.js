/* global app */
app.controller('AdminHomeController', function ($scope, $http) {
    $scope.homeItemCurrent = {
        id: null,
        order: null,
        titre: "",
        contenue: "",
        image: {
            id: -1,
            image: "",
            imageAlt: "",
            name: ""
        }
    };

    $http({
        method: 'GET',
        url: '/HomeItems'
    }).then(function successCallback(response) {
        console.log("HomeItem get: ");
        console.log(response.data);
        $scope.HomeItems = response.data;
    }, function errorCallback(data, status, headers, config) {
        console.log('Le GET vers la ressourse s\'est mal fait');
    });

    $scope.imageChange = function (input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.readAsDataURL(input.files[0]);
            reader.onload = function (e) {
                $scope.homeItemCurrent.image.image = e.target.result.substring(e.target.result.indexOf(",") + 1);
            };
            $scope.homeItemCurrent.image.name = input.files[0].name;
            setTimeout(function () {
                console.log(
                        $scope.currentImage);
                $scope.$apply();
            }, 1000);
        }
    };

    $scope.addText = function (i, j) {
        var txtArea = document.getElementById("homeItemContenue");
        var startIndex = txtArea.selectionStart;
        var endIndex = txtArea.selectionEnd;
        $scope.homeItemCurrent.contenue = $scope.homeItemCurrent.contenue.slice(0, startIndex) + i +
                $scope.homeItemCurrent.contenue.slice(startIndex, endIndex) + j +
                $scope.homeItemCurrent.contenue.slice(endIndex);
    };
    $scope.loadHomeItem = function (data) {
        $scope.homeItemCurrent = data;
    };
    $scope.setImage = function (data) {
        console.log(data);
        $scope.homeItemCurrent.image = data;
    };

    $scope.postHomeItem = function () {
        $http({
            method: 'POST',
            url: '/HomeItems',
            data: $scope.homeItemCurrent,
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(function successCallback(data, status, headers, config) {
            location.reload();
        }, function errorCallback(data, status, headers, config) {
            console.log('OMG post fail');
        });
    };
    $scope.putHomeItem = function () {
        console.log($scope.homeItemCurrent);
        $scope.homeItemCurrent.image.image.split("");
        $http({
            method: 'PUT',
            url: '/HomeItems/' + $scope.homeItemCurrent.id,
            data: $scope.homeItemCurrent,
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(function successCallback(data, status, headers, config) {
            location.reload();
        }, function errorCallback(data, status, headers, config) {
            console.log('OMG PUT fail');
        });
    };
    $scope.deleteHomeItem = function () {
        $http({
            method: 'DELETE',
            url: '/HomeItems/' + $scope.homeItemCurrent.id,
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
