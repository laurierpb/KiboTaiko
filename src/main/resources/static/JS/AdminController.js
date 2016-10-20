/* global app */
app.controller('AdminController', function ($scope, $http) {
    $scope.name = 'AdminController';
    
    $scope.calandrier = {
        imageAlt : "",
        image: "",
        titleText: "",
        contenue: ""
    };
    
    
    
    
    
    
    
    
    
    
    
    $scope.uploadStart = function () {
        console.log($scope.calandrier.imageAlt);
        console.log($scope.calandrier.image);
        console.log($scope.calandrier.titleText);
        console.log($scope.calandrier.contenue);
        
        $.ajax({
            url: "/uploadFile",
            type: "POST",
            data: new FormData($("#upload-file-form")[0]),
            enctype: 'multipart/form-data',
            processData: false,
            contentType: false,
            cache: false,
            success: function () {
                alert("File upload success");
            },
            error: function () {
                alert("Failed to upload the file");
            }
        });
        
        $http({
            method: 'POST',
            url: '/Calandrier',
            data: $scope.calandrier,
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(function successCallback(data, status, headers, config) {
            console.log('post success');
            console.log('data');
            console.log(data.data);
        }, function errorCallback(data, status, headers, config) {
            console.log('OMG post fail');
        });
        
    };
    $("#upload-file-input").change(function () {
        readURL(this);
    });
    function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#imageCalandrierEdit').attr('src', e.target.result);
        };
        
        $scope.calandrier.image = "Images/" + input.files[0].name;
        reader.readAsDataURL(input.files[0]);
    }
}
});
