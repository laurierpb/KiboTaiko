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
            oppacity: '=oppacity',
            image: '=image'
        },
        controller: function ($scope) {
            var canvas = $('#myCanvas')[0];
            var ctx = canvas.getContext("2d");
            var canvasBaseSize = 300;
            
            canvas.addEventListener("click", onCanvasClick, false);
            canvas.addEventListener("mousemove", onCanvasMove, false);
            canvas.style.backgroundImage = "url('" + $scope.image + "')";
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

                for (var i = 0; i < $scope.elements.length; i++) {
                    ctx.fillStyle = "rgba(255, 255, 255, " + $scope.oppacity + ")";
                    ctx.fillRect(
                            $scope.elements[i].x,
                            $scope.elements[i].y,
                            $scope.elements[i].larg,
                            $scope.elements[i].haut);
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
                for (var i = 0; i < $scope.elements.length; i++) {
                    if (isCursorOnElement($scope.elements[i], e)) {
                        this.style.cursor = 'pointer';
                        return;
                    }
                }
                if (isCursorOnElement($scope.newElement, e)) {
                    this.style.cursor = 'pointer';
                }
            }

            function onCanvasClick(e) {
                for (var i = 0; i < $scope.elements.length; i++) {
                    if (isCursorOnElement($scope.elements[i], e)) {
                        $("#" + $scope.elements[i].nom).collapse('show');
                    } else {
                        $("#" + $scope.elements[i].nom).collapse('hide');
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
                var offsetTop = 0;
                var canvasParent;
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
                canvasParent = canvas;
                while(canvasParent.offsetTop > 0){
                    offsetTop += canvasParent.offsetTop;
                    canvasParent = canvasParent.offsetParent;
                }
                if(offsetTop > 0){
                    y -= offsetTop;
                }else{
                    y -= canvas.offsetParent.offsetTop;
                }
                if(canvas.offsetParent.offsetLeft === 0){
                    x -= canvas.offsetLeft;
                }else{
                    x -= canvas.offsetParent.offsetLeft + canvas.offsetLeft;
                }
                return [x, y];
            }
        }
    };
});