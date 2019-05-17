/* eslint-disable no-alert */
/* eslint-disable no-undef */
// Declare global variables
let map;
let infoWindow;
// DOM element variables
const mapDiv = document.getElementById('map');
const input = document.getElementById('searchBox');
const ratings = document.getElementsByName('rating');
const filterSubmit = document.getElementById('submit');

// function handling geolocation errors
function handleLocationError(browserHasGeolocation) {
  alert(browserHasGeolocation
    ? 'Error: The Geolocation service failed.'
    : 'Error: Your browser doesn\'t support geolocation.');
}

// main Google Map initializing function
// eslint-disable-next-line no-unused-vars
function initMap() {
  // Grab InfoWindow object from Maps API
  infoWindow = new google.maps.InfoWindow({ maxWidth: 550 });

  // Create new map object within map div
  map = new google.maps.Map(mapDiv, {
    zoom: 12.15,
    center: new google.maps.LatLng(43.68, -79.43),
    mapTypeId: 'terrain',
  });

  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      const pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };

      map.setCenter(pos);
      map.setZoom(14.5);
    }, () => {
      handleLocationError(true);
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false);
  }

  // Create the search box and link it to the UI element.
  const searchBox = new google.maps.places.SearchBox(input);

  // Bias the SearchBox results towards current map's viewport.
  map.addListener('bounds_changed', () => {
    searchBox.setBounds(map.getBounds());
  });

  // Listen for the event fired when the user selects a prediction and retrieve
  // more details for that place.
  searchBox.addListener('places_changed', () => {
    const places = searchBox.getPlaces();

    if (places.length === 0) {
      return;
    }

    // For each place move theviewport to said place
    const bounds = new google.maps.LatLngBounds();
    places.forEach((place) => {
      if (!place.geometry) {
        return;
      }

      if (place.geometry.viewport) {
        // Only geocodes have viewport.
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
    });

    map.fitBounds(bounds);
  });

  // eslint-disable-next-line radix
  const ratingFilter = parseInt(mapDiv.dataset.filter);
  let queryUrl = '/api/washrooms';

  if (ratingFilter !== 'all') {
    queryUrl += `/${ratingFilter}`;
  }

  // Get database info from server
  fetch(queryUrl).then(result => result.json())
    .then((washroomData) => {
      // Loop through the results array and place a marker for each
      // set of coordinates.
      /* eslint no-plusplus: ["error", { "allowForLoopAfterthoughts": true }] */
      for (let i = 0; i < washroomData.length; i++) {
        const washroom = washroomData[i];

        const latLong = { lat: washroom.latitude, lng: washroom.longitude };

        const contentString = `<div id="content">
                <div id="siteNotice">
                </div>
                <h1 id="firstHeading" class="firstHeading">${washroom.nameOfPlace}</h1>
                <div id="bodyContent" class="miniBox">
                <p class="miniBox"><b>Address:</b> ${washroom.address}</p>
                <p><b>Overall Rating:</b><img class="ministars" src="/styles/images/star${washroom.overallRating}.png"></img>
                <p><b>Review:</b> ${washroom.comment}</p>
                </div>
                </div>`;

        // Set google maps marker
        const marker = new google.maps.Marker({
          position: latLong,
          map,
          icon: washroom.overallRating > 5 ? 'https://maps.google.com/mapfiles/ms/icons/green.png' : 'https://maps.google.com/mapfiles/ms/icons/red.png',
        });

        // Add event listner to toggle infoWindow when any marker is clicked
        // eslint-disable-next-line no-loop-func
        google.maps.event.addListener(marker, 'click', function handleInfoToggle() {
          infoWindow.setContent(contentString);
          infoWindow.open(map, this);
        });
      }
    })
    .catch((error) => { if (error) throw error; });
}


function handleFilterSubmit(event) {
  event.preventDefault();

  let ratingFilter;

  if (ratings) {
    ratings.forEach((rating) => {
      if (rating.checked) {
        ratingFilter = rating.value;
      }
    });
  }

  if (!ratingFilter) {
    alert('You must indicate a star amount you\'d like to filter by!');
  } else {
    window.location.href = `/home/${ratingFilter}`;
  }
}

// Event listener
filterSubmit.addEventListener('click', handleFilterSubmit);
