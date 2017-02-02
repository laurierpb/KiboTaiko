/* global app */

app.directive('myGame', function () {
    return {
        restrict: 'E',
        templateUrl: 'JS/Directive/GameDirective/html/Game.html',
        controller: function () {
            setStartMenu();
        }
    };
});