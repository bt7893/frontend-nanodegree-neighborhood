// Set Google Map variables
var map;
var allMarkers = [];
var defaultSearchItem = 'pizza';
var zipCode = 75202; // ZipCode for Dallas, TX
var searchRadiusInput = 5;
var searchRadiusInput = prompt("Please enter the radius (in miles) of your search within Downtown Dallas. You may enter a minumum of 1 mile to a maximum of 25 miles");
validateRadius(); // sets initial search radius to 1 mile & check radius input
var lat = 32.780030; // downtown Dallas latitute
var long = -96.799719; // downtown Dallas longtitute
var MY_MAPTYPE_ID = 'custom_style';

var mapStyles = [{
    stylers: [{
        hue: "#00ffe6"
    }, {
        saturation: -20
    }]
}, {
    featureType: "road",
    elementType: "geometry",
    stylers: [{
        lightness: 100
    }, {
        visibility: "simplified"
    }]
}, {
    featureType: "road",
    elementType: "labels",
    stylers: [{
        visibility: "on"
    }]
}];

// Initialize Google Map
function initialize() {
    // Set the variable for center location
    var downtownDallas = new google.maps.LatLng(lat, long);
    // Custom Google Maps Styling
    var mapOptions = {
        // zoom : 15,
        center: downtownDallas,
        mapTypeControlOptions: {
            style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
            position: google.maps.ControlPosition.BOTTOM_RIGHT,
            mapTypeIds: [google.maps.MapTypeId.ROADMAP, MY_MAPTYPE_ID]
        },
        zoomControl: true,
        zoomControlOptions: {
            style: google.maps.ZoomControlStyle.LARGE,
            position: google.maps.ControlPosition.RIGHT_TOP
        },
        panControl: true,
        panControlOptions: {
            style: google.maps.ZoomControlStyle.LARGE,
            position: google.maps.ControlPosition.TOP_RIGHT
        },
        mapTypeId: MY_MAPTYPE_ID
    };

    map = new google.maps.Map(document.getElementById('map-canvas', mapOptions), mapOptions);

    var styledMapOptions = {
        name: 'Custom Style'
    };
    var customMapType = new google.maps.StyledMapType(mapStyles, styledMapOptions);
    map.mapTypes.set(MY_MAPTYPE_ID, customMapType);
}

// Create markers on Google Map, making the marker variable as a parameter
function addGoogleMapsMarkers(m) {
    // Display multiple markers on a map
    var infoWindow = new google.maps.InfoWindow();

    // Function to create Info window for the Google Map marker
    // Takes the marker data as a parameter
    function makeInfoWindow(mk) {
        // Create marker data for Business name, address, phone number, reviewer's picture, and reviewer's review
        var infoWindowContent = '<div class="info_content">';
        infoWindowContent += '<h4>' + mk.title + '</h4>';
        infoWindowContent += '<p>' + mk.address + '</p>';
        infoWindowContent += '<p align="right">' + mk.phone + '</p>';
        infoWindowContent += '<p class="review"><img src="' + mk.pic + '">' + mk.blurb + '</p>';
        infoWindowContent += '</div>';

        // Google Map V3 method to set the content of the marker window
        // Takes above infoWindowContent variable as a parameter
        infoWindow.setContent(String(infoWindowContent));

        // Google Map V3 method to set the content of the marker window
        // Takes map and marker data variable as a parameter
        infoWindow.open(map, mk);
    }

    // Clear all markers on the map
    function clearMarkers() {
        // Loops over all the markers on the map and use the Google Map method .setMap(null) to remove it
        for (i = 0, max = allMarkers.length; i < max; i++) {
            allMarkers[i].setMap(null);
        }
        /*** clears the allMarkers ***/
        allMarkers = [];
    }

    // if all Markers variable contains any markers object, invoke clearMarkers to remove them.
    if (allMarkers.length > 0) {
        clearMarkers();
    }

    // Create a new viewpoint bound
    var bounds = new google.maps.LatLngBounds();

    // Loop through the array of markers & position each one on the map
    for (var i = 0, max = m.length; i < max; i++) {
        // Create the position object
        var position = new google.maps.LatLng(m[i][2], m[i][3]); // Make an array of the LatLng's of the markers you want to show
        // Create the mkr object from the marker param
        var infowindow = new google.maps.Marker({
            position: position,
            map: map,
            title: m[i][0],
            address: m[i][6],
            phone: m[i][1],
            url: m[i][7],
            pic: m[i][4],
            blurb: m[i][5]
        });

        // Update allMarkers array variable with mkr object
        allMarkers.push(infowindow);

        // Extend the bounds to include each marker's position
        bounds.extend(position);

        // Apply google maps event method to bind a mouseover event to the marker on event, create and show info window using the makeInfoWindow Method
        /*jshint -W083 */google.maps.event
        .addListener(infowindow, 'mouseover', (function(mk, i) {
          return function() {
            makeInfoWindow(mk);
          };
        })(infowindow, i));

        // Apply google maps event method to bind a mouse click event to the marker on event, create and show info window using the makeInfoWindow Method and animate the marker
        google.maps.event
        .addListener(infowindow, 'click', (function(mk, i){
          return function(){
            makeInfoWindow(mk);
            toggleBounce(mk, i);
          };
        })(infowindow, i));

      }
      // Fit these bounds to the map
      map.fitBounds(bounds);

// Animate the marker
function toggleBounce(mk, i) {
  // Create the variable
  var yelpMarkerDetailUl =  $('.yelp-list').find('ul'),
  yelpMarkerDetail = yelpMarkerDetailUl.find('li'),
  yelpListHeight = 110, // the estimated height of each list cell
  yelpMarkerDetailPos = yelpListHeight * i,
  /*jshint -W030 */ activeYelpMarkerDetail = yelpMarkerDetail.eq(i);
  // console.log(yelpMarkerDetailUl[0].clientHeight);
  // window.alert(yelpListHeight);

  if (mk.getAnimation() != null) {
    mk.setAnimation(null); // If the marker has animation attribute, remove the animation attribute
    yelpMarkerDetailUl.removeClass('show'); // Remove the show className from the yelp-list to slide left
    activeYelpMarkerDetail.removeClass('active'); // Remove the active className from the active yelp-list

  } else { // If marker does not have animation attribue, remove animation attribute from any other markers that are animated
    for(var am in allMarkers){
      if (allMarkers.hasOwnProperty(am)) { // Recommended by JSHint //
      // iterate through all the markers and see if it has the animation attribute
      var isMoving = allMarkers[am].getAnimation();
      // if marker is animating and index is not self, then set the animated marker's animation attribute to null
      if(isMoving && am !== i){
        allMarkers[am].setAnimation(null);
      }
    }
  } // Recommended by JSHint //
    // Reference: https://developers.google.com/maps/documentation/javascript/examples/marker-animations-iteration
    // using Google Map's animation method
    mk.setAnimation(google.maps.Animation.BOUNCE); // add the Bounce animation to the marker based on click event, create and show the info window
    yelpMarkerDetailUl.addClass('show').animate({ // add the show className from the yelp-list
      scrollTop: yelpMarkerDetailPos
    }, 500); // this controls the animation smoothness
    yelpMarkerDetailUl.find('.active').removeClass('active'); // add the active className to the yelp-list
    activeYelpMarkerDetail.addClass('active');
  }
}

// add click event to the yelp-list ul li dom
$('.results').find('li').click(function(){
    // get index of clicked element
    var pos = $(this).index();
    // iterate through allMarkers array
    for(var am in allMarkers){
      if (allMarkers.hasOwnProperty(am)) { // Recommended by JSHint //
      var isMoving = allMarkers[am].getAnimation();
      // if marker is animated, remove animation
      if(isMoving && am !== pos){
        allMarkers[am].setAnimation(null);
      }
    }
  } // Recommended by JSHint //

    // Add the Bounce animation to the marker that corresponding to the clicked element index using google map's animation method, create and show the info window
    allMarkers[pos].setAnimation(google.maps.Animation.BOUNCE);
    makeInfoWindow(allMarkers[pos]);
    $('.results').find('.active').removeClass('active'); // Remove the active className from the active yelp-list
    $(this).addClass('active'); // Add the active className to the clicked element
  });
}
// Check Search Radius filter
function validateRadius(){
  if (searchRadiusInput < 1) {
    alert("Sorry, search radius cannot be less than 1. Search radius now set to 1 mile.");
    searchRadius = 1600;
  } else if (searchRadiusInput > 25) {
    alert("You have exceeded the limit of the search radius. Search radius now set to 25 miles.");
    searchRadius = 25 * 1600;
  } else {
    searchRadius = searchRadiusInput * 1600;
  }
}

// This is the main function that calls to yelp and updates the knockout data binds as well as creating the  markers on Google Map.
function yelpAjax(searchVicinity, searchFor) {
    var auth = {
        consumerKey: "fMmHCU4TiipvbfJVf4zOaQ",
        consumerSecret: "hYs9wsqn4Q_UY8ro9yyWT3xVuk0",
        accessToken: "QJtlFl9dYqZRWEi7j3LW6MeRbdoD3g0S",
        accessTokenSecret: "6tZzfRMChvjBfkGip5en66q_nbo",
        serviceProvider: {
            signatureMethod: "HMAC-SHA1"
        }
    };

    // Create a variable "accessor" to pass on to OAuth.SignatureMethod
    var accessor = {
        consumerSecret: auth.consumerSecret,
        tokenSecret: auth.accessTokenSecret
    };

    //Create a array object "parameter" to pass on "message" JSON object
    var parameters = [];
    parameters.push(['term', searchFor]);
    parameters.push(['location', searchVicinity]);
    parameters.push(['radius_filter', searchRadius]);
    parameters.push(['callback', 'cb']);
    parameters.push(['oauth_consumer_key', auth.consumerKey]);
    parameters.push(['oauth_consumer_secret', auth.consumerSecret]);
    parameters.push(['oauth_token', auth.accessToken]);
    parameters.push(['oauth_signature_method', 'HMAC-SHA1']);

    //Create a JSON object "message" to pass on to OAuth.setTimestampAndNonce
    var message = {
        'action': 'http://api.yelp.com/v2/search',
        'method': 'GET',
        'parameters': parameters
    };

    //OAuth proof-of-concept using JS
    OAuth.setTimestampAndNonce(message);
    OAuth.SignatureMethod.sign(message, accessor);

    // OAuth proof-of-concept using JS
    var parameterMap = OAuth.getParameterMap(message.parameters);
    yJax(message.action, parameterMap);
}

// Ajax OAuth method to get yelp's data
function yJax(url, yelpData) {
    $.ajax({
        'url': url,
        'data': yelpData,
        'cache': true,
        'dataType': 'jsonp',
        'global': true,
        'jsonpCallback': 'cb',
        'success': function(data) {
            makeYelpList(data);
        }
    });
}


// Function to create the list from Yelp's API. It takes returned data from the ajax as a parameter
function makeYelpList(d) {
    // Create the variable
    var $yelpList = $('.results');
    results = d.businesses,
    /*jshint -W030 */element = '';
    // Clear the yelpList to add new entries
    $yelpList.empty();

    // Create the markers Array object
    var markers = [];

    // If no data is returned
    if (results.length > 0) {
        // loop through the returned data, then create the variable for to use in populating the yelp-list li Dom
        /*jshint -W089 */for (var result in results) {
          //  if (results.hasOwnProperty(result)) { // Recommended by JSHint //
            var business = results[result],
                name = business.name,
                img = business.image_url,
                phone = /^\+1/.test(business.display_phone) ? business.display_phone : '',
                url = business.url,
                count = business.review_count,
                stars = business.rating_img_url,
                rate = business.rating,
                loc = {
                    lat: business.location.coordinate.latitude,
                    lon: business.location.coordinate.longitude,
                    address: business.location.display_address[0] + '<br>' + business.location.display_address[business.location.display_address.length - 1]
                },
                review = {
                    img: business.snippet_image_url,
                    txt: business.snippet_text
                };

            // create the Dom object
            var address = loc.address;
            var metaData = '<li><div class="heading row"><p class="col-sm-3 img-container">';
            metaData += '<img src="' + img + '" height=100 width=100 class="img-thumbnail">';
            metaData += '<img src="' + stars + '" height=17 width=84 alt="Yelp Rating" class="img-responsive">';
            metaData += '</p><div class="col-sm-9">';
            metaData += '<h3>' + name + '</h3><p>';
            metaData += '<p><a class="btn btn-default btn-small" href="' + url + '" target="_blank">Yelp it!</a></p>';
            metaData += '<span>' + count + ' Reviews </span>';
            metaData += '</div></div></li>';
            // add to the 'element' variable
            element += metaData;

            // create the marker array object then add marker to the markers array object
            var marker = [name, phone, loc.lat, loc.lon, review.img, review.txt, address, url];
            markers.push(marker);
           }
        // } // Recommended by JSHint //

        // add the 'element' to the yelp-list ul dom
        $yelpList.append(element);

        // Use Google Map api to create the markers to place on the map
        google.maps.event.addDomListener(window, 'load', addGoogleMapsMarkers(markers));

        // If no data is returned, then create a error message
    } else {
        var searchedFor = $('input').val();
        $yelpList.addClass('open').append('<div class="alert alert-danger" role="alert"><span class="glyphicon glyphicon-exclamation-sign"></span><strong> We cannot find "' + searchedFor + '"</strong> </br>Please try again!</div>');

        // Clear the markers on the map
        google.maps.event.addDomListener(window, 'load', addGoogleMapsMarkers(markers));
    }
}

// initialize the Google Maps function
initialize();

// Call the main yelp function
yelpAjax(zipCode, defaultSearchItem);
