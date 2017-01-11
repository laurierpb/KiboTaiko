/* global app */
app.controller('ActiviteController', function ($scope, $http) {
    $scope.activites = [{
            toggle: true,
            name: "activite1"
        },{
            toggle: true,
            name: "activite2"
        },{
            toggle: true,
            name: "activite3"
        },{
            toggle: true,
            name: "activite4"
        }
    ];
    $scope.toggle = function (element) {
        element.toggle = element.toggle === false ? true: false;
        for(var i = 0 ; i < $scope.activites.length ; i++){
            if($scope.activites[i] !== element){
               $scope.activites[i].toggle = true; 
            }
        }
    };
});