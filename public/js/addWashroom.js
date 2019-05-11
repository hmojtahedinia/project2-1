function postAjax(url, data, success) {
    var params = typeof data == 'string' ? data : Object.keys(data).map(
		function(k){ return encodeURIComponent(k) + '=' + encodeURIComponent(data[k]) }
        ).join('&');

    var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
    xhr.open('POST', url);
    xhr.onreadystatechange = function() {
        if (xhr.readyState>3 && xhr.status==200) { success(xhr.responseText); }
    };
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send(params);
    return xhr;
}

document.getElementById("userpageSubmit").addEventListener("click", (event) => {
    event.preventDefault();

    //const ratingValue = $("input[name='rating']:checked").val();
    const location = document.getElementById("inputLocation").value;
    const locationName = document.getElementById("inputName").value;
    const comment = document.getElementById("comment").value;

    const ratings = document.getElementsByName("rating");
    if (ratings) {
        ratings.forEach(rating => {
            if (rating.checked){
                ratingValue = rating.value;
            }
        });
    }
    
    const sendData = { 
        nameOfPlace: locationName.trim(),
        address: location.trim(),
        overallRating: ratingValue,
        comment: comment.trim()
    };
    
    postAjax('/api/washrooms', sendData, function(data) { 
        console.log(data); 
    });

    window.location.href = '/';
});

