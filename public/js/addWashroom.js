document.getElementById("userpageSubmit").addEventListener("click", (event) => {
    
    event.preventDefault();

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
    
    if (!(sendData.nameOfPlace && sendData.address && sendData.overallRating && sendData.comment)) {
        alert('You must fill in all data to submit a washroom!');
    } else {
        postAjax('/api/washrooms', sendData, function(data) {
            window.location.href = '/';
        });
    }
});

