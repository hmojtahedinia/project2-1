// import { appendFile } from "fs";

// Declare global variables
let map;

function initMap() {
    // grabbing InfoWindow object from Maps API
    const infoWindow = new google.maps.InfoWindow();

    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 12.15,
        center: new google.maps.LatLng(43.68, -79.43),
        mapTypeId: 'terrain'
    });

    const GETRoute = '/api/washrooms';
    
    
   fetch(GETRoute).then(result => {
            return result.json();
        })
        .then(washroomData => {

            // Loop through the results array and place a marker for each
            // set of coordinates.
            for (let i = 0; i < washroomData.length; i++) {
                let geolocationQuery;
                const location = washroomData[i];
                geolocationQuery = 'https://geocoder.api.here.com/6.2/geocode.json?app_id=MOBLuClcOblyntNDtvSj&app_code=oTkyq3sa1MlTQjCUtHGEfQ&searchtext=';
                geolocationQuery += encodeURIComponent(location.address + ', Toronto, Canada')

                // make GET request to geolocater API to get lattitude and longitude
                fetch(geolocationQuery).then(function(response) {
                    return response.json();
                })
                .then(data => {
                  
                    const coords = data.Response.View[0].Result[0].Location.DisplayPosition;

                    const latLong = {lat: coords.Latitude, lng: coords.Longitude}
                                
                    const contentString = '<div id="content">'+
                        '<div id="siteNotice">'+
                        '</div>'+
                        '<h1 id="firstHeading" class="firstHeading">' + location.nameOfPlace + '</h1>'+
                        '<div id="bodyContent">'+
                        '<p><b>Address:</b> ' + location.address + '</p>' +
                        '<p><b>Overall Rating:</b> ' + '<img class="ministars" src="/styles/images/star'+ location.overallRating +'.png"></img>' +
                        '<p><b>Review:</b> ' + location.comment + '</p>'+
                        '</div>'+
                        '</div>';

                    // set google maps marker
                    const marker = new google.maps.Marker({
                        position: latLong,
                        map: map,
                        icon:  location.overallRating > 5 ? "http://maps.google.com/mapfiles/ms/icons/green.png" : "http://maps.google.com/mapfiles/ms/icons/red.png"
                    });
                    
                    // add event listner to toggle infoWindow when any marker is clicked
                    google.maps.event.addListener(marker, 'click', function() {
                        infoWindow.setContent(contentString);
                        infoWindow.open(map, this);
                    });
                })
                .catch(error => {if (error) throw error;});
            }
        })
        .catch(error => console.log(error));
}
