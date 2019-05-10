// Declare global variables
let map;

// dummy array of data to test with
const washrooms = [
    {
        id: 1, 
        nameOfPlace: 'Kinton Ramen', 
        address: '90 Eglinton Ave. East, Unit 108',
        overallRating: 7, 
        comment: 'The soap seemed to be very watered down. Bonus points for the complimentary mouth wash and tooth picks. Would definitely poop again.'
    },
    {
        id: 2, 
        nameOfPlace: 'Han Ba Tang',
        address: '4862 Yonge Street',
        overallRating: 7, 
        comment: 'I found it very weird that the inside of the stalls did not match the same rustic wood panelling as the rest of the bathroom.'
    },
    {
        id: 3, 
        nameOfPlace: 'Pancho y Emiliano',
        address: '291 King Street West',
        overallRating: 7, 
        comment: 'Absolutely spotless, apart from single piece of toilet paper next to the toilet. Loved the subway tiles and the vintage hand dryer. Bonus points for having both paper towel and hand dryer. Would definitely poop again.'
    },
    {
        id: 4, 
        nameOfPlace: 'ZED 80',
        address: '185 Danforth Avenue',
        overallRating: 7, 
        comment: 'There was a bag of clothes next to the toilet the entire night. Bonus points for having both paper towel and hand dryer. Bonus, bonus points for Garbage Pail Kids!'
    },
    {
        id: 5, 
        nameOfPlace: 'Air Canada Centre',
        address: '40 Bay Street',
        overallRating: 6, 
        comment: 'Though loss for the Raptors tonight. The smell of urine and overpriced beer permeated the air. Vanity covered in water. Urinals, urinals everywhere.'
    },
    {
        id: 6, 
        nameOfPlace: 'See-Scape',
        address: '347 Keele Street',
        overallRating: 5, 
        comment: 'The Punisher display was pretty cool. Other than that, not much to say about this bathroom.'
    }
];

function initMap() {
    // grabbing InfoWindow and Geocoder objects from Maps API
    const geocoder = new google.maps.Geocoder();
    const infoWindow = new google.maps.InfoWindow();
    console.log($);
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 12.15,
        center: new google.maps.LatLng(43.68, -79.43),
        mapTypeId: 'terrain'
    });

    const GETRoute = '/api/washrooms';
    // Loop through the results array and place a marker for each
    // set of coordinates.
    /*
    $.ajax(GETRoute, {
        success: function(data) {
                
            for (let i = 0; i < data.length; i++) {
                const location = data[i];

                geocoder.geocode({address: location.address + ', Toronto, Canada'}, (results, status) => {
                    if (status === google.maps.GeocoderStatus.OK) {

                        const coords = results[0].geometry.location;
                                
                        const contentString = '<div id="content">'+
                        '<div id="siteNotice">'+
                        '</div>'+
                        '<h1 id="firstHeading" class="firstHeading">' + location.nameOfPlace + '</h1>'+
                        '<div id="bodyContent">'+
                        '<p><b>Address:</b> ' + location.address + '</p>' +
                        '<p><b>Overall Rating:</b> ' + location.overallRating + '/10</p>' +
                        '<p><b>Review:</b> ' + location.comment + '</p>'+
                        '</div>'+
                        '</div>';
                


                        const marker = new google.maps.Marker({
                            position: coords,
                            map: map,
                            icon:  location.overallRating > 5 ? "http://maps.google.com/mapfiles/ms/icons/blue.png" : "http://maps.google.com/mapfiles/ms/icons/red.png"
                        });
                    
                        google.maps.event.addListener(marker, 'click', function() {
                            infoWindow.setContent(contentString);
                            infoWindow.open(map, this);
                        });

                    }  else { // if status value is not equal to "google.maps.GeocoderStatus.OK"

                        // warning message
                        alert("The Geocode was not successful for the following reason: " + status);
                    }
                });
            }
        }
    });
    */
   fetch(GETRoute).then(result => {
            // console.log(result);
            return result.json();
        })
        .then(data => {
            // console.log(data);
               
            for (let i = 0; i < data.length; i++) {
                const location = data[i];

                geocoder.geocode({address: location.address + ', Toronto, Canada'}, (results, status) => {
                    if (status === google.maps.GeocoderStatus.OK) {

                        const coords = results[0].geometry.location;
                                
                        const contentString = '<div id="content">'+
                        '<div id="siteNotice">'+
                        '</div>'+
                        '<h1 id="firstHeading" class="firstHeading">' + location.nameOfPlace + '</h1>'+
                        '<div id="bodyContent">'+
                        '<p><b>Address:</b> ' + location.address + '</p>' +
                        '<p><b>Overall Rating:</b> ' + location.overallRating + '/10</p>' +
                        '<p><b>Review:</b> ' + location.comment + '</p>'+
                        '</div>'+
                        '</div>';
                


                        const marker = new google.maps.Marker({
                            position: coords,
                            map: map,
                            icon:  location.overallRating > 5 ? "http://maps.google.com/mapfiles/ms/icons/blue.png" : "http://maps.google.com/mapfiles/ms/icons/red.png"
                        });
                    
                        google.maps.event.addListener(marker, 'click', function() {
                            infoWindow.setContent(contentString);
                            infoWindow.open(map, this);
                        });

                    }  else { // if status value is not equal to "google.maps.GeocoderStatus.OK"

                        // warning message
                        alert("The Geocode was not successful for the following reason: " + status);
                    }
                });
            }
        })
        .catch(error => console.log(error));
}

