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
            elements: '=elements'
        },
        controller: function ($scope) {
            $(document).ready(function () {
                var newElement = {
                    nom: "",
                    contenue: "",
                    x: 0,
                    y: 0,
                    larg: 0,
                    haut: 0
                };
                var elements = $scope.elements.list;
                var canvas = $('#myCanvas')[0];
                var ctx = canvas.getContext("2d");
                var canvasBaseSize = 300;
                canvas.addEventListener("click", onCanvasClick, false);
                canvas.addEventListener("mousemove", onCanvasMove, false);
                canvas.style.backgroundImage = "url('" + $scope.elements.image + "')";
                drawElements();


                $('.myCanvasInput').on("change paste keyup", function () {
                    setNewElement();
                    clearElements();
                    drawElements();
                });
                $('#newElementForCanvas').on("click", function () {
                    addNewElementToCanvas();
                });









                function newElementClearValue() {
                    newElement = {
                        nom: "",
                        contenue: "",
                        x: 0,
                        y: 0,
                        larg: 0,
                        haut: 0
                    };
                    $("#inputCanvasName").val("");
                    $("#inputCanvasContenue").val("");
                    $("#inputCanvasX").val(0);
                    $("#inputCanvasY").val(0);
                    $("#inputCanvasLart").val(0);
                    $("#inputCanvasHaut").val(0);
                }
                function setNewElement() {
                    newElement = {
                        nom: $("#inputCanvasName").val(),
                        contenue: $("#inputCanvasContenue").val(),
                        x: $("#inputCanvasX").val(),
                        y: $("#inputCanvasY").val(),
                        larg: $("#inputCanvasLart").val(),
                        haut: $("#inputCanvasHaut").val()
                    };
                }
                function drawElements() {
                    ctx.fillStyle = "rgba(255, 255, 255, 0.75)";
                    ctx.fillRect(
                            newElement.x,
                            newElement.y,
                            newElement.larg,
                            newElement.haut);

                    for (var i = 0; i < elements.length; i++) {
                        ctx.fillStyle = "rgba(255, 255, 255, 0.25)";
                        ctx.fillRect(elements[i].x, elements[i].y, elements[i].larg, elements[i].haut);
                    }
                }
                function clearElements() {
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                }
                function addNewElementToCanvas() {
                    if (validateNewElement()) {
                        $scope.elements.list.push(newElement);
                        $scope.$apply();
                        newElementClearValue();
                        clearElements();
                        drawElements();
                    } else {
                        alert("erreur");
                    }
                }
                function validateNewElement() {
                    var returnValue = true;
                    for (var i = 0; i < $scope.elements.list.length; i++) {
                        if ($scope.elements.list[i].nom === newElement.nom ||
                                $scope.elements.list[i].larg === 0 ||
                                $scope.elements.list[i].haut === 0)
                        {
                            returnValue = false;
                        }
                    }
                    return returnValue;
                }
                function onCanvasMove(e) {
                    var offset = document.getElementById("myCanvas").offsetWidth / 300;
                    var position = getCursorPosition(e);
                    var x = position[0];
                    var y = position[1];
                    for (var i = 0; i < elements.length; i++) {
                        if (
                                x > elements[i].x * offset &&
                                x < (elements[i].x + elements[i].larg) * offset &&
                                y > elements[i].y * offset &&
                                y < (elements[i].y + elements[i].haut) * offset) {

                            this.style.cursor = 'pointer';
                            break;
                        } else {
                            this.style.cursor = 'initial';
                        }
                    }
                }

                function onCanvasClick(e) {
                    var offset = document.getElementById("myCanvas").offsetWidth / canvasBaseSize;
                    var position = getCursorPosition(e);
                    var x = position[0];
                    var y = position[1];
                    for (var i = 0; i < elements.length; i++) {
                        if (x > elements[i].x * offset &&
                                x < (elements[i].x + elements[i].larg) * offset &&
                                y > elements[i].y * offset &&
                                y < (elements[i].y + elements[i].haut) * offset) {

                            $("#" + elements[i].nom).collapse('show');
                        } else {
                            $("#" + elements[i].nom).collapse('hide');
                        }
                    }
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
            });
        }
    };
});