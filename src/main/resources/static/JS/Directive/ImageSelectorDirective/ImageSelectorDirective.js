/* global app */
app.directive('myImageselector', function () {
    return {
        restrict: 'E',
        templateUrl: 'JS/Directive/ImageSelectorDirective/ImageSelector.html',
        scope: {
            image: '=image'
        },
        controller: function ($scope, $http) {
            $(document).ready(function () {
                $(".imageContainer").click(function (e) {
                    for (var i = 0; i < $(".imageContainer").length; i++) {
                        $(".imageContainer")[i].style.background = "";
                    }
                    this.style.background = "black";
                });

                $http({
                    method: 'GET',
                    url: '/Image'
                }).then(function successCallback(response) {
                    for(var i = 0 ; i < response.data.length ; i++){
                        if (!response.data[i].image.includes("base64")){
                            response.data[i].image = "data:image/JPEG;base64," + response.data[i].image;
                        }
                    }
                    $scope.images = response.data;
                }, function errorCallback() {
                    console.log('Le GET vers la ressourse s\'est mal fait');
                });

            });
            $scope.imageContainerClick = function ($event) {
                for (var i = 0; i < $(".imageContainer").length; i++) {
                    $(".imageContainer")[i].style.background = "";
                }
                $event.currentTarget.style.background = "blue";
                $scope.image = $event.target.src;
            };
        }
    };
});