/* global app */


app.directive('myCanvasedit', function () {
    return {
        restrict: 'E',
        templateUrl: 'JS/Directive/CanvasDirective/CanvasEdit.html',
        scope: {
            elements: '=elements',
            newElement: '=newElement',
            oppacity: '=oppacity',
            image: '='
        },
        controller: function ($scope) {
            $scope.$watch("image", function (newValue, oldValue) {
                //This gets called when data changes.
            });
            $(document).ready(function () {
                $('#newElementForCanvas').on("click", function () {
                    addNewElementToCanvas();
                });
            });
            function newElementClearValue() {
                $scope.newElement = {
                    nom: "",
                    contenue: "",
                    x: 0,
                    y: 0,
                    larg: 0,
                    haut: 0
                };
                $scope.$apply();
            }

            function addNewElementToCanvas() {
                if (validateNewElement()) {
                    $scope.elements.push($scope.newElement);

                    newElementClearValue();
                } else {
                    alert("erreur");
                }
            }
            function validateNewElement() {
                var returnValue = true;
                for (var i = 0; i < $scope.elements.length; i++) {
                    if ($scope.elements[i].nom === $scope.newElement.nom ||
                            $scope.elements[i].larg === 0 ||
                            $scope.elements[i].haut === 0)
                    {
                        returnValue = false;
                    }
                }
                return returnValue;
            }
        }
    };
});