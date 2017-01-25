/* global app */

/**
 * To integrate this directive properly you have to call it this way
 * <my-canvas elements="{elements from controller}" />
 * your data from controller myst be of that format
 * $scope.elements = [{
 *           nom: "Premier",
 *           contenue:"PremierPremierPremierPremierPremierPremierPremier",
 *           x: 140,
 *           y: 70,
 *           larg: 40,
 *           haut: 40
 *       }, {
 *           nom: "Deuxième",
 *           contenue:"DeuxièmeDeuxièmeDeuxièmeDeuxièmeDeuxièmeDeuxièmeDeuxième",
 *           x: 200,
 *           y: 0,
 *           larg: 10,
 *           haut: 10
 *       }];
 */
app.directive('myCanvas', function () {
    return {
        restrict: 'E',
        templateUrl: 'JS/Directive/CanvasDirective/Canvas.html',
        scope: {
            elements: '=elements',
            newElement: '=newElement',
            oppacity: '=oppacity'
        },
        controller: function ($scope) {
            var canvas = $('#myCanvas')[0];
            var ctx = canvas.getContext("2d");
            var canvasBaseSize = 300;
            canvas.addEventListener("click", onCanvasClick, false);
            canvas.addEventListener("mousemove", onCanvasMove, false);
            canvas.style.backgroundImage = "url('" + $scope.elements.image + "')";
            drawElements();
            function drawElements() {
                if ($scope.newElement !== undefined) {
                    ctx.fillStyle = "rgba(255, 255, 255, 0.75)";
                    ctx.fillRect(
                            $scope.newElement.x,
                            $scope.newElement.y,
                            $scope.newElement.larg,
                            $scope.newElement.haut);
                }

                for (var i = 0; i < $scope.elements.list.length; i++) {
                    ctx.fillStyle = "rgba(255, 255, 255, " + $scope.oppacity + ")";
                    ctx.fillRect(
                            $scope.elements.list[i].x,
                            $scope.elements.list[i].y,
                            $scope.elements.list[i].larg,
                            $scope.elements.list[i].haut);
                }
            }
            function clearElements() {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
            }
            $scope.$watch('[newElement.nom, newElement.contenue, newElement.x, newElement.y, newElement.larg, newElement.haut]', function (newVal, oldVal) {
                clearElements();
                drawElements();
            });
            
            function onCanvasMove(e) {
                this.style.cursor = 'initial';
                for (var i = 0; i < $scope.elements.list.length; i++) {
                    if (isCursorOnElement($scope.elements.list[i], e)) {
                        this.style.cursor = 'pointer';
                        return;
                    }
                }
                if (isCursorOnElement($scope.newElement, e)) {
                    this.style.cursor = 'pointer';
                }
            }

            function onCanvasClick(e) {
                for (var i = 0; i < $scope.elements.list.length; i++) {
                    if (isCursorOnElement($scope.elements.list[i], e)) {
                        $("#" + $scope.elements.list[i].nom).collapse('show');
                    } else {
                        $("#" + $scope.elements.list[i].nom).collapse('hide');
                    }
                }
                if ($scope.newElement !== undefined) {
                    if (isCursorOnElement($scope.newElement, e)) {
                        $("#" + $scope.newElement.nom).collapse('show');
                    } else {
                        $("#" + $scope.newElement.nom).collapse('hide');
                    }
                }
            }
            function isCursorOnElement(element, e) {
                var offset = document.getElementById("myCanvas").offsetWidth / canvasBaseSize;
                var position = getCursorPosition(e);
                var x = position[0];
                var y = position[1];
                return (element !== undefined &&
                        x > element.x * offset &&
                        x < (element.x + element.larg) * offset &&
                        y > element.y * offset &&
                        y < (element.y + element.haut) * offset);
            }
            function getCursorPosition(e) {
                var x;
                var y;
                if (e.pageX !== undefined && e.pageY !== undefined) {
                    x = e.pageX;
                    y = e.pageY;
                } else {
                    x = e.clientX + document.body.scrollLeft +
                            document.documentElement.scrollLeft;
                    y = e.clientY + document.body.scrollTop +
                            document.documentElement.scrollTop;
                }
                x -= canvas.offsetLeft;
                y -= canvas.offsetTop;
                return [x, y];
            }
        }
    };
});