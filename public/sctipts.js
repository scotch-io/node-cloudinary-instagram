document.getElementById("upload_widget_opener").addEventListener("click", function() {

    cloudinary.openUploadWidget({ cloud_name: 'demo', upload_preset: 'idcidr0h'},
        function(error, result) { console.log(error, result) });

}, false);