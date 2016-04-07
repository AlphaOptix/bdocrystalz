function convertFileToDataURLviaFileReader(url, callback){
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'blob';
    xhr.onload = function() {
        var reader  = new FileReader();
        reader.onloadend = function () {
            callback(reader.result);
        }
        reader.readAsDataURL(xhr.response);
    };
    xhr.open('GET', url);
    xhr.send();
}

var arr = [];
$('.dataTable tbody tr').each(function(id,elem){
    var base64;
    var url = $('.dt-icon img',elem).attr('src');
    convertFileToDataURLviaFileReader(url, function(blah){
        base64 = blah;
        arr.push({
            "ID": $('.dt-id',elem).html(),
            "Name": $('td a b', elem).text(),
            "Image": base64
        });
        if(arr.length==100){
            outputArr(arr);
        }
    });
});

function outputArr(arrObj){
    document.write(JSON.stringify(arrObj));
}
