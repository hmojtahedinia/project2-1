// Declare global variables
let map;

function initMap() {
    // Grab InfoWindow object from Maps API
    const infoWindow = new google.maps.InfoWindow();

    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 12.15,
        center: new google.maps.LatLng(43.68, -79.43),
        mapTypeId: 'terrain'
    });

    // Get database info from server
   fetch('/api/washrooms').then(result => {
        return result.json();
    })
    .then(washroomData => {
       
        // Loop through the results array and place a marker for each
        // set of coordinates.
        for (let i = 0; i < washroomData.length; i++) {
            
            const washroom = washroomData[i];

            const latLong = {lat: washroom.latitude, lng: washroom.longitude};

            console.log(latLong);
                        
            const contentString = '<div id="content">'+
                '<div id="siteNotice">'+
                '</div>'+
                '<h1 id="firstHeading" class="firstHeading">' + washroom.nameOfPlace + '</h1>'+
                '<div id="bodyContent" class="miniBox">'+
                '<p class="miniBox"><b>Address:</b> ' + washroom.address + '</p>' +
                '<p><b>Overall Rating:</b> ' + '<img class="ministars" src="/styles/images/star'+ washroom.overallRating +'.png"></img>' +
                '<p><b>Review:</b> ' + washroom.comment + '</p>'+
                '</div>'+
                '</div>';

            // Set google maps marker
            const marker = new google.maps.Marker({
                position: latLong,
                map: map,
                icon: washroom.overallRating > 5 ? "https://maps.google.com/mapfiles/ms/icons/green.png" : "https://maps.google.com/mapfiles/ms/icons/red.png"
            });
            
            // Add event listner to toggle infoWindow when any marker is clicked
            google.maps.event.addListener(marker, 'click', function() {
                infoWindow.setContent(contentString);
                infoWindow.open(map, this);
            });
        }
    })
    .catch(error => console.log(error));
}
