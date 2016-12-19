function uploadImage() {
        $.ajax({
            url: "/uploadFile",
            type: "POST",
            data: new FormData($("#upload-file-form")[0]),
            enctype: 'multipart/form-data',
            processData: false,
            contentType: false,
            cache: false,
            success: function () {
                console.log("File upload success");
            },
            error: function () {
                console.log("Failed to upload the file");
            }
        });
    }