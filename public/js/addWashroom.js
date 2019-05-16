document.getElementById('userpageSubmit').addEventListener('click', (event) => {
  event.preventDefault();

  const location = document.getElementById('inputLocation').value;
  const locationName = document.getElementById('inputName').value;
  const comment = document.getElementById('comment').value;
  const ratings = document.getElementsByName('rating');
  let ratingValue;
  if (ratings) {
    ratings.forEach((rating) => {
      if (rating.checked) {
        ratingValue = rating.value;
      }
    });
  }

  const sendData = {
    nameOfPlace: locationName.trim(),
    address: location.trim(),
    overallRating: ratingValue,
    comment: comment.trim(),
  };

  if (!(sendData.nameOfPlace && sendData.address && sendData.overallRating && sendData.comment)) {
    // eslint-disable-next-line no-alert
    alert('You must fill in all data to submit a washroom!');
  } else {
    // eslint-disable-next-line no-undef
    postAjax('/api/washrooms', sendData, () => {
      window.location.href = '/';
    });
  }
});
