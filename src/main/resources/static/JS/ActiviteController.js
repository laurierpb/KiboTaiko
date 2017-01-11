/* global app */
app.controller('ActiviteController', function ($scope, $http) {
    $scope.activites = [{
            toggle: true,
            name: "activite1",
            content:"super test 1"
        },{
            toggle: true,
            name: "activite2",
            content:"super test 2"
        },{
            toggle: true,
            name: "activite3",
            content:"super test 3"
        },{
            toggle: true,
            name: "activite4",
            content:"super test 4"
        }
    ];
    
    /*
    $scope.toggle = function (element) {
        element.toggle = element.toggle === false ? true: false;
        for(var i = 0 ; i < $scope.activites.length ; i++){
            if($scope.activites[i] !== element){
               $scope.activites[i].toggle = true; 
            }
        }
    };
    */
});