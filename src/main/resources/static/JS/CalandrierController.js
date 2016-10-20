/* global app */
app.controller('CalandrierController', function ($scope, $http) {
    $http({
        method: 'GET',
        url: '/Calandrier'
    }).then(function successCallback(response) {        
        $scope.schedule = response.data;
        /*
        console.log($scope.schedule);

        var calandrierPost = {
            id: "1",
            image: "Images/Taiko.jpg",
            imageAlt: "Koaka2",
            contenue: "<h1>Pratique grand public</h1> <p > Une pratique grand public au parc Jean - Drapeau a 13: 00 < /p>",
            titleText: "Pratique 28 Octobre 2010"
        };

        var calandrierPut = {
            image: "Images/Koala.jpg",
            imageAlt: "Koaka2",
            contenue: "<h1>Pratique grand public</h1> <p > Une pratique grand public au parc Jean - Drapeau a 13: 00 < /p>",
            titleText: "Pratique 28 Octobre 2010"
        };

        $http({
            method: 'POST',
            url: '/Calandrier',
            data: calandrierPost,
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(function successCallback(data, status, headers, config) {
            console.log('post success');
            console.log('data');
            console.log(data.data);
        }, function errorCallback(data, status, headers, config) {
            console.log('OMG post fail');
        });

        $http({
            method: 'PUT',
            url: '/Calandrier',
            data: calandrierPut,
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(function successCallback(data, status, headers, config) {
            console.log('put success');
            console.log('data');
            console.log(data.data);
        }, function errorCallback(data, status, headers, config) {
            console.log('OMG put fail');
        });
        */
    }, function errorCallback(data, status, headers, config) {
        console.log('Le GET vers la ressourse s\'est mal fait');
    });


});
