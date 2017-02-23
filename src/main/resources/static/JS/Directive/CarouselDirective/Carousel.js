/* global app */

/**
 * To integrate the directive properly you havee to call it like that
 * <my-carousel data="{data from controller}" />
 * your data from controller myst be of that format
 * [{
 *      titre:"titre", 
 *      text:"text", 
 *      imageAlt:"imageAlt", 
 *      url:"url"
 * }]
 * the url can be a base:64 or an url
 */
app.directive('myCarousel', function () {
    return {
        restrict: 'E',
        templateUrl: 'JS/Directive/CarouselDirective/Carousel.html',
        scope: {
            images: '=data',
            intervale: '=intervale'
        },
        controller: function ($scope) {
            if ($scope.intervale === undefined)
                $scope.intervale = 5000;
            for (var i = 0; i < $scope.images.length; i++) {
                if (!$scope.images[i].url.includes("http")) {
                    if (!$scope.images[i].url.includes("base64")) {
                        $scope.images[i].url = "data:image/JPEG;base64," + $scope.images[i].url;
                    }
                }
            }
            $(document).ready(function () {
                $('.carousel').carousel({
                    interval: $scope.intervale
                });
            });
        }
    };
});