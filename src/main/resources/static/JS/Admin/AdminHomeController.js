$.getScript("JS/Utility/Upload.js", function(){
    console.log("homeUpload");
});
/* global app */
app.controller('AdminHomeController', function ($scope, $http) {
    $scope.homeItemCurrent = {
      id : null,
      order : null,
      contenue : "", 
      titre : "", 
      image : "", 
      imageAlt : ""
    };
    
    $scope.loadHomeItem = function(data){
        console.log("ok");
        $scope.homeItemCurrent.id = data.id;
        $scope.homeItemCurrent.order = data.order;
        $scope.homeItemCurrent.contenue = data.contenue;
        $scope.homeItemCurrent.titre = data.titre;
        $scope.homeItemCurrent.image = data.image;
        $scope.homeItemCurrent.imageAlt = data.imageAlt;
        
        document.getElementById("imageHomeItemEdit").src = data.image;
    };
    $scope.test1 = function(data){
        console.log($scope.homeItemCurrent);
    };
    $http({
        method: 'GET',
        url: '/HomeItems'
    }).then(function successCallback(response) {
        $scope.HomeItems = response.data;
    }, function errorCallback(data, status, headers, config) {
        console.log('Le GET vers la ressourse s\'est mal fait');
    }); 
    
    
    
    $("#upload-file-input-HomeItems").change(function () {
        readURL(this);
    });
    
    function readURL(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            
            reader.onload = function (e) {
                $('#imageHomeItemEdit').attr('src', e.target.result);
            };

            $scope.homeItemCurrent.image = "Images/" + input.files[0].name;
            reader.readAsDataURL(input.files[0]);
        }
    }
    
    $scope.addText = function(i, j){
        var txtArea = document.getElementById("homeItemContenue");
        var startIndex = txtArea.selectionStart;
        var endIndex = txtArea.selectionEnd;
        $scope.homeItemCurrent.contenue = $scope.homeItemCurrent.contenue.slice(0, startIndex) + i + 
                $scope.homeItemCurrent.contenue.slice(startIndex, endIndex) + j + 
                $scope.homeItemCurrent.contenue.slice(endIndex);
    };
});
