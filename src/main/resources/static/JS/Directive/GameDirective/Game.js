/* global app */

app.directive('myGame', function () {
    return {
        restrict: 'E',
        templateUrl: 'JS/Directive/GameDirective/Game.html',
        controller: function () {
            setStartMenu();
        }
    };
});