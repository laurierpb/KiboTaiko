/* global app */


app.directive('myCanvasedit', function () {
    return {
        restrict: 'E',
        templateUrl: 'JS/Directive/CanvasDirective/CanvasEdit.html',
        scope: {
            elements: '=elements',
            newElement: '=newElement',
            oppacity: '=oppacity'
        },
        controller: function ($scope) {
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
                    $scope.elements.list.push($scope.newElement);

                    newElementClearValue();
                } else {
                    alert("erreur");
                }
            }
            function validateNewElement() {
                var returnValue = true;
                for (var i = 0; i < $scope.elements.list.length; i++) {
                    if ($scope.elements.list[i].nom === $scope.newElement.nom ||
                            $scope.elements.list[i].larg === 0 ||
                            $scope.elements.list[i].haut === 0)
                    {
                        returnValue = false;
                    }
                }
                return returnValue;
            }
        }
    };
});